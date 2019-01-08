import {
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux';
import filter from 'redux-storage-decorator-filter';
import { reducers } from './reducers';
import { createLogger } from 'redux-logger';
import createLocalSorageEngine from 'redux-storage-engine-localstorage';
import createSagaMiddleware from 'redux-saga';
import * as storage from 'redux-storage';
import saga from './sagas';

const storageKey = 'fork-stream-app-state';

const sagaMiddleware = createSagaMiddleware();

const engine = filter(
    createLocalSorageEngine(storageKey),
    null,
    [
        ['appSnackbar'],
        ['appLoader']
    ]
);
const reducer = storage.reducer(combineReducers(reducers));
const createStoreWithMiddleware = applyMiddleware(
    createLogger(),
    sagaMiddleware,
    storage.createMiddleware(engine),
)(createStore);

const store = createStoreWithMiddleware(reducer);

sagaMiddleware.run(saga);

const getStore = () => store;

const loadStoreAsync = () => storage.createLoader(engine)(store);

const dispatch = (...rest) => store.dispatch(...rest);

export {
    getStore,
    loadStoreAsync,
    dispatch
};
