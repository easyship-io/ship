export const getSearchParam = (urlString, paramName) => {
    const url = new URL(urlString || '');
    const params = new URLSearchParams(url.search ? url.search.slice(1) : '');
    const param = params && params.get(paramName);
    const paramValue = param && (param.split('/')[0]);
    return paramValue || null;
};
