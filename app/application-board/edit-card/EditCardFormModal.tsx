"use client";

import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { getCountryCode, getCurrencySymbol } from "@/app/utils";
import FormFields from "./FormFields";
import { findJobTitle } from "../network";

const PLACEHOLDER_USER_ID = 1;

const defaultFormData = {
  applicationCardId: null,
  boardId: null,
  jobId: null,
  company: {
    companyId: null,
    name: null,
  },
  jobTitle: null,
  description: null,
  workMode: null,
  payAmountCents: null,
  payFrequency: null,
  currency: null,
  streetAddress: null,
  city: null,
  state: null,
  country: null,
  postalCode: null,
  applicationLink: null,
  applicationDate: null,
  notes: null,
  status: null,
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
  const hasDataChanged = JSON.stringify(cardData) !== JSON.stringify(formData);
  const isDataValid = formData.company.name && formData.jobTitle;

  useEffect(() => {
    setFormData(cardData || defaultFormData);
    setInitialJobTitle(cardData?.jobTitle);
  }, [cardData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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

  const handlePayAmountChange = (e) => {
    const { value } = e.target;
    const cents = Math.round(parseFloat(value) * 100) || 0;
    setFormData((prev) => ({
      ...prev,
      job: { ...prev.job, payAmountCents: cents },
    }));
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

  const payFormAmount = formData.payAmountCents / 100;
  const countrySymbol = getCountryCode(formData.country);
  const currencySymbol = getCurrencySymbol(formData.country);
  const isReadyForSubmission = !hasDataChanged || !isDataValid;
  const primaryActionText = isReadyForSubmission ? "Close" : "Save Changes";

  const handleHide = () => {
    setFormData(defaultFormData);
    onHide();
  };

  const handleFormSubmission = () => {
    if (isReadyForSubmission) {
      handleHide();
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
      accept: () => onDelete(cardData.applicationCardId),
    });
  };

  return (
    <Dialog
      className="lg:w-1/2 md:w-2/3 sm:w-full"
      visible={visible}
      onHide={handleHide}
      header="Edit Application"
      dismissableMask
    >
      <FormFields
        {...formData}
        onInputChange={handleInputChange}
        onCountryChange={handleCountryChange}
        onPayChange={handlePayAmountChange}
        onCompanyChange={handleCompanyChange}
        countrySymbol={countrySymbol}
        currencySymbol={currencySymbol}
        payFormAmount={payFormAmount}
        onJobBlur={checkIfJobExists}
        existingJobData={existingJobData}
      />
      <ConfirmDialog />
      <div className="flex flex-wrap gap-2 justify-content-center align-items-center">
        <Button
          onClick={handleFormSubmission}
          icon="pi pi-check"
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
