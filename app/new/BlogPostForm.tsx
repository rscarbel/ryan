// @ts-nocheck
"use client";

import { Editor } from "primereact/editor";
import React, { useState } from "react";

const BlogPostForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async () => {
    try {
      console.log(content);
    } catch (error) {
      console.error("Error sending content:", error);
    }
  };

  return (
    <div>
      <h2>Create New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />

        <Editor
          value={content}
          onTextChange={(e) => setContent(e.htmlValue || "")}
          style={{ height: "320px" }}
        />

        <br />

        <label>
          Image URL:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <br />

        <label>
          Alt Text:
          <input
            type="text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />
        </label>
        <br />

        <label>
          Tags (comma-separated):
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </label>
        <br />

        <button onClick={handleSubmit} type="button">
          Save Post
        </button>
      </form>
    </div>
  );
};

export default BlogPostForm;
