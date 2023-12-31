import React, { Component } from "react";
import CardList from "./Components/CardList";
// import { robots } from "./robots";
import SearchBox from "./Components/Searchbox";
import "./App.css";
import ErrorBoundry from "./Components/ErrorBoundry";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ robots: users }));
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };
  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });
    if (this.state.robots.length === 0) {
      return <h1 className="tc mt7">Loding...</h1>;
    } else {
      return (
        <div className="tc">
          <h1 className="f1">RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <ErrorBoundry>
            <CardList robots={filteredRobots} />
          </ErrorBoundry>
        </div>
      );
    }
  }
}

export default App;
