import {
	SHOW_APP_LOADER,
    HIDE_APP_LOADER
} from './../actions/app-loader';

const defaultState = {
    visible: false
};

export const appLoader = (state = defaultState, action) => {
	switch (action.type) {
		case SHOW_APP_LOADER:
		    return {
                visible: true
            };
		case HIDE_APP_LOADER:
            return {
                visible: false
            };
        default:
            return state;
	}
};
