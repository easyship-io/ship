import { all } from 'redux-saga/effects';
import { counter } from './counter';

const sagas = [
    ...counter
];

export default function* saga() {
    yield all(sagas);
}
