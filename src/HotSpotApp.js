import React from 'react';
import 'filepond/dist/filepond.min.css';
import { Provider } from 'react-redux';

import { store } from './store/store';
import { AppRouter } from './routers/AppRouter';


export const HotSpotApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}
