"use client";

import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { getCountryCode, getCurrencySymbol } from "@/app/utils";
import FormFields from "./FormFields";

const defaultFormData = {
  company: {
    id: null,
    name: null,
  },
  job: {
    id: null,
    title: null,
    description: null,
    workMode: null,
    payAmountCents: null,
    payFrequency: null,
    currency: null,
    location: {
      id: null,
      streetAddress: null,
      city: null,
      state: null,
      country: null,
      postalCode: null,
    },
  },
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
  const hasDataChanged = JSON.stringify(cardData) !== JSON.stringify(formData);
  const isDataValid = formData.company.name && formData.job.title;

  useEffect(() => {
    setFormData(cardData || defaultFormData);
  }, [cardData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
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
    setFormData((prev) => ({
      ...prev,
      job: {
        ...prev.job,
        location: {
          ...prev.job.location,
          country: country,
        },
      },
      currency: currencySymbol,
    }));
  };

  const handleJobChange = (job) => {
    setFormData((prev) => ({
      ...prev,
      job: {
        id: job.id,
        title: job.title,
        description: job.description,
        workMode: job.workMode,
        payAmountCents: job.payAmountCents,
        payFrequency: job.payFrequency,
        currency: job.currency,
        location: {
          id: job.location.id,
          streetAddress: job.location.streetAddress,
          city: job.location.city,
          state: job.location.state,
          country: job.location.country,
          postalCode: job.location.postalCode,
        },
      },
    }));
  };

  const handleCompanyChange = (company) => {
    setFormData((prev) => ({
      ...prev,
      company: {
        id: company.id,
        name: company.name,
      },
    }));
  };

  const payFormAmount = formData.job.payAmountCents / 100;
  const countrySymbol = getCountryCode(formData.job.location.country);
  const currencySymbol = getCurrencySymbol(formData.job.location.country);
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
      accept: () => onDelete(cardData.id),
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
        onJobChange={handleJobChange}
        onPayChange={handlePayAmountChange}
        onCompanyChange={handleCompanyChange}
        countrySymbol={countrySymbol}
        currencySymbol={currencySymbol}
        payFormAmount={payFormAmount}
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
