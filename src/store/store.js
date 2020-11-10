import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import { questionsReducer } from '../reducers/questionsReducer';
import { modalReducer } from '../reducers/modalReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,//tendremos el reducer auth que viene de authReducer, esto es de ES6
    ui: uiReducer,
    questions: questionsReducer,
    modal: modalReducer,
});

//createStore recibe solo 1 reducer, por eso la const "reducers"
export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

