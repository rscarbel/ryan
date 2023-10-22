// @ts-nocheck
"use client";

import { Calendar } from "primereact/calendar";
import { Editor } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";
import React, { useState, useRef } from "react";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";

const BlogPostForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [tags, setTags] = useState("");
  const [publishDate, setPublishDate] = useState(null);
  const [postSummary, setPostSummary] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);

  const toast = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log({ title, content, imageUrl, altText, tags, publishDate });
      toast.current.show({
        severity: "success",
        summary: "Blog post saved successfully!",
      });
    } catch (error) {
      console.error("Error sending content:", error);
      toast.current.show({
        severity: "error",
        summary: "Error saving the post!",
      });
    }
  };

  const options = [
    {
      label: "Publish Post",
      command: () => setIsScheduled(false),
    },
    {
      label: "Schedule Post",
      command: () => setIsScheduled(true),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Title:</span>
            <InputText
              placeholder="Enter your blog post title"
              className="mt-1 w-full p-2 shadow-sm border border-gray-300 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">
              Post Summary:
            </span>
            <InputTextarea
              placeholder="Short summary of the post"
              className="mt-1 w-full p-2 shadow-sm border border-gray-300 rounded"
              value={postSummary}
              onChange={(e) => setPostSummary(e.target.value)}
            />
          </label>

          <label className="block mt-4">
            <span className="text-sm font-medium text-gray-700">Content:</span>
            <Editor
              value={content}
              onTextChange={(e) => setContent(e.htmlValue || "")}
              style={{ height: "320px", padding: "0.5rem" }}
              className="border border-gray-300 rounded my-4 shadow-sm bg-white"
              toolbarClassName="p-2 bg-gray-100 border-b border-gray-300"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">
              Featured Image URL:
            </span>
            <InputText
              placeholder="https://example.com/image.jpg"
              className="mt-1 w-full p-2 shadow-sm border border-gray-300 rounded"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Alt Text:</span>
            <InputText
              placeholder="Description for the image"
              className="mt-1 w-full p-2 shadow-sm border border-gray-300 rounded"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">
              Tags (comma-separated):
            </span>
            <InputText
              placeholder="e.g., tech, blogging, tutorials"
              className="mt-1 w-full p-2 shadow-sm border border-gray-300 rounded"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </label>

          {isScheduled && (
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Scheduled Date:
              </span>
              <Calendar
                value={publishDate}
                onChange={(e) => setPublishDate(e.value)}
                dateFormat="yy/mm/dd"
                className="mt-1 w-full p-2 shadow-sm border border-gray-300 rounded"
                showIcon
              />
            </label>
          )}

          <SplitButton
            label={isScheduled ? "Schedule" : "Publish"}
            model={options}
            type="submit"
            className="w-full p-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:from-blue-700 active:to-blue-900 transition-transform transform hover:-translate-y-0.5"
          />
        </div>
      </form>
      <Toast ref={toast} />
    </div>
  );
};

export default BlogPostForm;