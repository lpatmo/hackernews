import React from "react";
function Search(props) {
    const { value, onChange, children } = props;
    return (
      <form>
        {children} <input
          type="text"
          value={value}
          onChange={onChange}
  /> </form>
  ); }

export default Search;

