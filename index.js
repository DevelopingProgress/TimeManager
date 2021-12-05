import registerRootComponent from 'expo/build/launch/registerRootComponent';
import React from 'react';
import App from './src/App'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './src/store/reducers';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider as PaperProvider } from 'react-native-paper';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = createStore(
    reducers,
    composeEnhancers(applyMiddleware(promiseMiddleware)),
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
