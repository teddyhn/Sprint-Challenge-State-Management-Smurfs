import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSmurfs, postSmurfs } from "../actions";
import axios from "axios";
import "./App.css";

const App = ({ getSmurfs, smurfs, isFetching }) => {
  const [newSmurf, setNewSmurf] = useState({})

  const handleChanges = evt => {
    setNewSmurf({ ...newSmurf, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = evt => {
    evt.target.reset();
    const newSmurfToAdd = {
        ...newSmurf,
        age: parseInt(newSmurf.age),
        id: smurfs[smurfs.length - 1].id + 1
    };
    axios
      .post("http://localhost:3333/smurfs", newSmurfToAdd)
  };

  const deleteSmurf = id => {
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
  }

  useEffect(() => {
    getSmurfs();
  }, [getSmurfs]);

  if (isFetching) {
    return <h3>Retrieving smurfs...</h3>;
  }

  console.log(smurfs);

  return (
    <div className="App">
      <form onSubmit={evt => handleSubmit(evt)}>
        <label>
            Name:
            <input
                type="text"
                name="name"
                value={newSmurf.name}
                onChange={evt => handleChanges(evt)}
            />
        </label>
        <label>
            Age:
            <input
                type="text"
                name="age"
                value={newSmurf.age}
                onChange={evt => handleChanges(evt)}
            />
        </label>
        <label>
            Height:
            <input
                type="text"
                name="height"
                value={newSmurf.height}
                onChange={evt => handleChanges(evt)}
            />
        </label>
        <button>Submit</button>
      </form>
      {smurfs.map(smurf => (
        <div className="smurf">
          <p>Name: {smurf.name}</p>
          <p>Age: {smurf.age}</p>
          <p>Height: {smurf.height}</p>
          <button
            onClick={() => {
              deleteSmurf(smurf.id);
              window.location.reload();
            }}
          >
            Delete
          </button>
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
