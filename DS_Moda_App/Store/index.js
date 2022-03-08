import { createStore } from 'redux';

import mainReducer from "./Reducers"

const store = createStore(mainReducer);

export default store;
