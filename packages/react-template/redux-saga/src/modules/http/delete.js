import {
    executeRequestAsync,
    REQUEST_METHOD
} from './execute-request';

const deleteAsync = (url, {
    authenticate,
    headers
} = {}) => {
    return executeRequestAsync(
        url,
        REQUEST_METHOD.DELETE,
        {
            authenticate,
            headers
        }
    )
};

export {
    deleteAsync
};
