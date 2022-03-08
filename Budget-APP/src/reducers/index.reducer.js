/**
 * Created by charnjeetelectrovese@gmail.com on 3/14/2018.
 */

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './Auth.reducer';
 import HomeReducer from './Home.reducer';
import BudgetReducer from './Budget.reducer';

const rootReducer = combineReducers({
    budget: BudgetReducer,
    form: formReducer,
    auth: AuthReducer,
     home: HomeReducer,
    // categories: CategoriesReducer,
});

export default rootReducer;