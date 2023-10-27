import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { STYLE_CLASSES } from "@/app/utils";
import { payFrequencyOptions } from "../utils";
import CountriesField from "./CountriesField";

const FormFields = ({
  companyName,
  jobTitle,
  jobDescription,
  payFormAmount,
  payFrequency,
  workMode,
  streetAddress,
  city,
  state,
  postalCode,
  country,
  applicationLink,
  applicationDate,
  notes,
  status,
  onInputChange,
  onPayChange,
  onCountryChange,
  countrySymbol,
  currencySymbol,
}) => {
  return (
    <div className="p-fluid">
      <div className="p-field">
        <label className="block" htmlFor="companyName">
          Company Name
        </label>
        <InputText
          className={STYLE_CLASSES.FORM_BASIC_INPUT}
          id="companyName"
          name="companyName"
          value={companyName}
          onChange={onInputChange}
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
          value={jobTitle}
          onChange={onInputChange}
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
          value={jobDescription}
          onChange={onInputChange}
          rows={5}
          cols={30}
        />
      </div>

      <div className="p-field">
        <label className="block mt-8" htmlFor="pay">
          Job pay
        </label>
        <small id={`currency-${countrySymbol.toLowerCase()}-help`}>
          * If the job posting is a pay range, enter the pay you think you will
          get within that range.
        </small>
        <div className="flex items-center">
          <InputNumber
            inputId={`currency-${countrySymbol.toLowerCase()}`}
            value={payFormAmount}
            className={`flex-1 mr-2`}
            onValueChange={onPayChange}
            placeholder="0.00"
            mode="currency"
            currency={currencySymbol}
            locale={`en-${countrySymbol}`}
          />
          <Dropdown
            id="payFrequency"
            name="payFrequency"
            value={payFrequency}
            options={payFrequencyOptions}
            onChange={onInputChange}
            placeholder="Frequency"
            className="flex-1"
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
          value={workMode}
          className={STYLE_CLASSES.FORM_BASIC_INPUT}
          options={["remote", "onsite", "hybrid"]}
          onChange={onInputChange}
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
          value={streetAddress}
          onChange={onInputChange}
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
            value={city}
            onChange={onInputChange}
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
            value={state}
            onChange={onInputChange}
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
            value={postalCode}
            onChange={onInputChange}
          />
        </div>

        <CountriesField selectedCountry={country} onChange={onCountryChange} />
      </div>

      <div className="p-field">
        <label className="block mt-8" htmlFor="applicationLink">
          Application Link
        </label>
        <InputText
          className={STYLE_CLASSES.FORM_BASIC_INPUT}
          id="applicationLink"
          name="applicationLink"
          value={applicationLink}
          onChange={onInputChange}
        />
      </div>

      <div className="p-field">
        <label className="block mt-8" htmlFor="applicationDate">
          Application Date
        </label>
        <Calendar
          id="applicationDate"
          name="applicationDate"
          className="mt-1 w-full shadow-sm border-gray-300 rounded  focus:border-blue-500 focus:ring focus:ring-blue-200"
          value={new Date(applicationDate || Date.now())}
          onChange={onInputChange}
          dateFormat="mm/dd/yy"
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
          value={notes}
          onChange={onInputChange}
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
          value={status}
          className={STYLE_CLASSES.FORM_BASIC_INPUT}
          options={[
            "applied",
            "interview",
            "offer",
            "rejected",
            "accepted",
            "passed",
          ]}
          onChange={onInputChange}
          placeholder="Select a Status"
        />
      </div>
    </div>
  );
};

export default FormFields;
