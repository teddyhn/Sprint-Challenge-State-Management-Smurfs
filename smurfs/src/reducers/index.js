import {
    FETCHING_SMURF_START,
    FETCHING_SMURF_SUCCESS,
    POST_SMURF
} from "../actions";
  
const initialState = {
    smurfs: [],
    isFetching: false,
    error: ""
};
  
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_SMURF_START:
            return {
            ...state,
            isFetching: true,
            error: ""
            };
        case FETCHING_SMURF_SUCCESS:
            return {
            ...state,
            isFetching: false,
            smurfs: action.payload
            };
        case POST_SMURF:
            return {
                ...state,
                smurfs: [
                    ...state.smurfs,
                    action.payload
                ]
            };
        default:
            return state;
    }
};
  