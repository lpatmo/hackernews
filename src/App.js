import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './Search';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
}, {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
}, 
];

function isSearched(searchTerm) {
  return function (item) {
    // some condition which returns true or false
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list, 
      searchTerm: '',
    }
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }


  onDismiss(id) {
    // const updatedList = this.state.list.filter(function isNotId(item) {
    //   return item.objectID !== id;
    // });
    function isNotId(item) {
      return item.objectID !== id;
    }
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  render() {
    const helloWorld = 'Welcome to the Road to learn React'
    const {searchTerm, list} = this.state;
    return (
      <div className="App">
        <Search value={searchTerm} onChange={this.onSearchChange}/>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss}/>
      </div>
    );
  }
}

class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props;
    return (
      <div>
        {list.filter(isSearched(pattern)).map(item =>
         <div key={item.objectID}>
         <span>
           <a href={item.url}>{item.title}</a>
         </span>
         <span>{item.author}</span>
         <span>{item.num_comments}</span>
         <span>{item.points}</span>
         <span>
           <button
             onClick={() => onDismiss(item.objectID)}
             type="button"
> Dismiss
           </button>
         </span>
    </div> )}
    </div> );
  } 
}


export default App;
