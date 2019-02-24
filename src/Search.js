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

class Search extends React.Component {
  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }
  render() {
    const {
      value,
      onChange,
      onSubmit,
      children
    } = this.props; 
    return (
        <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          ref={el => this.input = el}
        />
        <button type="submit">
          {children}
        </button>
        </form>
    )
}
}


export default Search;

