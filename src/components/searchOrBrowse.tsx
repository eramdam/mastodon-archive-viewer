import { useId, useState } from "react";
import { AllStatuses } from "./allStatuses";
import { Search } from "./search";

export const SearchOrBrowse = () => {
  const [mode, setMode] = useState<"search" | "browse">("search");
  const inputId = useId();

  return (
    <>
      <div className="statuses-controls">
        <label htmlFor={inputId + "-search"}>
          <input
            type="radio"
            autoComplete="off"
            id={inputId + "-search"}
            name="mode"
            checked={mode === "search"}
            value="search"
            onChange={() => {
              setMode("search");
            }}
          />{" "}
          Search
        </label>
        <label htmlFor={inputId + "-browse"}>
          <input
            type="radio"
            autoComplete="off"
            id={inputId + "-browse"}
            name="mode"
            value="browse"
            checked={mode === "browse"}
            onChange={() => {
              setMode("browse");
            }}
          />{" "}
          Browse
        </label>
      </div>
      {mode === "search" ? <Search /> : <AllStatuses />}
    </>
  );
};
