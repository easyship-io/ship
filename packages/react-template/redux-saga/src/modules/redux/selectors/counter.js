import { createSelector } from 'reselect';

const selectCounterNode = state => state.counter;
const createCounterNodeSelector = () => selectCounterNode;

const selectCurrent = counter => counter.current;
export const createCurrentSelector = () => createSelector(
    [ createCounterNodeSelector() ],
    selectCurrent
);

const selectOperations = counter => counter.operations;
export const createOperationsSelector = () => createSelector(
    [ createCounterNodeSelector() ],
    selectOperations
);
