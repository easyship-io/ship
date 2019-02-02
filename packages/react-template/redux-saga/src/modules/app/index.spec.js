import React from 'react';
import configureMockStore from 'redux-mock-store'
import ReactDOM from 'react-dom';
import Provider from 'react-redux/es/components/Provider';
import { mount } from '@easyship/react-enzyme';
import { defaultMockStore } from '../redux/store.mock';
import StartPage from '@modules/start-page';
import App from './';
import { flow } from 'lodash';

describe('App component', () => {
    const middlewares = [];
    const mockStore = configureMockStore(middlewares);
    const AppComponent = (
        {
            store,
            ...props
        }) => (
        <Provider store={store}>
            <App {...props} />
        </Provider>
    );

    it('renders without crashing', () => {
        const div = document.createElement('div');
        const store = mockStore(defaultMockStore);
        const Component = <AppComponent store={store} />;
        ReactDOM.render(Component, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders start page', () => {
        const store = mockStore(defaultMockStore);
        const Component = mount(<AppComponent store={store} />);
        expect(Component.find(StartPage)).toExist();
    });
});
