import { useState } from "react";
import { AllStatuses } from "./allStatuses";
import { Search } from "./search";

export const SearchOrBrowse = () => {
  const [mode, setMode] = useState<"search" | "browse">("search");

  return (
    <>
      <div className="statuses-controls">
        <label htmlFor="search">
          <input
            type="radio"
            id="search"
            name="mode"
            checked={mode === "search"}
            onChange={() => {
              setMode("search");
            }}
          />{" "}
          Search
        </label>
        <label htmlFor="browse">
          <input
            type="radio"
            id="browse"
            name="mode"
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
