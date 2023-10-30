import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { STYLE_CLASSES, formatCurrency } from "@/app/utils";
import { payFrequencyOptions, humanizedPayFrequency } from "../utils";
import ReadEditCountriesField from "./ReadEditCountriesField";
import ReadEditCompaniesField from "./ReadEditCompaniesField";
import { Inplace, InplaceDisplay, InplaceContent } from "primereact/inplace";
import SameJobMessage from "./SameJobMessage";
import EditIcon from "./EditIcon";
import Undo from "./Undo";
import { Divider } from "primereact/divider";

const ReadEditFormFields = (props) => {
  const [localState, setLocalState] = useState({
    jobTitle: props.jobTitle,
    jobDescription: props.jobDescription,
    payAmountCents: props.payAmountCents,
    payFrequency: props.payFrequency,
    workMode: props.workMode,
    streetAddress: props.streetAddress,
    city: props.city,
    state: props.state,
    postalCode: props.postalCode,
    applicationLink: props.applicationLink,
    applicationDate: props.applicationDate,
    notes: props.notes,
    status: props.status,
    existingJobData: props.existingJobData,
    isDisabled: props.isDisabled,
  });
  const [isHelpTextVisible, setIsHelpTextVisible] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    setInitialValues({
      jobTitle: props.jobTitle,
      jobDescription: props.jobDescription,
      payAmountCents: props.payAmountCents,
      payFrequency: props.payFrequency,
      workMode: props.workMode,
      streetAddress: props.streetAddress,
      city: props.city,
      state: props.state,
      postalCode: props.postalCode,
      applicationLink: props.applicationLink,
      applicationDate: props.applicationDate,
      notes: props.notes,
      status: props.status,
      existingJobData: props.existingJobData,
      isDisabled: props.isDisabled,
      company: props.company,
    });
  }, []);

  const resetField = (fieldName) => {
    setLocalState((prevState) => ({
      ...prevState,
      [fieldName]: initialValues[fieldName],
    }));
    props.onInputChange(fieldName, initialValues[fieldName]);
  };

  const payAmountDisplay = formatCurrency(
    props.payAmountCents,
    props.country,
    props.currency
  );

  const payFrequencyDisplay = humanizedPayFrequency[props.payFrequency];
  const payDisplay = `${payAmountDisplay} ${payFrequencyDisplay}`;

  const handleLocalChange = (e) => {
    const { name, value } = e.target;
    setLocalState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePayAmountChange = (e) => {
    const { value } = e.target;
    const cents = Math.round(parseFloat(value) * 100) || 0;
    setLocalState((prevState) => ({
      ...prevState,
      payAmountCents: cents,
    }));
  };

  const handleInplaceClose = (fieldName) => {
    props.onInputChange(fieldName, localState[fieldName]);
  };
  const companyName = props.company?.name;
  const companyId = props.company?.companyId;

  const previousBoardName =
    props.existingJobData?.lastApplicationToJobInOtherBoard?.boardName;
  const previousBoardDate =
    props.existingJobData?.lastApplicationToJobInOtherBoard?.date;

  const previousApplicationDateOnThisBoard =
    props.existingJobData?.lastApplicationToJobInThisBoard;

  return (
    <div className="p-fluid flex flex-col justify-evenly flex-wrap">
      <div className="p-field w-full p-3 flex flex-col justify-evenly flex-wrap">
        <div className="flex w-full">
          <ReadEditCompaniesField
            selectedCompany={{
              name: companyName || "",
              companyId: companyId || "",
            }}
            onChange={props.onCompanyChange}
            isDisabled={props.isDisabled}
            onClick={() => resetField("company")}
            originalValue={initialValues?.company?.name}
            newValue={props?.company?.name}
            isReadOnly={props.isReadOnly}
          />
        </div>
      </div>
      <Divider className="flex m" align="center">
        Job Details
      </Divider>
      <div className="flex justify-evenly">
        <div className="p-field p-3">
          <label
            className="block mb-2 flex text-xl text-slate-600"
            htmlFor="jobTitle"
          >
            Job Title{" "}
            <SameJobMessage
              previousApplicationDateOnThisBoard={
                previousApplicationDateOnThisBoard
              }
              companyName={companyName}
              previousBoardName={previousBoardName}
              previousBoardDate={previousBoardDate}
              jobTitle={props.jobTitle}
            />
          </label>
          <Inplace
            closable
            closeIcon="pi pi-check"
            onClose={() => handleInplaceClose("jobTitle")}
            disabled={props.isReadOnly}
          >
            <InplaceDisplay>
              {localState.jobTitle}
              <EditIcon isVisible={!props.isReadOnly} />
            </InplaceDisplay>
            <InplaceContent>
              <InputText
                className={STYLE_CLASSES.FORM_BASIC_INPUT}
                id="jobTitle"
                name="jobTitle"
                value={localState.jobTitle}
                onChange={handleLocalChange}
                disabled={props.isDisabled}
              />
            </InplaceContent>
          </Inplace>
          <Undo
            onClick={() => resetField("jobTitle")}
            originalValue={initialValues?.jobTitle}
            newValue={props.jobTitle}
          />
        </div>
        <div className="p-field p-3">
          <label
            className="block mb-2 flex text-xl text-slate-600"
            htmlFor="pay"
          >
            Pay rate
          </label>
          {isHelpTextVisible && (
            <small id={`currency-${props.countrySymbol.toLowerCase()}-help`}>
              * If the job posting is a pay range, enter the pay you think you
              will get within that range.
            </small>
          )}
          <div className="flex">
            <Inplace
              closable
              closeIcon="pi pi-check"
              onClose={() => {
                setIsHelpTextVisible(false);
                handleInplaceClose("payAmountCents");
                handleInplaceClose("payFrequency");
              }}
              onOpen={() => setIsHelpTextVisible(true)}
              disabled={props.isReadOnly}
            >
              <InplaceDisplay>
                {payDisplay}
                <EditIcon isVisible={!props.isReadOnly} />
              </InplaceDisplay>
              <InplaceContent>
                <div className="flex">
                  <InputNumber
                    inputId={`currency-${props.countrySymbol.toLowerCase()}`}
                    value={localState.payAmountCents / 100}
                    className={`flex-1 mr-2`}
                    onValueChange={handlePayAmountChange}
                    placeholder="0.00"
                    mode="currency"
                    currency={props.currencySymbol}
                    locale={`en-${props.countrySymbol}`}
                    disabled={props.isDisabled}
                  />

                  <Dropdown
                    id="payFrequency"
                    name="payFrequency"
                    value={localState.payFrequency}
                    options={payFrequencyOptions}
                    onChange={handleLocalChange}
                    placeholder="Frequency"
                    className="flex-1"
                    disabled={props.isDisabled}
                  />
                </div>
              </InplaceContent>
            </Inplace>
            <Undo
              onClick={() => {
                resetField("payAmountCents");
                resetField("payFrequency");
              }}
              originalValue={
                initialValues?.payAmountCents + initialValues?.payFrequency
              }
              newValue={props.payAmountCents + props.payFrequency}
            />
          </div>
        </div>
        <div className="p-field mb-4 p-3">
          <label
            className="blockmb-2 flex text-xl text-slate-600"
            htmlFor="workMode"
          >
            Work mode
          </label>
          <div className="flex">
            <Inplace
              closable
              closeIcon="pi pi-check"
              onClose={() => handleInplaceClose("workMode")}
              disabled={props.isReadOnly}
            >
              <InplaceDisplay>
                {props.workMode}
                <EditIcon isVisible={!props.isReadOnly} />
              </InplaceDisplay>
              <InplaceContent>
                <Dropdown
                  id="workMode"
                  name="workMode"
                  value={localState.workMode}
                  className={STYLE_CLASSES.FORM_BASIC_INPUT}
                  options={["remote", "onsite", "hybrid"]}
                  onChange={handleLocalChange}
                  placeholder="Select a Status"
                  disabled={props.isDisabled}
                />
              </InplaceContent>
            </Inplace>
            <Undo
              onClick={() => resetField("workMode")}
              originalValue={initialValues?.workMode}
              newValue={props.workMode}
            />
          </div>
        </div>
      </div>

      <div className="p-field p-3 flex flex-col justify-evenly flex-wrap">
        <label
          className="block mb-2 flex text-xl text-slate-600"
          htmlFor="jobDescription"
        >
          Job Description
        </label>
        <div className="flex content-center">
          <Inplace
            closable
            closeIcon="pi pi-check"
            onClose={() => handleInplaceClose("jobDescription")}
            disabled={props.isReadOnly}
          >
            <InplaceDisplay>
              {localState.jobDescription || "Click to edit"}
              <EditIcon isVisible={!props.isReadOnly} />
            </InplaceDisplay>
            <InplaceContent>
              <InputTextarea
                className={STYLE_CLASSES.FORM_BASIC_INPUT}
                id="jobDescription"
                name="jobDescription"
                value={localState.jobDescription}
                onChange={handleLocalChange}
                disabled={props.isDisabled}
                rows={5}
                cols={30}
              />
            </InplaceContent>
          </Inplace>
          <Undo
            onClick={() => resetField("jobDescription")}
            originalValue={initialValues?.jobDescription}
            newValue={props.jobDescription}
          />
        </div>
      </div>
      <Divider className="flex m" align="center">
        Address
      </Divider>
      <div className="p-field p-3 flex justify-evenly content-center items-start">
        <div className="p-field p-3 flex flex-col justify-evenly flex-wrap">
          <label
            className="block mb-2 flex text-xl text-slate-600"
            htmlFor="streetAddress"
          >
            Street Address
          </label>
          <div className="p-field p-3">
            <Inplace
              closable
              closeIcon="pi pi-check"
              onClose={() => handleInplaceClose("streetAddress")}
              disabled={props.isReadOnly}
            >
              <InplaceDisplay>
                {props.streetAddress}
                <EditIcon isVisible={!props.isReadOnly} />
              </InplaceDisplay>
              <InplaceContent>
                <InputText
                  className={STYLE_CLASSES.FORM_BASIC_INPUT}
                  id="streetAddress"
                  name="streetAddress"
                  value={localState.streetAddress}
                  onChange={handleLocalChange}
                  disabled={props.isDisabled}
                />
              </InplaceContent>
            </Inplace>
            <Undo
              onClick={() => resetField("streetAddress")}
              originalValue={initialValues?.streetAddress}
              newValue={props.streetAddress}
            />
          </div>
        </div>
        <div className="p-field p-3">
          <label
            className="block mb-2 flex text-xl text-slate-600"
            htmlFor="city"
          >
            City
          </label>
          <div className="flex">
            <Inplace
              closable
              closeIcon="pi pi-check"
              onClose={() => handleInplaceClose("city")}
              disabled={props.isReadOnly}
            >
              <InplaceDisplay>
                {props.city || "Click to edit"}
                <EditIcon isVisible={!props.isReadOnly} />
              </InplaceDisplay>
              <InplaceContent>
                <InputText
                  className={STYLE_CLASSES.FORM_BASIC_INPUT}
                  id="city"
                  name="city"
                  value={localState.city}
                  onChange={handleLocalChange}
                  disabled={props.isDisabled}
                />
              </InplaceContent>
            </Inplace>
            <Undo
              onClick={() => resetField("city")}
              originalValue={initialValues?.city}
              newValue={props.city}
            />
          </div>
        </div>

        <div className="p-field p-3">
          <label
            className="block mb-2 flex text-xl text-slate-600"
            htmlFor="state"
          >
            State
          </label>
          <div className="flex">
            <Inplace
              closable
              closeIcon="pi pi-check"
              onClose={() => handleInplaceClose("state")}
              disabled={props.isReadOnly}
            >
              <InplaceDisplay>
                {props.state || "Click to edit"}
                <EditIcon isVisible={!props.isReadOnly} />
              </InplaceDisplay>
              <InplaceContent>
                <InputText
                  className={STYLE_CLASSES.FORM_BASIC_INPUT}
                  id="state"
                  name="state"
                  value={localState.state}
                  onChange={handleLocalChange}
                  disabled={props.isDisabled}
                />
              </InplaceContent>
            </Inplace>
            <Undo
              onClick={() => resetField("state")}
              originalValue={initialValues?.state}
              newValue={props.state}
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="p-field flex-1 mr-2">
          <label
            className="block mb-2 flex text-xl text-slate-600"
            htmlFor="postalCode"
          >
            Postal Code
          </label>
          <div className="flex">
            <Inplace
              closable
              closeIcon="pi pi-check"
              onClose={() => handleInplaceClose("postalCode")}
              disabled={props.isReadOnly}
            >
              <InplaceDisplay>
                {props.postalCode || "Click to edit"}
                <EditIcon isVisible={!props.isReadOnly} />
              </InplaceDisplay>
              <InplaceContent>
                <InputText
                  className={STYLE_CLASSES.FORM_BASIC_INPUT}
                  id="postalCode"
                  name="postalCode"
                  value={localState.postalCode}
                  onChange={handleLocalChange}
                  disabled={props.isDisabled}
                />
              </InplaceContent>
            </Inplace>
            <Undo
              onClick={() => resetField("postalCode")}
              originalValue={initialValues?.postalCode}
              newValue={props.postalCode}
            />
          </div>
        </div>

        <ReadEditCountriesField
          selectedCountry={props.country}
          onChange={props.onCountryChange}
          isDisabled={props.isDisabled}
          isReadOnly={props.isReadOnly}
        />
      </div>

      <div className="p-field p-3 flex flex-col justify-evenly flex-wrap">
        <label
          className="block mb-2 flex text-xl text-slate-600"
          htmlFor="applicationLink"
        >
          Application Link
        </label>
        <div className="flex">
          <Inplace
            closable
            closeIcon="pi pi-check"
            onClose={() => handleInplaceClose("applicationLink")}
            disabled={props.isReadOnly}
          >
            <InplaceDisplay>
              {props.applicationLink || "Click to edit"}
              <EditIcon isVisible={!props.isReadOnly} />
            </InplaceDisplay>
            <InplaceContent>
              <InputText
                className={STYLE_CLASSES.FORM_BASIC_INPUT}
                id="applicationLink"
                name="applicationLink"
                value={localState.applicationLink}
                onChange={handleLocalChange}
                disabled={props.isDisabled}
              />
            </InplaceContent>
          </Inplace>
          <Undo
            onClick={() => resetField("applicationLink")}
            originalValue={initialValues?.applicationLink}
            newValue={props.applicationLink}
          />
        </div>
      </div>

      <div className="p-field p-3 flex flex-col justify-evenly flex-wrap">
        <label
          className="block mb-2 flex text-xl text-slate-600"
          htmlFor="applicationDate"
        >
          Application Date
        </label>
        <div className="flex">
          <Inplace
            closable
            closeIcon="pi pi-check"
            onClose={() => handleInplaceClose("applicationDate")}
            disabled={props.isReadOnly}
          >
            <InplaceDisplay>
              {props.applicationDate || "Click to edit"}
              <EditIcon isVisible={!props.isReadOnly} />
            </InplaceDisplay>
            <InplaceContent>
              <Calendar
                id="applicationDate"
                name="applicationDate"
                className="mt-1 w-full shadow-sm border-gray-300 rounded  focus:border-blue-500 focus:ring focus:ring-blue-200"
                value={new Date(localState.applicationDate || Date.now())}
                onChange={handleLocalChange}
                dateFormat="mm/dd/yy"
                disabled={props.isDisabled}
              />
            </InplaceContent>
          </Inplace>
          <Undo
            onClick={() => resetField("applicationDate")}
            originalValue={initialValues?.applicationDate}
            newValue={props.applicationDate}
          />
        </div>
      </div>

      <div className="p-field p-3 flex flex-col justify-evenly flex-wrap">
        <label
          className="block mb-2 flex text-xl text-slate-600"
          htmlFor="notes"
        >
          Notes
        </label>
        <div className="flex">
          <Inplace
            closable
            closeIcon="pi pi-check"
            onClose={() => handleInplaceClose("notes")}
            disabled={props.isReadOnly}
          >
            <InplaceDisplay>
              {props.notes || "Click to edit"}
              <EditIcon isVisible={!props.isReadOnly} />
            </InplaceDisplay>
            <InplaceContent>
              <InputTextarea
                className={STYLE_CLASSES.FORM_BASIC_INPUT}
                id="notes"
                name="notes"
                value={localState.notes}
                onChange={handleLocalChange}
                rows={5}
                cols={30}
                disabled={props.isDisabled}
              />
            </InplaceContent>
          </Inplace>
          <Undo
            onClick={() => resetField("notes")}
            originalValue={initialValues?.notes}
            newValue={props.notes}
          />
        </div>
      </div>

      <div className="p-field mb-4">
        <label
          className="block mb-2 flex text-xl text-slate-600"
          htmlFor="status"
        >
          Status
        </label>
        <div className="flex">
          <Inplace
            closable
            closeIcon="pi pi-check"
            onClose={() => handleInplaceClose("status")}
            disabled={props.isReadOnly}
          >
            <InplaceDisplay>
              {props.status || "Click to edit"}
              <EditIcon isVisible={!props.isReadOnly} />
            </InplaceDisplay>
            <InplaceContent>
              <Dropdown
                id="status"
                name="status"
                value={localState.status}
                className={STYLE_CLASSES.FORM_BASIC_INPUT}
                options={[
                  "applied",
                  "interview",
                  "offer",
                  "rejected",
                  "accepted",
                  "passed",
                ]}
                onChange={handleLocalChange}
                placeholder="Select a Status"
                disabled={props.isDisabled}
              />
            </InplaceContent>
          </Inplace>
          <Undo
            onClick={() => resetField("status")}
            originalValue={initialValues?.status}
            newValue={props.status}
          />
        </div>
      </div>
    </div>
  );
};

export default ReadEditFormFields;
