"use client";
import { Editor } from "@toast-ui/react-editor";
import TextEditor from "./TextEditor";
import React, { useState, useRef } from "react";

const BlogPostForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [tags, setTags] = useState("");

  const editorRef = useRef<Editor | null>(null);

  const handleSubmit = async () => {
    const markdownContent = editorRef.current
      ? editorRef.current.getInstance().getMarkdown()
      : "";

    try {
      console.log(markdownContent);
    } catch (error) {
      console.error("Error sending markdown content:", error);
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
        <TextEditor editorRef={editorRef} />
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
