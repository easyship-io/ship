export const SNACKBAR_TYPES = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info'
};

export const SHOW_APP_SNACKBAR = Symbol('Show app snackbar');

export const showSnackbar = (
    message,
    type = SNACKBAR_TYPES.info,
    options = {}
) => ({
    type: SHOW_APP_SNACKBAR,
    data: {
        message,
        type,
        autoHideDuration: options.autoHideDuration || 4000
    }
});

export const HIDE_APP_SNACKBAR = Symbol('Hide app snackbar');

export const hideSnackbar = () => ({
    type: HIDE_APP_SNACKBAR
});
