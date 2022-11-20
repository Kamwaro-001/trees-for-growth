import { GET_COMMUNITIES, ADD_COMMUNITY } from "./data.types";

const initialState = {
    communities: []
}

export const commReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMUNITIES:
            return {
                ...state,
                communities: action.payload
            };
        case ADD_COMMUNITY:
            return {
                ...state,
                communities: [...state.communities, action.payload]
            }
        default:
            return state;
    }
}
