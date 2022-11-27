import { ADD_COMMUNITY, DELETE_COMMUNITY, GET_COMMUNITIES, UPDATE_COMMUNITY } from "./CommunityTypes";

const initialState = {
    communities: []
}

export const communitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMUNITIES:
            return {
                ...state,
                communities: action.payload
            }
        case ADD_COMMUNITY:
            return {
                ...state,
                communities: [...state.communities, action.payload]
            }
        case DELETE_COMMUNITY:
            return {
                ...state,
                communities: state.communities.filter((item, index) => item.id !== action.payload)
            }
        case UPDATE_COMMUNITY:
            const updatedCommunities = state.communities.map(item => {
                if (item.id === action.payload.id) {
                    return { ...item, ...action.payload };
                }
                return item;
            });
            return {
                ...state,
                communities: updatedCommunities
            }

        default:
            return state;
    }
}