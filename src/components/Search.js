import React, { Component } from "react";
import SearchError from "./SearchError";

class Search extends Component {
  state = {
    searchquery: "",
    validationerrors: false
  };

  validateForm = event => {
    if (!event.target[0].value) {
      event.target[0].classList.add("invalid");
      this.setState({ validationerrors: true });
    } else {
      event.target[0].classList.remove("invalid");
      this.setState({ validationerrors: false });
    }
  };

  handleClick = event => {
    event.preventDefault();
    this.validateForm(event);
    this.props.getWeather(this.state.searchquery);
  };

  onSearchChange = event => this.setState({ searchquery: event.target.value });

  render() {
    return (
      <React.Fragment>
        <form className="form-inline" onSubmit={this.handleClick}>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter search location (city or zip)"
            value={this.state.searchquery}
            onChange={this.onSearchChange}
          />
          <button type="submit" className="btn btn-primary btn-lg ml-3">
            Get weather
          </button>
        </form>
        <SearchError
          validationerrors={this.state.validationerrors}
          apierrors={this.props.apierrors}
        />
      </React.Fragment>
    );
  }
}

export default Search;
