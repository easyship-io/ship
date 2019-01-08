export const INCREMENT = Symbol('Increment');

export const increment = () => ({
    type: INCREMENT
});

export const INCREMENT_SUCCESS = Symbol('Increment success');

export const incrementSuccess = data => ({
    type: INCREMENT_SUCCESS,
    data
});

export const DECREMENT = Symbol('Decrement');

export const decrement = () => ({
    type: DECREMENT
});

export const DECREMENT_SUCCESS = Symbol('Decrement success');

export const decrementSuccess = data => ({
    type: DECREMENT_SUCCESS,
    data
});

export const ADD_OPERATION = Symbol('Add operation');

export const addOperation = data => ({
    type: ADD_OPERATION,
    data
});
