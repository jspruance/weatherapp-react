import React, { Component } from "react";
import Search from "../components/Search";
import WeatherCard from "../components/WeatherCard";

class WeatherContainer extends Component {
  constructor() {
    super();
    this.state = {
      searchedcurrentconditions: {},
      savedcurrentconditions: [],
      savedlocations: [],
      apierrors: false
    };
  }

  handleGetWeather = (searchQuery, fromSaved) => {
    if (!searchQuery) {
      this.setState({ currentconditions: {} });
      return false;
    }

    const baseUrl = "http://api.openweathermap.org/data/2.5/weather";
    const apiKey = "bc1f6705bf699279a1cd4690fe7689f5";
    const queryPrefix = /\d/.test(searchQuery) ? "?zip=" : "?q=";
    const requestUrl = `${baseUrl}${queryPrefix}${searchQuery}&appid=${apiKey}`;
    fetch(requestUrl)
      .then(response => {
        if (response.status !== 200) {
          this.setState({
            apierrors: `Location not found. Status Code: ${response.status}`
          });
          return;
        } else {
          this.setState({ apierrors: false });
        }
        response.json().then(data => {
          if (fromSaved) {
            this.setState(prevState => ({
              savedcurrentconditions: [
                ...prevState.savedcurrentconditions,
                data
              ]
            }));
          } else {
            this.setState({ searchedcurrentconditions: data });
          }
        });
      })
      .catch(err => {
        console.log("Fetch Error :-S", err);
      });
  };

  handleSaveLocation = location => {
    // persist saved location for user
    let savedLocations = JSON.parse(sessionStorage.getItem("savedLocations"));
    if (savedLocations) {
      savedLocations.push(location);
      sessionStorage.setItem("savedLocations", JSON.stringify(savedLocations));
    } else {
      savedLocations = [location];
      sessionStorage.setItem("savedLocations", JSON.stringify(savedLocations));
    }
    // update state with new location for saved searches and clear current search
    this.setState({
      savedlocations: [...this.state.savedlocations, location],
      savedcurrentconditions: [
        ...this.state.savedcurrentconditions,
        this.state.searchedcurrentconditions
      ],
      searchedcurrentconditions: {}
    });
  };

  handleRemoveLocation = (location, event) => {
    event.preventDefault();
    // remove from session storage (db)
    const savedLocations = JSON.parse(sessionStorage.getItem("savedLocations"));
    const filteredSavedLocations = savedLocations.filter(
      savedLocation => savedLocation !== location
    );
    sessionStorage.setItem(
      "savedLocations",
      JSON.stringify(filteredSavedLocations)
    );
    // remove location from saved locations and saved current conditions
    this.setState(prevState => ({
      savedlocations: prevState.savedlocations.filter(
        savedlocation => savedlocation !== location
      ),
      savedcurrentconditions: prevState.savedcurrentconditions.filter(
        condition => condition.name !== location
      )
    }));
  };

  componentWillMount() {
    // after login user locations will be loaded from database and set in state
    const savedLocations = JSON.parse(sessionStorage.getItem("savedLocations"));
    if (savedLocations) {
      this.setState({ savedlocations: savedLocations });
    }
  }

  componentDidMount() {
    // get weather for all saved locations in state
    this.state.savedlocations.map(location =>
      this.handleGetWeather(location, true)
    );
  }

  render() {
    return (
      <div>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <Search
              getWeather={this.handleGetWeather}
              apierrors={this.state.apierrors}
            />
          </div>
        </div>
        <div className="container mt-5">
          <WeatherCard
            key="0"
            currentconditions={this.state.searchedcurrentconditions}
            handleSaveLocation={this.handleSaveLocation}
          />
          {this.state.savedcurrentconditions.map((condition, index) => {
            return (
              <WeatherCard
                key={index + 1}
                currentconditions={condition}
                isSaved={true}
                handleRemoveLocation={this.handleRemoveLocation}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default WeatherContainer;
