// @ts-nocheck
"use client";

import React, { useState, ChangeEvent } from "react";
import { InputText } from "primereact/inputtext";
import { Chip } from "primereact/chip";

interface Props {
  onTagsChange?: (tags: { id: string; value: string }[]) => void;
}

const TagInput: React.FC<Props> = ({ onTagsChange }) => {
  const [tagArray, setTagArray] = useState<{ id: string; value: string }[]>([]);
  const [currentTag, setCurrentTag] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.includes(",")) {
      const newTagValue = value.replace(",", "").trim();

      if (newTagValue && !tagArray.some((tag) => tag.value === newTagValue)) {
        const newTag = { id: Date.now().toString(), value: newTagValue };
        const updatedTags = [...tagArray, newTag];
        setTagArray(updatedTags);
        onTagsChange?.(updatedTags.map((tag) => tag.value));
      }
      setCurrentTag("");
    } else {
      setCurrentTag(value);
    }
  };

  const handleTagDelete = (id: string) => {
    const newTags = tagArray.filter((tag) => tag.id !== id);
    setTagArray(newTags);
    onTagsChange?.(newTags.map((tag) => tag.value));
  };

  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">Tags:</span>
      <div className="flex flex-wrap mt-2">
        {tagArray.map((tag) => (
          <Chip
            label={tag.value}
            className="m-1"
            removable
            onRemove={() => handleTagDelete(tag.id)}
            key={tag.id}
          />
        ))}
      </div>
      <InputText
        placeholder="e.g., tech, blogging, tutorials"
        className="mt-1 w-full p-2 shadow-sm border border-gray-300 rounded"
        value={currentTag}
        onChange={handleInputChange}
      />
    </label>
  );
};

export default TagInput;
