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
import { findJobTitle } from "../network";

const MILLISECONDS_FOR_MESSAGES = 5000;
const PLACEHOLDER_USER_ID = 1;

const defaultFormData = {
  applicationCardId: null,
  boardId: 1,
  company: {
    companyId: null,
    name: null,
  },
  jobTitle: null,
  description: null,
  workMode: null,
  payAmountCents: 0,
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

const CreateCard: React.FC = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [loading, setLoading] = useState(false);
  const [existingJobData, setExistingJobData] = useState(null);

  const toast = useRef<Toast | null>(null);
  const isDataValid = formData.company.name && formData.jobTitle;

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

  const checkIfJobExists = async () => {
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
          onCountryChange={handleCountryChange}
          onPayChange={handlePayAmountChange}
          onCompanyChange={handleCompanyChange}
          countrySymbol={countrySymbol}
          currencySymbol={currencySymbol}
          payFormAmount={payFormAmount}
          onJobBlur={checkIfJobExists}
          existingJobData={existingJobData}
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
