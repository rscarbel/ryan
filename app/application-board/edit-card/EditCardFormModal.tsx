"use client";

import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { getCountryCode, getCurrencySymbol } from "@/app/utils";
import FormFields from "./FormFields";

const EditCardFormModal = ({
  visible,
  onHide,
  cardData,
  onSaveChanges,
  onDelete,
}) => {
  const [formData, setFormData] = useState(cardData || {});
  const hasDataChanged = JSON.stringify(cardData) !== JSON.stringify(formData);
  const isDataValid = formData.companyName && formData.jobTitle;

  useEffect(() => {
    setFormData(cardData || {});
  }, [cardData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePayAmountChange = (e) => {
    const { value } = e.target;
    const cents = Math.round(parseFloat(value) * 100) || 0;
    setFormData({ ...formData, payAmountCents: cents });
  };

  const onCountryChange = (country) => {
    const currencySymbol = getCurrencySymbol(country);
    const countryData = { country: country, currency: currencySymbol };
    setFormData({ ...formData, ...countryData });
  };

  const payFormAmount = formData?.payAmountCents / 100;

  const handleHide = () => {
    setFormData({});
    onHide();
  };

  const countrySymbol = getCountryCode(formData.country);
  const currencySymbol = getCurrencySymbol(formData.country);
  const isReadyForSubmission = !hasDataChanged || !isDataValid;
  const primaryActionText = isReadyForSubmission ? "Close" : "Save Changes";

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
        onCountryChange={onCountryChange}
        onPayChange={handlePayAmountChange}
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
