import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Tooltip } from "primereact/tooltip";
import { STYLE_CLASSES } from "@/app/utils";
import { payFrequencyOptions } from "../utils";
import CountriesField from "./CountriesField";
import CompaniesField from "./CompaniesField";

const FormFields = ({
  company: { name: companyName = null, companyId: companyId = null },
  jobTitle = null,
  jobId = null,
  jobDescription = null,
  workMode = null,
  payAmountCents = null,
  payFrequency = null,
  streetAddress = null,
  city = null,
  state = null,
  country = null,
  postalCode = null,
  applicationLink,
  applicationDate,
  notes,
  status,
  onInputChange,
  onPayChange,
  onCountryChange,
  onCompanyChange,
  onJobBlur,
  existingJobData,
  countrySymbol,
  currencySymbol,
  isDisabled = false,
}) => {
  const previousBoardName =
    existingJobData?.lastApplicationToJobInOtherBoard?.boardName;
  const previousBoardDate =
    existingJobData?.lastApplicationToJobInOtherBoard?.date;

  const previousApplicationDateOnThisBoard =
    existingJobData?.lastApplicationToJobInThisBoard;

  const sameJobMessage = () => {
    if (previousApplicationDateOnThisBoard) {
      return (
        <div className="ml-2">
          <span
            className="pi pi-exclamation-triangle mt-2 text-lg cursor-pointer "
            style={{ color: "#ff9800" }}
            data-pr-tooltip={`An application already exists with this job title at ${companyName}. You applied on ${previousApplicationDateOnThisBoard}.`}
          ></span>
          <Tooltip
            target=".pi.pi-exclamation-triangle"
            tooltipOptions={{ position: "top" }}
          />
        </div>
      );
    } else if (previousBoardName) {
      return (
        <div className="p-4 border rounded-lg bg-blue-50 border-blue-200 shadow-sm">
          <div className="flex items-center">
            <span
              className="pi pi-info-circle text-lg cursor-pointer mr-2 text-blue-600"
              data-pr-tooltip={`You applied for ${jobTitle} at ${companyName} on ${previousBoardDate} on the board, ${previousBoardName}.`}
            ></span>
            <p className="text-blue-700">Information</p>
          </div>
          <Tooltip
            target=".pi.pi-info-circle"
            tooltipOptions={{ position: "top" }}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="p-fluid">
      <div className="p-field">
        <CompaniesField
          selectedCompany={{ name: companyName, companyId: companyId }}
          onChange={onCompanyChange}
          isDisabled={isDisabled}
        />
      </div>

      <div className="p-field">
        <label className="block mt-8 flex items-center" htmlFor="jobTitle">
          Job Title {sameJobMessage()}
        </label>
        <InputText
          className={STYLE_CLASSES.FORM_BASIC_INPUT}
          id="jobTitle"
          name="jobTitle"
          value={jobTitle}
          onBlur={onJobBlur}
          onChange={onInputChange}
          disabled={isDisabled}
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
          disabled={isDisabled}
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
            value={payAmountCents / 100}
            className={`flex-1 mr-2`}
            onValueChange={onPayChange}
            placeholder="0.00"
            mode="currency"
            currency={currencySymbol}
            locale={`en-${countrySymbol}`}
            disabled={isDisabled}
          />
          <Dropdown
            id="payFrequency"
            name="payFrequency"
            value={payFrequency}
            options={payFrequencyOptions}
            onChange={onInputChange}
            placeholder="Frequency"
            className="flex-1"
            disabled={isDisabled}
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
          disabled={isDisabled}
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
          disabled={isDisabled}
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
            disabled={isDisabled}
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
            disabled={isDisabled}
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
            disabled={isDisabled}
          />
        </div>

        <CountriesField
          selectedCountry={country}
          onChange={onCountryChange}
          isDisabled={isDisabled}
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
          value={applicationLink}
          onChange={onInputChange}
          disabled={isDisabled}
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
          disabled={isDisabled}
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
          disabled={isDisabled}
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
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};

export default FormFields;
