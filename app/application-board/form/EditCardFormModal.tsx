"use client";

import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { STYLE_CLASSES, getCountryCode, getCurrencySymbol } from "@/app/utils";
import { payFrequencyOptions } from "../utils";
import CountriesField from "./CountriesField";

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

  const countrySymbol = getCountryCode(formData.country);
  const currencySymbol = getCurrencySymbol(formData.country);

  return (
    <Dialog
      className="lg:w-1/2 md:w-2/3 sm:w-full"
      visible={visible}
      onHide={handleHide}
      header="Edit Application"
    >
      <div className="p-fluid">
        <div className="p-field">
          <label className="block" htmlFor="companyName">
            Company Name
          </label>
          <InputText
            className={STYLE_CLASSES.FORM_BASIC_INPUT}
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
          />
        </div>

        <div className="p-field">
          <label className="block mt-8" htmlFor="jobTitle">
            Job Title
          </label>
          <InputText
            className={STYLE_CLASSES.FORM_BASIC_INPUT}
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
          />
        </div>

        <div className="p-field">
          <label className="block mt-8" htmlFor="jobDescription">
            Job Description
          </label>
          <InputTextarea
            className={STYLE_CLASSES.FORM_BASIC_INPUT}
            id="jobDescription"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleInputChange}
            rows={5}
            cols={30}
          />
        </div>

        <div className="p-field">
          <label className="block mt-8" htmlFor="pay">
            Job pay
          </label>
          <small id={`currency-${countrySymbol.toLowerCase()}-help`}>
            * If the job posting is a pay range, enter the pay you think you
            will get within that range.
          </small>
          <div className="flex items-center">
            <InputNumber
              inputId={`currency-${countrySymbol.toLowerCase()}`}
              value={payFormAmount}
              className={`${STYLE_CLASSES.FORM_BASIC_INPUT} flex-1 mr-2 p-4`}
              onValueChange={handlePayAmountChange}
              placeholder="0.00"
              mode="currency"
              currency={currencySymbol}
              locale={`en-${countrySymbol}`}
            />
            <Dropdown
              id="payFrequency"
              name="payFrequency"
              value={formData.payFrequency}
              options={payFrequencyOptions}
              onChange={handleInputChange}
              placeholder="Frequency"
              className={`${STYLE_CLASSES.FORM_BASIC_INPUT} flex-1 p-0`}
            />
          </div>
        </div>

        <div className="p-field mb-4">
          <label className="block mt-8" htmlFor="workMode">
            Work mode
          </label>
          <Dropdown
            id="workMode"
            name="workMode"
            value={formData.workMode}
            className={STYLE_CLASSES.FORM_BASIC_INPUT}
            options={["remote", "onsite", "hybrid"]}
            onChange={handleInputChange}
            placeholder="Select a Status"
          />
        </div>

        <div className="p-field">
          <label className="block mt-8" htmlFor="streetAddress">
            Street Address
          </label>
          <InputText
            className={STYLE_CLASSES.FORM_BASIC_INPUT}
            id="streetAddress"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center">
          <div className="p-field flex-1 mr-2">
            <label className="block mt-8" htmlFor="city">
              City
            </label>
            <InputText
              className={STYLE_CLASSES.FORM_BASIC_INPUT}
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>

          <div className="p-field flex-1">
            <label className="block mt-8" htmlFor="state">
              State
            </label>
            <InputText
              className={STYLE_CLASSES.FORM_BASIC_INPUT}
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="p-field flex-1 mr-2">
            <label className="block mt-8" htmlFor="postalCode">
              Postal Code
            </label>
            <InputText
              className={STYLE_CLASSES.FORM_BASIC_INPUT}
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
            />
          </div>

          <CountriesField
            selectedCountry={formData.country}
            onChange={handleInputChange}
          />
        </div>

        <div className="p-field">
          <label className="block mt-8" htmlFor="applicationLink">
            Application Link
          </label>
          <InputText
            className={STYLE_CLASSES.FORM_BASIC_INPUT}
            id="applicationLink"
            name="applicationLink"
            value={formData.applicationLink}
            onChange={handleInputChange}
          />
        </div>

        <div className="p-field">
          <label className="block mt-8" htmlFor="applicationDate">
            Application Date
          </label>
          <Calendar
            id="applicationDate"
            name="applicationDate"
            className={STYLE_CLASSES.FORM_BASIC_INPUT}
            value={new Date(formData.applicationDate)}
            onChange={handleInputChange}
            dateFormat="dd/mm/yy"
          />
        </div>

        <div className="p-field">
          <label className="block mt-8" htmlFor="notes">
            Notes
          </label>
          <InputTextarea
            className={STYLE_CLASSES.FORM_BASIC_INPUT}
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={5}
            cols={30}
          />
        </div>

        <div className="p-field mb-4">
          <label className="block mt-8" htmlFor="status">
            Status
          </label>
          <Dropdown
            id="status"
            name="status"
            value={formData.status}
            className={STYLE_CLASSES.FORM_BASIC_INPUT}
            options={[
              "applied",
              "interview",
              "offer",
              "rejected",
              "accepted",
              "passed",
            ]}
            onChange={handleInputChange}
            placeholder="Select a Status"
          />
        </div>
      </div>
      <button
        className={
          hasDataChanged
            ? STYLE_CLASSES.FORM_BASIC_SUBMIT_BUTTON
            : STYLE_CLASSES.FORM_BASIC_SUBMIT_BUTTON_DISABLED
        }
        onClick={() => onSubmit(formData)}
        disabled={!hasDataChanged || !isDataValid}
      >
        Submit
      </button>
    </Dialog>
  );
};

export default EditCardFormModal;
