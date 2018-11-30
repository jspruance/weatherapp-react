import React from "react";

function SearchError(props) {
  if (props.validationerrors) {
    return (
      <div className="container mt-2 invalid">
        <div className="row justify-content-center">Enter a valid location</div>
      </div>
    );
  } else if (props.apierrors) {
    return (
      <div className="container mt-2 invalid">
        <div className="row justify-content-center">{props.apierrors}</div>
      </div>
    );
  } else {
    return <div />;
  }
}

export default SearchError;
