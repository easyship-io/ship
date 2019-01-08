import './polyfills';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './modules/app';
import ThemeProvider from './modules/theme-provider';
import { currentLanguage } from './modules/current-language';
import { setLocale } from './modules/i18n';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import {
    getStore,
    loadStoreAsync
} from './modules/redux/store';
import './translations';
import './index.scss';

setLocale(currentLanguage);

const Root = () => (
    <Provider store={getStore()}>
        <React.Fragment>
            <CssBaseline />
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </React.Fragment>
    </Provider>
);

loadStoreAsync()
    .then(() => {
        ReactDOM.render(<Root />, document.getElementById('root'));
        registerServiceWorker();
    })
    .catch(() => console.log('Failed to load previous state'));
