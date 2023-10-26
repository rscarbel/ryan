"use client";

import { useState, useEffect } from "react";
import EditCardFormFields from "./EditCardFormFields";

const EditCardFormModal = ({ visible, onHide, cardData, onSubmit }) => {
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
    const cents = Math.round(parseFloat(value) * 100);
    setFormData({ ...formData, payAmountCents: cents });
  };

  const payFormAmount = formData?.payAmountCents / 100;

  const handleHide = () => {
    setFormData({});
    onHide();
  };

  return (
    <EditCardFormFields
      visible={visible}
      onHide={handleHide}
      onSubmit={onSubmit}
      formData={formData}
      hasDataChanged={hasDataChanged}
      isDataValid={isDataValid}
      onInputChange={handleInputChange}
      onPayAmountChange={handlePayAmountChange}
      payFormAmount={payFormAmount}
    />
  );
};

export default EditCardFormModal;
