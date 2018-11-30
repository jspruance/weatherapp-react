import React, { Component } from "react";
import Header from "./components/Header";
import WeatherContainer from "./components/WeatherContainer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header title="Weather App" />
        <WeatherContainer />
      </div>
    );
  }
}

export default App;
