import axios from "axios";

export const FETCHING_SMURF_START = "FETCHING_SMURF_START";
export const FETCHING_SMURF_SUCCESS = "FETCHING_SMURF_SUCCESS";
export const FETCHING_SMURF_FAILURE = "FETCHING_SMURF_FAILURE";
export const POST_SMURF = "POST_SMURF";

export const getSmurfs = () => dispatch => {
    dispatch({ type: FETCHING_SMURF_START });
    axios
        .get("http://localhost:3333/smurfs")
        .then(res => {
        dispatch({ type: FETCHING_SMURF_SUCCESS, payload: res.data });
        })
        .catch(err => {
        dispatch({ type: FETCHING_SMURF_FAILURE, payload: err.data });
        });
};

export const postSmurfs = (newSmurf) => dispatch => {
    axios
        .post("http://localhost:3333/smurfs", dispatch({ type: POST_SMURF, payload: newSmurf }));
}