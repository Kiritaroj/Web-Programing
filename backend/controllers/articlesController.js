let articles = [
  {
    id: 1,
    title: "How to Access the Digital Library",
    content:
      "Use your university account at library.university.edu. You can borrow e-books and view journals online.",
    category: "Library",
    tags: ["library", "ebooks", "research"]
  },
  {
    id: 2,
    title: "Semester Registration Guide",
    content:
      "Open the student portal, review offered courses, and confirm your registration before the deadline.",
    category: "Academics",
    tags: ["registration", "courses", "semester"]
  },
  {
    id: 3,
    title: "Campus Wi-Fi Troubleshooting",
    content:
      "If Wi-Fi fails, forget the network, reconnect with your student ID, and contact IT if issue remains.",
    category: "IT Support",
    tags: ["wifi", "internet", "it"]
  },
  {
    id: 4,
    title: "Scholarship Application Steps",
    content:
      "Prepare your transcript, recommendation letter, and submit the form through the scholarship portal.",
    category: "Finance",
    tags: ["scholarship", "financial-aid"]
  },
  {
    id: 5,
    title: "Using the Career Center",
    content:
      "Book career counseling sessions, improve your CV, and join internship fair events every month.",
    category: "Student Services",
    tags: ["career", "internship", "cv"]
  }
];

function getNextId() {
  return articles.length ? Math.max(...articles.map((article) => article.id)) + 1 : 1;
}

function getAllArticles(req, res) {
  const { title } = req.query;

  if (!title) {
    return res.json(articles);
  }

  const normalizedTitle = title.toLowerCase();
  const filtered = articles.filter((article) =>
    article.title.toLowerCase().includes(normalizedTitle)
  );

  return res.json(filtered);
}

function getArticleById(req, res) {
  const id = Number(req.params.id);
  const article = articles.find((item) => item.id === id);

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  return res.json(article);
}

function createArticle(req, res) {
  const { title, content, category, tags } = req.body;

  if (!title || !content || !category || !Array.isArray(tags)) {
    return res.status(400).json({
      message: "title, content, category and tags (array) are required"
    });
  }

  const newArticle = {
    id: getNextId(),
    title,
    content,
    category,
    tags
  };

  articles.push(newArticle);
  return res.status(201).json(newArticle);
}

function updateArticle(req, res) {
  const id = Number(req.params.id);
  const { title, content, category, tags } = req.body;
  const index = articles.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Article not found" });
  }

  if (!title || !content || !category || !Array.isArray(tags)) {
    return res.status(400).json({
      message: "title, content, category and tags (array) are required"
    });
  }

  const updatedArticle = {
    id,
    title,
    content,
    category,
    tags
  };

  articles[index] = updatedArticle;
  return res.json(updatedArticle);
}

function deleteArticle(req, res) {
  const id = Number(req.params.id);
  const index = articles.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Article not found" });
  }

  const deletedArticle = articles[index];
  articles = articles.filter((item) => item.id !== id);

  return res.json({ message: "Article deleted", article: deletedArticle });
}

function getCategories(req, res) {
  const categories = [...new Set(articles.map((article) => article.category))];
  return res.json(categories);
}

function getTags(req, res) {
  const tags = [...new Set(articles.flatMap((article) => article.tags))];
  return res.json(tags);
}

function getArticlesByCategory(req, res) {
  const categoryName = req.params.categoryName.toLowerCase();
  const categoryArticles = articles.filter(
    (article) => article.category.toLowerCase() === categoryName
  );

  return res.json(categoryArticles);
}

function getStats(req, res) {
  const categories = [...new Set(articles.map((article) => article.category))];

  return res.json({
    articleCount: articles.length,
    categoryCount: categories.length
  });
}

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getCategories,
  getTags,
  getArticlesByCategory,
  getStats
};
