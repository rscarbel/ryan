// @ts-nocheck
"use client";

import { Calendar } from "primereact/calendar";
import { Editor } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { SelectButton } from "primereact/selectbutton";
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
  const [isCommentAllowed, setIsCommentAllowed] = useState(true);
  const [callToActionText, setCallToActionText] = useState("Submit");
  const [status, setStatus] = useState("draft");

  const toast = useRef(null);

  const successToastMessages = {
    draft: "Draft saved successfully!",
    published: "Post published successfully!",
    scheduled: "Post scheduled successfully!",
  };

  const errorToastMessages = {
    draft: "Error saving the draft!",
    published: "Error publishing the post!",
    scheduled: "Error scheduling the post!",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      console.log({
        title,
        content,
        imageUrl,
        altText,
        tags,
        publishDate,
        isCommentAllowed,
        isScheduled,
        status,
      });
      toast.current.show({
        severity: "success",
        summary: successToastMessages[status],
      });
    } catch (error) {
      console.error("Error sending content:", error);
      toast.current.show({
        severity: "error",
        summary: errorToastMessages[status],
      });
    }
  };

  const options = [
    {
      label: "Publish Post",
      value: "published",
      command: () => {
        setIsScheduled(false);
        setStatus("published");
        setCallToActionText("Publish Post");
      },
    },
    {
      label: "Save as Draft",
      value: "draft",
      command: () => {
        setIsScheduled(false);
        setStatus("draft");
        setCallToActionText("Save as Draft");
      },
    },
    {
      label: "Schedule Post",
      value: "schedule",
      command: () => {
        setIsScheduled(true);
        setStatus("scheduled");
        setCallToActionText("Schedule Post");
      },
    },
  ];

  const commentOptions = [
    {
      label: "Yes",
      value: true,
      className: isCommentAllowed
        ? "bg-blue-500 text-gray-100"
        : "text-gray-100 bg-gray-400",
    },
    {
      label: "No",
      value: false,
      className: isCommentAllowed
        ? "text-gray-100 bg-gray-400"
        : "bg-blue-500 text-gray-100",
    },
  ];

  const onImageUpload = (event) => {
    const file = event.files[0];
    setImageUrl(file.name);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create New Blog Post</h2>
      <form>
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
              onTextChange={(e) => setContent(e?.htmlValue || "")}
              style={{ height: "320px", padding: "0.5rem" }}
              className="border border-gray-300 rounded my-4 shadow-sm bg-white"
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

          <label className="block">
            <span className="text-sm font-medium text-gray-700">
              Featured Image:
            </span>
            <FileUpload
              accept="image/*"
              customUpload
              uploadHandler={onImageUpload}
              maxFileSize={5000000}
              className="mt-1"
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

          <label className="block mt-2">
            <span className="text-sm font-medium text-gray-700">
              Permit Comments:
            </span>
            <SelectButton
              value={isCommentAllowed}
              onChange={(e) => setIsCommentAllowed(e.value)}
              options={commentOptions}
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
                timeFormat="hh:mm"
                showTime={true}
                hourFormat="12"
                className="mt-1 w-full p-2 shadow-sm border border-gray-300 rounded"
                showIcon
              />
            </label>
          )}

          <SplitButton
            label={callToActionText}
            model={options}
            type="button"
            onClick={handleSubmit}
            className="w-full p-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:from-blue-700 active:to-blue-900 transition-transform transform hover:-translate-y-0.5"
          />
        </div>
      </form>
      <Toast ref={toast} />
    </div>
  );
};

export default BlogPostForm;
