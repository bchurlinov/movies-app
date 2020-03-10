import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

import App from './App';
import Register from "./components/authentication/Register/Register";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
));


const Root = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact component={Register} path="/register" />
                <Route exact component={App} path="/" />
            </Switch>
        </BrowserRouter>
    )
}

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
