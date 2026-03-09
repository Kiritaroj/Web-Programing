const express = require("express");
const cors = require("cors");
const articleRoutes = require("./routes/articleRoutes");
const metaRoutes = require("./routes/metaRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Route groups keep the API clean and easy to maintain.
app.use("/api", articleRoutes);
app.use("/api", metaRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Knowledge Base API is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
