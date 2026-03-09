const BASE_URL = "http://localhost:5000/api";

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Request failed");
  }

  return response.json();
}

export function getStats() {
  return request("/stats");
}

export function getArticles(searchTitle = "") {
  const query = searchTitle ? `?title=${encodeURIComponent(searchTitle)}` : "";
  return request(`/articles${query}`);
}

export function getArticleById(id) {
  return request(`/articles/${id}`);
}

export function createArticle(payload) {
  return request("/articles", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function updateArticle(id, payload) {
  return request(`/articles/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
}

export function deleteArticle(id) {
  return request(`/articles/${id}`, {
    method: "DELETE"
  });
}

export function getCategories() {
  return request("/categories");
}

export function getArticlesByCategory(categoryName) {
  return request(`/categories/${encodeURIComponent(categoryName)}/articles`);
}

export function getTags() {
  return request("/tags");
}
