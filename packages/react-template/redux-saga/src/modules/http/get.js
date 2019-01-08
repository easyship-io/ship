import {
    executeRequestAsync,
    REQUEST_METHOD
} from './execute-request';

const getAsync = (url, {
    authenticate,
    headers
} = {}) => {
    return executeRequestAsync(
        url,
        REQUEST_METHOD.GET,
        {
            authenticate,
            headers
        }
    )
};

export {
    getAsync
};
