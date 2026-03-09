const express = require("express");
const {
  getCategories,
  getTags,
  getArticlesByCategory,
  getStats
} = require("../controllers/articlesController");

const router = express.Router();

router.get("/categories", getCategories);
router.get("/categories/:categoryName/articles", getArticlesByCategory);
router.get("/tags", getTags);
router.get("/stats", getStats);

module.exports = router;
