import './polyfills';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '@modules/app';
import ThemeProvider from '@modules/theme-provider';
import { currentLanguage } from '@modules/current-language';
import { setLocale } from '@modules/i18n';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import getStoreAsync from '@redux/store';
import './translations';
import './index.scss';

setLocale(currentLanguage);

const Root = ({ store }) => (
    <Provider store={store}>
        <React.Fragment>
            <CssBaseline />
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </React.Fragment>
    </Provider>
);

getStoreAsync()
    .then(store => {
        ReactDOM.render(<Root store={store} />, document.getElementById('root'));
        registerServiceWorker();
    })
    .catch(() => console.log('Failed to load previous state'));
