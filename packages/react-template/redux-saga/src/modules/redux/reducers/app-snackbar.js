import {
	SHOW_APP_SNACKBAR,
    HIDE_APP_SNACKBAR
} from './../actions/app-snackbar';

const defaultState = {
    visible: false
};

export const appSnackbar = (state = defaultState, action) => {
	switch (action.type) {
		case SHOW_APP_SNACKBAR:
		    return Object.assign({}, state, defaultState, {
                visible: true,
                message: action.data.message,
                type: action.data.type,
                autoHideDuration: action.data.autoHideDuration
            });
		case HIDE_APP_SNACKBAR:
            return Object.assign({}, state, defaultState, {
                visible: false
            });
        default:
            return state;
	}
};
