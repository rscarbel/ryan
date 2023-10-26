"use client";

import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import countriesList from "./countriesList";
import countrySymbols from "./countrySymbols";
import currenciesList from "./currenciesList";
import { STYLE_CLASSES } from "../../utils";

const CountriesField = ({ selectedCountry, onChange }) => {
  const [filteredCountries, setFilteredCountries] = useState(null);

  const search = (event) => {
    let filtered;

    if (!event.query.trim().length) {
      filtered = [...countriesList];
    } else {
      filtered = countriesList.filter((country) => {
        return country.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }

    setFilteredCountries(filtered);
  };

  const handleAutoCompleteChange = (e) => {
    onChange({
      target: {
        name: "country",
        value: e.value,
      },
    });

    const countrySymbol = countrySymbols[e.value] || "US";
    const currencySymbol = currenciesList[countrySymbol] || "USD";
    onChange({
      target: {
        name: "currency",
        value: e.value,
      },
    });
  };

  return (
    <div className="p-field flex-1">
      <label className="block mt-8" htmlFor="country">
        Country
      </label>
      <AutoComplete
        value={selectedCountry}
        className={STYLE_CLASSES.FORM_BASIC_INPUT}
        suggestions={filteredCountries}
        completeMethod={search}
        onChange={handleAutoCompleteChange}
        placeholder="United States"
      />
    </div>
  );
};

export default CountriesField;
