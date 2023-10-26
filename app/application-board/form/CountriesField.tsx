"use client";

import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { COUNTRIES_LIST } from "@/app/constants";
import { getCurrencySymbol } from "@/app/utils";
import { STYLE_CLASSES } from "../../utils";
import { on } from "events";

const CountriesField = ({ selectedCountry, onChange }) => {
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [selectedCountryTemp, setSelectedCountryTemp] =
    useState(selectedCountry);

  const search = (event) => {
    let filtered;

    if (!event.query.trim().length) {
      filtered = [...COUNTRIES_LIST];
    } else {
      filtered = COUNTRIES_LIST.filter((country) => {
        return country.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }

    setFilteredCountries(filtered);
  };

  const handleAutoCompleteChange = (e) => {
    setSelectedCountryTemp(e.value);
  };

  const handleAutoCompleteBlur = () => {
    onChange({
      target: {
        name: "country",
        value: selectedCountryTemp,
      },
    });
    const currencySymbol = getCurrencySymbol(selectedCountryTemp);
    onChange({
      target: {
        name: "currency",
        value: currencySymbol,
      },
    });
  };

  return (
    <div className="p-field flex-1">
      <label className="block mt-8" htmlFor="country">
        Country
      </label>
      <AutoComplete
        value={selectedCountryTemp}
        className={STYLE_CLASSES.FORM_BASIC_INPUT}
        suggestions={filteredCountries}
        completeMethod={search}
        onChange={handleAutoCompleteChange}
        onBlur={handleAutoCompleteBlur}
        placeholder="United States"
      />
    </div>
  );
};

export default CountriesField;
