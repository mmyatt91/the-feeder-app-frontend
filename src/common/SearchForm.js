import React, { useState } from "react";
import "./SearchForm.css";

/** Search Form
 * 
 * Function: Appears on RecipeSearch for Filtering by Keyword;
 * renders the search form and calls the `searchFor` function prop
 * that runs in a parent component to do searching.    
 */

function SearchForm({ searchFor }) {
  console.debug("SearchForm", "searchFor=", typeof searchFor)
   
  const [searchTerms, setSearchTerms] = useState("");

  // Tells parent to Filter
  function handleSubmit(evt) {
    // Handles queries with just spaces
    evt.preventDefault();
    searchFor(searchTerms.trim() || undefined);
    setSearchTerms(searchTerms.trim());
  }

  // Updates Form Fields
  function handleChange(evt) {
    setSearchTerms(evt.target.value);
  }

  return (
    <div className="SearchForm mb-4">
      <form className="form-inline" onSubmit={handleSubmit}>
        <input
          className="form-control form-control-md flex-grow-1"
          name="searchTerms"
          placeholder="Example: 'Vegetarian Soup', 'Low-Calorie Lunch', 'Keto-Friendly', etc."
          value={searchTerms}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-md btn-dark">
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchForm;

