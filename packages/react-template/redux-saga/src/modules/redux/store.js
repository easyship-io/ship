import {
    setStorageKey,
    addStorageBlacklistedKeys,
    registerReducers,
    registerSagas,
    getStoreAsync
} from '@markomatic/redux-store';
import { reducers } from './reducers';
import { sagas } from './sagas';

export default async () => {
    setStorageKey('react-app-template');
    addStorageBlacklistedKeys(
        ['appLoader']
    );
    registerReducers(reducers);
    registerSagas(...sagas);

    return getStoreAsync();
};
