import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSmurfs, postSmurfs } from "../actions";
import "./App.css";

const App = ({ getSmurfs, postSmurfs, smurfs, isFetching }) => {
  const [newSmurf, setNewSmurf] = useState({})

  const handleChanges = e => {
    setNewSmurf(e.target.value);
  };

  useEffect(() => {
    getSmurfs();
  }, [getSmurfs]);

  if (isFetching) {
    return <h3>Retrieving smurfs...</h3>;
  }

  return (
    <div className="App">
      <div className="smurf-form">
          <input
              className="smurf-input-name"
              type="text"
              name="newSmurfName"
              value={newSmurf}
              onChange={handleChanges}
          />
          <button
              onClick={postSmurfs}
          >
              Add new smurf
          </button>
      </div>
      {smurfs.map(smurf => (
        <div className="smurf">
          <p>Name: {smurf.name}</p>
          <p>Age: {smurf.age}</p>
          <p>Height: {smurf.height}</p>
        </div>
    ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    smurfs: state.smurfs,
    isFetching: state.isFetching,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { getSmurfs, postSmurfs }
)(App);
