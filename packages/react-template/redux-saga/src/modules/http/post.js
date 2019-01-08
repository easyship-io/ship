import {
    executeRequestAsync,
    REQUEST_METHOD
} from './execute-request';

const postAsync = (
    url,
    requestData,
    {
        authenticate,
        headers
    } = {}) => {
    return executeRequestAsync(
        url,
        REQUEST_METHOD.POST,
        {
            requestData,
            authenticate,
            headers
        }
    )
};

export {
    postAsync
};
