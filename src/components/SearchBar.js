import React, { Component } from "react";

class SearchBar extends Component {
  state = {
    location: "",
  };

  //   handleSearch = (event) => {
  //     this.props.search(this.state.location);
  //     event.preventDefault();
  //   };

  handleSearch = (event) => {
    this.props.searchTicketMaster(this.state.location);
    this.props.search(this.state.location);
    event.preventDefault();
  };

  handleLocationChange = (event) => {
    this.setState({ location: event.target.value });
  };

  render() {
    return (
      <div>
        <div className="center">
          <input
            className="center"
            placeholder="Enter A Major City in USA"
            onChange={this.handleLocationChange}
          />
        </div>
        <div className="center">
          <button onClick={this.handleSearch}>Let's Go</button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
