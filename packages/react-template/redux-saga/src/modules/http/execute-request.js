import superagent from 'superagent';

const REQUEST_METHOD = {
    GET: Symbol('API GET'),
    POST: Symbol('API POST'),
    DELETE: Symbol('API DELETE')
};

const executeRequestAsync = (
    url,
    requestMethod,
    {
        requestData,
        authenticate,
        headers: {
            accept
        } = {}
    } = {}) => {
    let httpRequest = requestMethod === REQUEST_METHOD.POST ?
        superagent.post(url) :
        requestMethod === REQUEST_METHOD.DELETE ?
            superagent.del(url) :
            superagent.get(url);
    authenticate && (httpRequest = httpRequest.withCredentials());
    requestData && (httpRequest = httpRequest.send(requestData));

    return new Promise((resolve, reject) => {
        httpRequest.accept(accept || 'application/json')
            .end((error, response) => {
                if (!error && response && !response.error) {
                    resolve(response);
                    return;
                }

                reject(response);
            });
    });
};

export {
    REQUEST_METHOD,
    executeRequestAsync
};
