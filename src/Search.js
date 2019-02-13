import React from "react";
// function Search({ value, onChange, children }) {
//     return (
//   //     <form>
//   //       {children} <input
//   //         type="text"
//   //         value={value}
//   //         onChange={onChange}
//   // /> </form>
//   );
// }

const Search = ({
  value,
  onChange,
  onSubmit,
  children
}) =>
  <form onSubmit={onSubmit}>
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
    <button type="submit">
      {children}
    </button>
</form>


export default Search;

