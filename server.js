
const express = require('express');
const Cat = require("./models/Cat");
const Tag = require("./models/Tag");
const catRoutes = require('./routes/catRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1', catRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
