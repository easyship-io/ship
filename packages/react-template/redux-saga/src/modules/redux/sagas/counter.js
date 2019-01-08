import { delay } from 'redux-saga';
import {
    takeLatest,
    put,
    call,
    select
} from 'redux-saga/effects';
import {
    hideLoader,
    showLoader
} from '../actions/app-loader';
import {
    showSnackbar,
    SNACKBAR_TYPES
} from '../actions/app-snackbar';
import {
    INCREMENT,
    DECREMENT,
    incrementSuccess,
    decrementSuccess,
    addOperation
} from '../actions/counter';
import { translate } from '../../i18n';
import { createCurrentSelector } from '../selectors/counter';

const translationContext = 'redux.saga.counter';

function* increment() {
    yield put(showLoader());

    const current = yield select(createCurrentSelector());

    yield call(delay, 2000);

    yield put(showSnackbar(
        translate(translationContext, 'incrementSuccess'),
        SNACKBAR_TYPES.success
    ));
    yield put(hideLoader());
    yield put(incrementSuccess(current + 1));
    yield put(addOperation({
        value: current + 1,
        action: 'INCREMENT'
    }));
}

function* onIncrement() {
    yield takeLatest(INCREMENT, increment);
}

function* decrement() {
    yield put(showLoader());

    const current = yield select(createCurrentSelector());

    yield call(delay, 2000);

    yield put(showSnackbar(
        translate(translationContext, 'decrementSuccess'),
        SNACKBAR_TYPES.success
    ));
    yield put(hideLoader());
    yield put(incrementSuccess(current - 1));
    yield put(addOperation({
        value: current - 1,
        action: 'INCREMENT'
    }));
}

function* onDecrement() {
    yield takeLatest(DECREMENT, decrement);
}

export const counter = [
    onIncrement(),
    onDecrement()
];
