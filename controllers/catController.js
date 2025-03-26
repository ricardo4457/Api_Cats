const axios = require("axios");
const Cat = require("../models/Cat");
const Tag = require("../models/Tag");

// Function to get all tags and return them as Tag instances
const getTags = async (req, res) => {
  try {
    const response = await axios.get("https://cataas.com/api/tags");

    const tags = response.data.map((tagName) => new Tag(tagName));

    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tags" });
  }
};

// Function to filter cats based on tags
const filterCats = async (req, res) => {
  const { tag, omit, total } = req.query;

  if (!tag || !omit || !total) {
    return res.status(400).json({ error: "Missing required query parameters" });
  }

  try {
    const response = await axios.get(`https://cataas.com/api/cats?tags=${tag}`);
    const catsData = response.data.slice(
      Number(omit),
      Number(omit) + Number(total)
    );

    const cats = catsData.map(
      (catData) =>
        new Cat(catData.id, catData.tags, catData.mimetype, catData.createdAt)
    );

    res.status(200).json(cats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch filtered cats" });
  }
};

// Function to match tags based on a string
const matchCats = async (req, res) => {
  const { string } = req.query;

  if (!string) {
    return res
      .status(400)
      .json({ error: 'Missing required query parameter "string"' });
  }

  try {
    const response = await axios.get("https://cataas.com/api/tags");
    const matchedTags = response.data.filter((tag) => tag.includes(string));

    const tagInstances = matchedTags.map((tagName) => new Tag(tagName));

    res.status(200).json({ matchedTags, tagInstances });
  } catch (error) {
    res.status(500).json({ error: "Failed to match tags" });
  }
};

module.exports = {
  getTags,
  filterCats,
  matchCats,
};
