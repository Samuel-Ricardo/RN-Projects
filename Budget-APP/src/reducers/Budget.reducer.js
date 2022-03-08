/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 02/08/18.
 */
import { SET_TOTAL_AMOUNT, SET_BUDGET_CATEGORIES, SET_SERVER_BUDGET, START_SERVER_BUDGET } from '../actions/Budget.action';

const initialState = {
    
     is_fetching: false,
     budget_error: false, 
     total_amount: 1000, 
     categories: [
            {id: 1, is_locked: false, title: "tax", percentage: "10.00", amount: "100"},
            {id: 2, is_locked: false, title: "loan", percentage: "10.00", amount: "100"},
            {id: 3, is_locked: false, title: "creditcard", percentage: "10.00", amount: "100"},
            {id: 4, is_locked: false, title: "healthcare", percentage: "10.00", amount: "100"},
           {id: 5, is_locked: false, title: "insurance", percentage: "10.00", amount: "100"},
           {id: 6, is_locked: false, title: "spendable", percentage: "50.00", amount: "500"}
       ]

      };


export default function (state = initialState, action) {

    switch (action.type) {

        case SET_TOTAL_AMOUNT: {
            return { ...state, total_amount: action.payload };
        }

        case SET_BUDGET_CATEGORIES: {
            return { ...state, categories: action.payload.categories };
        }

        case SET_SERVER_BUDGET: {
            return { ...state,
                
                is_fetching: false, 
                total_amount: action.payload.total_amount, 
                categories: action.payload.categories
            }
        }

        case START_SERVER_BUDGET: {
            return { ...state,
                 is_fetching: action.payload.is_fetching, 
                 budget_error: action.payload.is_error };
        }

        default: {
            return state;
        }
    }
}