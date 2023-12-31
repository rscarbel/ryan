// @ts-nocheck
"use client";

import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { SelectButton } from "primereact/selectbutton";
import React, { useState, useRef, FormEvent } from "react";
import { STYLE_CLASSES } from "../utils";
import TagInput from "./TagInput";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

const BlogPostForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [altText, setAltText] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [publishDate, setPublishDate] = useState<Date | null>(null);
  const [postSummary, setPostSummary] = useState<string>("");
  const [isScheduled, setIsScheduled] = useState<boolean>(false);
  const [isCommentAllowed, setIsCommentAllowed] = useState<boolean>(true);
  const [callToActionText, setCallToActionText] = useState<string>("Submit");
  const [status, setStatus] = useState<string>("draft");

  const toast = useRef<any>(null);

  const successToastMessages: Record<string, string> = {
    draft: "Draft saved successfully!",
    published: "Post published successfully!",
    scheduled: "Post scheduled successfully!",
  };

  const errorToastMessages: Record<string, string> = {
    draft: "Error saving the draft!",
    published: "Error publishing the post!",
    scheduled: "Error scheduling the post!",
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    try {
      toast.current.show({
        severity: "success",
        summary: successToastMessages[status],
      });
    } catch (error) {
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

  const onImageUpload = (event: any) => {
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
              className={STYLE_CLASSES.FORM_BASIC_INPUT}
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
              className={STYLE_CLASSES.FORM_BASIC_INPUT}
              value={postSummary}
              onChange={(e) => setPostSummary(e.target.value)}
            />
          </label>

          <label className="block mt-4">
            <span className="text-sm font-medium text-gray-700">Content:</span>
            <InputTextarea
              placeholder="Content of the post"
              className={STYLE_CLASSES.FORM_BASIC_INPUT}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>

          <TagInput onTagsChange={setTags} />

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
              className={STYLE_CLASSES.FORM_BASIC_INPUT}
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
                className={STYLE_CLASSES.FORM_BASIC_INPUT}
                showIcon
              />
            </label>
          )}

          <SplitButton
            label={callToActionText}
            model={options}
            type="button"
            onClick={handleSubmit}
            className={STYLE_CLASSES.FORM_BASIC_SUBMIT_BUTTON}
          />
        </div>
      </form>
      <Toast ref={toast} />
    </div>
  );
};

export default BlogPostForm;
