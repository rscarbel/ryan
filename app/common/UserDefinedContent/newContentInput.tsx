"use client";
import { FC, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import ExistingContent from "./existingContent";
import createNewContentRequest from "./createNewContentRequest";

interface NewContentInputProps {
  contentKey: string;
  elementType: string;
  customProps?: Record<string, any>;
}

const NewContentInput: FC<NewContentInputProps> = ({
  contentKey,
  elementType,
  customProps,
}) => {
  const [newContentValue, setNewContentValue] = useState<string>("");
  const [newElementContent, setNewElementContent] =
    useState<JSX.Element | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useRef<Toast | null>(null);

  const showSuccess = (key: string) => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: `${key} created!`,
      life: 3000,
    });
  };

  const showError = (errorMessage: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: errorMessage,
      life: 3000,
    });
  };

  const handleContentChange = (e: any) => setNewContentValue(e.target.value);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await createNewContentRequest(
        contentKey,
        newContentValue,
        "PLAIN_TEXT"
      );

      if (response.error) {
        showError(response.error);
      } else {
        showSuccess(contentKey);
        setNewElementContent(
          <ExistingContent
            content={newContentValue}
            elementType={elementType}
            customProps={customProps}
          />
        );
      }
    } catch (error) {
      showError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    newElementContent || (
      <>
        <Toast ref={toast} />
        <InputText value={newContentValue} onChange={handleContentChange} />
        <Button
          label="Submit"
          icon="pi pi-check"
          loading={loading}
          onClick={handleSubmit}
        />
      </>
    )
  );
};

export default NewContentInput;
