import registerRootComponent from 'expo/build/launch/registerRootComponent';
import React from 'react';
import App from './src/App'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './src/store/reducers';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider as PaperProvider } from 'react-native-paper';

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

const reduxApp = () => (
    <Provider store={createStoreWithMiddleware}>
        <MenuProvider>
            <PaperProvider>
                <App/>
            </PaperProvider>
        </MenuProvider>
    </Provider>
)

registerRootComponent(reduxApp)
