import { useEffect, useState } from "react";

const initialFormState = {
  title: "",
  content: "",
  category: "",
  tags: ""
};

function ArticleForm({ onSubmit, articleBeingEdited, onCancelEdit }) {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (!articleBeingEdited) {
      setFormData(initialFormState);
      return;
    }

    setFormData({
      title: articleBeingEdited.title,
      content: articleBeingEdited.content,
      category: articleBeingEdited.category,
      tags: articleBeingEdited.tags.join(", ")
    });
  }, [articleBeingEdited]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      category: formData.category.trim(),
      // Convert comma-separated input into tag array for API payload.
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    };

    onSubmit(payload);
    setFormData(initialFormState);
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>{articleBeingEdited ? "Edit Article" : "Create Article"}</h3>
      <label>
        Title
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Article title"
          required
        />
      </label>

      <label>
        Content
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Full article content"
          required
          rows={5}
        />
      </label>

      <label>
        Category
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="e.g. Academics"
          required
        />
      </label>

      <label>
        Tags (comma separated)
        <input
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="registration, courses"
          required
        />
      </label>

      <div className="actions">
        <button type="submit">{articleBeingEdited ? "Update" : "Create"}</button>
        {articleBeingEdited && (
          <button type="button" className="secondary" onClick={onCancelEdit}>
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
}

export default ArticleForm;
