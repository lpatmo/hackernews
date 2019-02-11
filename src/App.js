import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './Search';


const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

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

function isSearched(searchTerm) {
  return function (item) {
    // some condition which returns true or false
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}


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
    //this.setSearchTopStories = this.setSearchTopStories.bind(this);
  }
  setSearchTopStories = (result) => {
    this.setState({ result });
  }

  onDismiss(id) {
    // const updatedList = this.state.list.filter(function isNotId(item) {
    //   return item.objectID !== id;
    // });
    function isNotId(item) {
      return item.objectID !== id;
    }
    const updatedList = this.state.result.filter(isNotId);
    this.setState({ result: updatedList });
  }
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  componentDidMount() {
    const {searchTerm} = this.state;
    console.log((`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`))
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error)
  }


  render() {
    const helloWorld = 'Welcome to the Road to learn React'
    const {searchTerm, result} = this.state;
    if (!result) { return null; }
    return (
      <div className="page">
      <div className="page">
        <Search value={searchTerm} onChange={this.onSearchChange}>Search</Search>
        <Table list={result.hits} pattern={searchTerm} onDismiss={this.onDismiss}/>
        </div>
      </div>
    );
  }
}

class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props;
    return (
      <div className="table">
        {list.filter(isSearched(pattern)).map(item =>
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
    </div> )}
    </div> );
  } 
}

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
