const { SearchQuery, SearchResult } = require("../models");
const { Sequelize } = require("sequelize");

// Get top 10 most frequent search queries
const getTopQueries = async (req, res) => {
  try {
    const topQueries = await SearchQuery.findAll({
      order: [["count", "DESC"]],
      limit: 10,
    });
    res.status(200).json(topQueries);
  } catch (error) {
    console.error("Error fetching top queries:", error);
    res.status(500).json({ error: "Failed to fetch top queries" });
  }
};

// Get top 10 most common tags across all search results
const getTopCategories = async (req, res) => {
  try {
    const allResults = await SearchResult.findAll();

    const tagCounts = {};
    allResults.forEach((result) => {
      if (result.tags && Array.isArray(result.tags)) {
        result.tags.forEach((tag) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });

    const topCategories = Object.entries(tagCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    res.status(200).json(topCategories);
  } catch (error) {
    console.error("Error fetching top categories:", error);
    res.status(500).json({ error: "Failed to fetch top categories" });
  }
};

// Record a new search query
const recordSearch = async (query, results = []) => {
  if (!query) {
    throw new Error("Query parameter is required");
  }

  try {
    const [searchQuery, created] = await SearchQuery.findOrCreate({
      where: { query },
      defaults: { count: 1 },
    });

    if (!created) {
      searchQuery.count += 1;
      await searchQuery.save();
    }

    const existingResults = await SearchResult.findAll({
      where: {
        searchQueryId: searchQuery.id,
      },
      attributes: ["catId"],
    });

    const existingCatIds = existingResults.map((r) => r.catId);
    const newResults = results.filter(
      (result) => !existingCatIds.includes(result.id)
    );

    for (const result of newResults) {
      await SearchResult.create({
        searchQueryId: searchQuery.id,
        catId: result.id,
        tags: result.tags || [],
      });
    }

    return {
      success: true,
      stats: {
        totalResults: results.length,
        newResultsAdded: newResults.length,
        duplicatesSkipped: results.length - newResults.length,
      },
    };
  } catch (error) {
    console.error("Error recording search:", error);
    throw error;
  }
};

//Clicking any category will display cats matching that category
const getCatsByCategory = async (req, res) => {
  try {
    const { tag } = req.params;

    const results = await SearchResult.findAll({
      where: Sequelize.literal(`JSON_CONTAINS(tags, '"${tag}"')`),
    });

    const cats = results.map((result) => ({
      id: result.catId,
      tags: result.tags,
      imageUrl: `https://cataas.com/cat/${result.catId}`,
    }));

    res.status(200).json({
      tag,
      count: cats.length,
      cats,
    });
  } catch (error) {
    console.error("Error getting cats by category:", error);
    res.status(500).json({ error: "Failed to get cats by category" });
  }
};

module.exports = {
  getTopQueries,
  getTopCategories,
  recordSearch,
  getCatsByCategory,
};
