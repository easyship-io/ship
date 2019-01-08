import {
    isString,
    forEach,
    forIn
} from 'lodash';

export const appendQuery = (urlString, query) => {
    const url = new URL(urlString || '');
    const params = new URLSearchParams(url.search ? url.search.slice(1) : '');

    if (isString(query)) {
        const parts = query.split('&');
        query = {};
        forEach(parts, part => {
            const pair = part.split('=');
            query[pair[0]] = pair[1];
        });
    }

    forIn(query, (value, key) => params.set(key, value));

    url.search = params.toString();

    return url.toString();
};
