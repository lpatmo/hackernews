import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './Search';

// const list = [
//   {
//     title: 'React',
//     url: 'https://reactjs.org/',
//     author: 'Jordan Walke',
//     num_comments: 3,
//     points: 4,
//     objectID: 0,
// }, {
//     title: 'Redux',
//     url: 'https://redux.js.org/',
//     author: 'Dan Abramov, Andrew Clark',
//     num_comments: 2,
//     points: 5,
//     objectID: 1,
// }, 
// ];

// function isSearched(searchTerm) {
//   return function (item) {
//     // some condition which returns true or false
//     return item.title.toLowerCase().includes(searchTerm.toLowerCase());
//   }
// } //removed on page 95

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

class App extends Component {
  constructor(props) {
    super(props)
    console.log(this.state)
    this.state = {
      result:null,
      searchTerm: DEFAULT_QUERY,
    }
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    //this.setSearchTopStories = this.setSearchTopStories.bind(this);
  }
  setSearchTopStories = (result) => {
    this.setState({ result });
    console.log('result', result)
    const { hits, page } = result;
    const oldHits = page !== 0
      ? this.state.result.hits
      : [];
    const updatedHits = [
      ...oldHits,
      ...hits
    ];
    this.setState({
      result: { hits: updatedHits, page }
    });
  }

  onSearchSubmit(event) {
    event.preventDefault();
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  fetchSearchTopStories(searchTerm, page=0) {
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;
    //https://hn.algolia.com/api/v1/search?query=redux&page=0
    fetch(url)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  onDismiss(id) {
    // const updatedList = this.state.list.filter(function isNotId(item) {
    //   return item.objectID !== id;
    // });
    function isNotId(item) {
      return item.objectID !== id;
    }
    //const updatedList = this.state.result.filter(isNotId);
    const updatedHits = this.state.result.hits.filter(isNotId);
    //CLUNKIER WAY USING OBJECT.ASSIGN: this.setState({ result: Object.assign({}, this.state.result, { hits: updatedHits }) });
    this.setState({
      result: {... this.state.result, hits: updatedHits} //spread operator
    })
  }
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  componentDidMount() {
    const {searchTerm} = this.state;
    // console.log((`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`))
    // fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
    //   .then(response => response.json())
    //   .then(result => this.setSearchTopStories(result))
    //   .catch(error => error)
    this.fetchSearchTopStories(searchTerm);
  }


  render() {
    const helloWorld = 'Welcome to the Road to learn React'
    const {searchTerm, result} = this.state;
    const page = (result && result.page) || 0;
    if (!result) { return null; }
    return (
      <div className="page">
      <div className="interactions">
        <Search 
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}>
          Search
        </Search>
        { result &&
          <Table
            list={result.hits}
            // pattern={searchTerm}
            onDismiss={this.onDismiss}/>
          }
        <div className="interactions">
         <Button onClick={() => this.fetchSearchTopStories(searchTerm, page - 1)}>
            Previous
          </Button>
          <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
            More
          </Button>
        </div>
        </div>
      </div>
    );
  }
}

const Table = ({ list, onDismiss }) =>
  <div className="table">
    {list.map(item =>
      <div key={item.objectID} className="table-row">
          <span>
            <a href={item.url}>{item.title}</a>
          </span>
          <span>{item.author}</span>
          <span>{item.num_comments}</span>
          <span>{item.points}</span>
          <span>
           <Button onClick={() => onDismiss(item.objectID)} className="button-inline">
                 Dismiss
           </Button>
          </span>
     </div>
    )}
</div>

// class Table extends Component {
//   render() {
//     const { list, pattern, onDismiss } = this.props;
//     return (
//       <div className="table">
//         {list.filter(isSearched(pattern)).map(item =>
//          <div key={item.objectID} className="table-row">
//          <span>
//            <a href={item.url}>{item.title}</a>
//          </span>
//          <span>{item.author}</span>
//          <span>{item.num_comments}</span>
//          <span>{item.points}</span>
//          <span>
//           <Button onClick={() => onDismiss(item.objectID)} className="button-inline">
//                 Dismiss
//           </Button>
//          </span>
//     </div> )}
//     </div> );
//   } 
// }

class Button extends Component { render() {
  const { onClick, className='', children,
  } = this.props;
  return ( <button
          onClick={onClick}
          className={className}
          type="button">
          {children}
          </button>
          );
  }
}
  

export default App;


