import { combineReducers } from 'redux';
import {
    INCREMENT_SUCCESS,
    DECREMENT_SUCCESS,
    ADD_OPERATION
} from './../actions/counter';

const current = (state = 0, action) => {
    switch (action.type) {
        case INCREMENT_SUCCESS:
        case DECREMENT_SUCCESS:
            return action.data;
        default:
            return state;
    }
};

const operations = (state = [], action) => {
    switch (action.type) {
        case ADD_OPERATION:
            return [
                ...state,
                action.data
            ];
        default:
            return state;
    }
};

export const counter = combineReducers({
    current,
    operations
});


