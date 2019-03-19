import { defaultsDeep } from 'lodash';

export const defaultMockStore = () => ({
    counter: {
        current: 0
    },
    appLoader: {

    }
});

export const withCurrentCounter = current => mockStore => defaultsDeep(
    {},
    mockStore,
    {
        counter: {
            current
        }
    }
);
