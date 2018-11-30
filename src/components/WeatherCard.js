import React, { Component } from "react";

class WeatherCard extends Component {
  convertTemp(temp, scale, nosign) {
    if (scale === "C") {
      let S = nosign ? "" : "C";
      return Math.ceil(temp - 273.15) + String.fromCharCode(176) + S;
    } else {
      let S = nosign ? "" : "F";
      return (
        Math.ceil(9 / 5 * (temp - 273) + 32) + String.fromCharCode(176) + S
      );
    }
  }

  render() {
    if (this.props.currentconditions.main) {
      const cc = this.props.currentconditions;
      return (
        <div className="card">
          <div className="card-body">
            <div className="container">
              <div className="row">
                <div className="col-9">
                  <h4>
                    <span className="highlight">{cc.name}</span>
                  </h4>
                  <ul>
                    <li>
                      <span className="highlight">
                        {cc.weather[0].description}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="col-3">
                  {this.props.isSaved ? (
                    <button
                      type="button"
                      className="close float-right"
                      aria-label="Close"
                      onClick={event =>
                        this.props.handleRemoveLocation(cc.name, event)}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-success btn-sm float-right"
                      onClick={() => this.props.handleSaveLocation(cc.name)}
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div
                    className={`weather-icon ${cc.weather[0].description.replace(
                      " ",
                      ""
                    )}`}
                  />
                </div>
                <div className="col-6">
                  <h1>
                    <span className="highlight">
                      {this.convertTemp(cc.main.temp)}
                    </span>
                  </h1>
                  <p>
                    hi:
                    <span className="highlight">
                      {` ${this.convertTemp(cc.main.temp_max)}`}
                    </span>
                    <span> </span>
                    lo:
                    <span className="highlight-secondary">
                      {` ${this.convertTemp(cc.main.temp_min)}`}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default WeatherCard;
