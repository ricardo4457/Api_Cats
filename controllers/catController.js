
const axios = require('axios');

const getTags = async (req, res) => {
  try {
    const response = await axios.get('https://cataas.com/api/tags');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
};

const filterCats = async (req, res) => {
  const { tag, omit, total } = req.query;

  if (!tag || !omit || !total) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  try {
    const response = await axios.get(`https://cataas.com/api/cats?tags=${tag}`);
    const cats = response.data.slice(Number(omit), Number(omit) + Number(total));
    res.status(200).json(cats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch filtered cats' });
  }
};

const matchCats = async (req, res) => {
  const { string } = req.query;

  if (!string) {
    return res.status(400).json({ error: 'Missing required query parameter "string"' });
  }

  try {
    const response = await axios.get('https://cataas.com/api/tags');
    const matchedTags = response.data.filter(tag => tag.includes(string));
    res.status(200).json({ matchedTags });
  } catch (error) {
    res.status(500).json({ error: 'Failed to match tags' });
  }
};

module.exports = {
  getTags,
  filterCats,
  matchCats
};
