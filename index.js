import React from 'react';
import App from './src/App'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './src/store/reducers';
import { MenuProvider } from 'react-native-popup-menu';
import {registerRootComponent} from "expo";
import { LogBox } from 'react-native';
import {requestUserPermission} from "./src/reusable/notifications";

LogBox.ignoreLogs(['Setting a timer']);

const middlewares = [
    /* other middlewares */
    promiseMiddleware
];

if (__DEV__) {
    const createDebugger = require('redux-flipper').default;
    middlewares.push(createDebugger());
}

const createStoreWithMiddleware = createStore(
    reducers,
    applyMiddleware(...middlewares)
)

requestUserPermission()

const reduxApp = () => (
    <Provider store={createStoreWithMiddleware}>
        <MenuProvider>
            <App/>
        </MenuProvider>
    </Provider>
)

registerRootComponent(reduxApp)
