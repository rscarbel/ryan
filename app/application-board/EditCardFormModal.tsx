"use client";

import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { STYLE_CLASSES } from "../utils";

const EditCardFormModal = ({ visible, onHide, cardData, onSubmit }) => {
  const [formData, setFormData] = useState(cardData || {});
  const hasDataChanged = JSON.stringify(cardData) !== JSON.stringify(formData);

  useEffect(() => {
    setFormData(cardData || {});
  }, [cardData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleHide = () => {
    setFormData({});
    onHide();
  };

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
          <label className="block mt-6" htmlFor="jobTitle">
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
          <label className="block mt-6" htmlFor="jobDescription">
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
          <label className="block mt-6" htmlFor="salary">
            Salary
          </label>
          <InputText
            className={STYLE_CLASSES.FORM_BASIC_INPUT}
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
          />
        </div>

        <div className="p-field">
          <label className="block mt-6" htmlFor="applicationLink">
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
          <label className="block mt-6" htmlFor="applicationDate">
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
          <label className="block mt-6" htmlFor="notes">
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
          <label className="block mt-6" htmlFor="status">
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
        disabled={!hasDataChanged}
      >
        Submit
      </button>
    </Dialog>
  );
};

export default EditCardFormModal;
