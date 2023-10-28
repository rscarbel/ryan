"use client";

import FormFields from "../edit-card/FormFields";
import TopMenu from "../TopMenu";
import { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { getCountryCode, getCurrencySymbol } from "@/app/utils";
import { createCard } from "../network";
import "primereact/resources/themes/viva-light/theme.css";
import "primeicons/primeicons.css";

const MILLISECONDS_FOR_MESSAGES = 5000;

const CreateCard: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    jobDescription: "",
    payAmountCents: 0,
    payFrequency: "yearly",
    workMode: "onsite",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    applicationLink: "",
    applicationDate: "",
    notes: "",
    status: "applied",
  });
  const [loading, setLoading] = useState(false);

  const toast = useRef<Toast | null>(null);
  const isDataValid = formData.companyName && formData.jobTitle;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const showError = (errorMessage: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: errorMessage,
      life: MILLISECONDS_FOR_MESSAGES,
    });
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

  const countrySymbol = getCountryCode(formData.country);
  const currencySymbol = getCurrencySymbol(formData.country);

  const handleFormSubmission = async () => {
    setLoading(true);
    try {
      await createCard(formData);
    } catch (error) {
      showError((error as Error).message);
    }
    setLoading(false);
  };

  return (
    <>
      <TopMenu activeIndex={1} />
      <div className="mt-10 mb-10 mx-auto p-10 bg-white rounded-lg shadow-md xs:w-full md:w-1/2 claymorphic-shadow">
        <FormFields
          {...formData}
          onInputChange={handleInputChange}
          onCountryChange={onCountryChange}
          onPayChange={handlePayAmountChange}
          countrySymbol={countrySymbol}
          currencySymbol={currencySymbol}
          payFormAmount={payFormAmount}
          isDisabled={loading}
        />
        <Button
          onClick={handleFormSubmission}
          icon={loading ? <ProgressSpinner /> : "pi pi-check"}
          label={loading ? "Saving Application..." : "Create Application"}
          className="mr-2 pr-10 pl-10"
          disabled={!isDataValid || loading}
        />
      </div>
      <Toast ref={toast} />
    </>
  );
};

export default CreateCard;
