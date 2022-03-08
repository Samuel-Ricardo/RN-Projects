/**
 * Created by charnjeetelectrovese@gmail.com on 3/16/2018.
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'remote-redux-devtools';
import reducers from './reducers/index.reducer';



const middlewares = [thunk];
if (__DEV__) {
    middlewares.push(logger);
//composeWithDevTools
}

const store = createStore(reducers, (applyMiddleware(...middlewares)));

export default store;
