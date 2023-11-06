"use client";

import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { getCountryCode, getCurrencySymbol } from "@/app/utils";
import ReadEditFormFields from "../form/ReadEditFormFields";
import { findJobTitle } from "../network";

const PLACEHOLDER_USER_ID = 1;

const defaultFormData = {
  cardId: "",
  boardId: "",
  jobId: "",
  company: {
    companyId: "",
    name: "",
  },
  jobTitle: "",
  description: "",
  workMode: "",
  payAmount: "",
  payFrequency: "",
  currency: "",
  streetAddress: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
  applicationLink: "",
  applicationDate: "",
  notes: "",
  status: "",
};

const EditCardFormModal = ({
  visible,
  onHide,
  cardData,
  onSaveChanges,
  onDelete,
}) => {
  const [formData, setFormData] = useState(cardData || defaultFormData);
  const [existingJobData, setExistingJobData] = useState(null);
  const [initialJobTitle, setInitialJobTitle] = useState(null);
  const [isReadOnly, setIsReadOnly] = useState(true);

  const hasDataChanged = JSON.stringify(cardData) !== JSON.stringify(formData);
  const isDataValid = formData.company.name && formData.jobTitle;
  const callToActionIcon =
    isDataValid && hasDataChanged ? "pi pi-check" : "pi pi-times";
  const callToActionStyle =
    isDataValid && hasDataChanged ? "success" : "secondary";

  useEffect(() => {
    setFormData(cardData || defaultFormData);
    setInitialJobTitle(cardData?.jobTitle);
  }, [cardData]);

  if (!cardData?.company?.name) return null;

  const handleInputChange = (name, value) => {
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const checkIfJobExists = async () => {
    if (formData.jobTitle === initialJobTitle) return;

    const jobData = await findJobTitle({
      userId: PLACEHOLDER_USER_ID,
      jobTitle: formData.jobTitle,
      companyName: formData.company.name,
      boardId: formData.boardId,
    });
    setExistingJobData(jobData);
  };

  const handleCountryChange = (country) => {
    const currencySymbol = getCurrencySymbol(country);
    const countryData = { country: country, currency: currencySymbol };
    setFormData({ ...formData, ...countryData });
  };

  const handleCompanyChange = (company) => {
    setFormData((prev) => ({
      ...prev,
      company: {
        companyId: company.companyId,
        name: company.name,
      },
    }));
  };

  const shutdownModal = () => {
    setIsReadOnly(true);
    setFormData(defaultFormData);
    onHide();
  };

  const countrySymbol = getCountryCode(formData.country);
  const currencySymbol = getCurrencySymbol(formData.country);
  const isCanceling = !hasDataChanged || !isDataValid;
  const primaryActionText = isCanceling ? "Close" : "Save Changes";

  const handleHide = (confirmChanges = true) => {
    if (hasDataChanged && confirmChanges) {
      confirmDialog({
        message: "Would you like to save your changes?",
        header: "Save Changes",
        icon: "",
        acceptClassName: "p-button-success",
        accept: () => {
          onSaveChanges(formData);
          shutdownModal();
        },
        reject: () => {
          shutdownModal();
        },
      });
    } else {
      shutdownModal();
    }
  };

  const handleFormSubmission = () => {
    if (isCanceling) {
      handleHide(false);
    } else {
      onSaveChanges(formData);
    }
  };

  const confirmDelete = () => {
    confirmDialog({
      message: "Are you sure you want to delete this job application?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => onDelete(cardData.cardId),
    });
  };

  return (
    <Dialog
      className="lg:w-1/2 md:w-2/3 sm:w-full"
      visible={visible}
      onHide={handleHide}
      header={`${isReadOnly ? "View" : "Edit"} Application`}
      dismissableMask
    >
      {isReadOnly ? (
        <Button
          className="absolute top-4 right-16  p-button-text"
          onClick={() => setIsReadOnly(false)}
        >
          Edit
        </Button>
      ) : null}
      <ReadEditFormFields
        {...formData}
        onInputChange={handleInputChange}
        onCountryChange={handleCountryChange}
        onCompanyChange={handleCompanyChange}
        countrySymbol={countrySymbol}
        currencySymbol={currencySymbol}
        onJobBlur={checkIfJobExists}
        existingJobData={existingJobData}
        isReadOnly={isReadOnly}
      />
      <ConfirmDialog />
      <div className="flex flex-wrap gap-2 justify-content-center align-items-center">
        <Button
          onClick={handleFormSubmission}
          severity={callToActionStyle}
          icon={callToActionIcon}
          label={primaryActionText}
          className="mr-2 pr-10 pl-10"
        />
        <Button
          className="p-button-danger p-button-outlined p-button p-component"
          onClick={confirmDelete}
          icon="pi pi-times"
          label="Delete"
        />
      </div>
    </Dialog>
  );
};

export default EditCardFormModal;
