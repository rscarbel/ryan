"use client";

import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { COUNTRIES_LIST } from "@/app/constants";
import { STYLE_CLASSES } from "../../utils";

const CountriesField = ({ selectedCountry, onChange }) => {
  const [filteredCountries, setFilteredCountries] = useState(null);

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

  return (
    <div className="p-field flex-1">
      <label className="block mt-8" htmlFor="country">
        Country
      </label>
      <AutoComplete
        value={selectedCountry}
        className="mt-1 w-full rounded  focus:border-blue-500 focus:ring focus:ring-blue-200"
        suggestions={filteredCountries}
        completeMethod={search}
        onChange={(e) => onChange(e.value)}
        placeholder="United States"
      />
    </div>
  );
};

export default CountriesField;
