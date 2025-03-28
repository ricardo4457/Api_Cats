const axios = require("axios");
const Cat = require("../api_models/cat");
const Tag = require("../api_models/tag");
const { recordSearch } = require("../controllers/statsController");
const RequestGetTags = require("./requests/RequestGetTags");
const RequestFilterCats = require("./requests/RequestFilterCats");
const RequestMatchCats = require("./requests/RequestMatchCats");

// Function to get all tags and return them as Tag instances
const getTags = async (req, res) => {
  try {
    const request = new RequestGetTags(req.query);
    if (!request.isValid()) {
      return res.status(400).json({ error: "Invalid query parameters" });
    }

    const response = await axios.get("https://cataas.com/api/tags");

    const tags = response.data.map((tagName) => new Tag(tagName));

    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tags" });
  }
};

// Function to filter cats based on tags
const filterCatsByTag = async (req, res) => {
  const { tag, omit, total } = req.query;

  const request = new RequestFilterCats(tag, omit, total);
  if (!request.isValid()) {
    return res
      .status(400)
      .json({ error: "Missing or invalid query parameters" });
  }

  try {
    const response = await axios.get(`https://cataas.com/api/cats?tags=${tag}`);
    const catsData = response.data.slice(
      Number(omit),
      Number(omit) + Number(total)
    );

    const cats = catsData.map(
      (catData) =>
        new Cat(
          catData.id,
          catData.tags,
          catData.mimetype,
          catData.createdAt,
          `https://cataas.com/cat/${catData.id}`
        )
    );

    await recordSearch(tag, catsData);

    res.status(200).json(cats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch filtered cats" });
  }
};

// Function to match cats based on a string
const matchTags = async (req, res) => {
  const { string } = req.query;

  const request = new RequestMatchCats(string);
  if (!request.isValid()) {
    return res
      .status(400)
      .json({ error: 'Missing or invalid query parameter "string"' });
  }

  try {
    const response = await axios.get("https://cataas.com/api/tags");
    const matchedTags = response.data.filter((tag) => tag.includes(string));

    await recordSearch(string);

    res.status(200).json({ matchedTags });
  } catch (error) {
    res.status(500).json({ error: "Failed to match tags" });
  }
};

module.exports = {
  getTags,
  filterCatsByTag,
  matchTags,
};
