import { ADD_TREE, GET_TREE } from "./treestTypes";

const initialState = {
    trees: []
}

export const treesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TREE:
            return {
                ...state,
                trees: action.payload
            };
        
        case ADD_TREE:
            return {
                ...state,
                trees: state.trees.filter((item, index) => item.id !== action.payload)
            };
            
        default:
            return state;
    }
}