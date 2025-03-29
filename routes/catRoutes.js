const express = require("express");
const {
  getTags,
  matchTags,
  filterCatsByTag,
} = require("../controllers/catController");

const router = express.Router();

router.get("/tags", getTags);
router.get("/cats/filter", filterCatsByTag);
router.get("/cats/match", matchTags);

module.exports = router;
