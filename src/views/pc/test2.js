/**
 * Created by luojianzong on 16/5/17.
 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../../store/configureStore';
import TestView from "../TestView";

const store = configureStore();
render(
    <Provider store={store}>
        <TestView />
    </Provider>,
    document.getElementById('root')
);
