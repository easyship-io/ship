export const SHOW_APP_LOADER = Symbol('Show loader');

export const showLoader = () => ({
    type: SHOW_APP_LOADER
});

export const HIDE_APP_LOADER = Symbol('Hide loader');

export const hideLoader = () => ({
    type: HIDE_APP_LOADER
});
