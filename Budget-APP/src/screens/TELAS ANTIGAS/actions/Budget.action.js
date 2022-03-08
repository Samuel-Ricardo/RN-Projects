/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 02/08/18.
 */
import { serviceGetBudget } from '../services/Home.service';
import { AsyncStorage } from 'react-native'

export const SET_TOTAL_AMOUNT = 'SET_TOTAL_AMOUNT';
export const SET_BUDGET_CATEGORIES = 'SET_BUDGET_CATEGORIES';
export const START_SERVER_BUDGET = 'START_SERVER_BUDGET';
export const SET_SERVER_BUDGET = 'SET_SERVER_BUDGET';

export const actionSetTotalAmount = (amount) => {
    return (dispatch) => {
        dispatch({ type: SET_TOTAL_AMOUNT, payload: amount });
    }
};

export const actionSetBudgetCategories = (data) => {
    return (dispatch) => {
        dispatch({ type: SET_BUDGET_CATEGORIES, payload: data });
    }
};

export const actionGetBudgetFromServer = (user) => {


    console.log("")
    console.log("Pegando token do user para pegar o budget")
    console.log("")

    const auth_token = "Bearer " + user.authenticationToken

    const request = serviceGetBudget({},{ Authorization: auth_token });

    return (dispatch) => {

        dispatch({

             type: START_SERVER_BUDGET, 
             payload: { is_fetching: true, is_error: false }
             });
    
        
        dispatch({type: SET_SERVER_BUDGET, payload: {
                 
                 is_fetching: false,
                 budget_error: false, 
                 total_amount: 1000, 
                 categories: [
                        {id: 1, is_locked: false, title: "tax", percentage: "10.00", amount: "100"},
                        {id: 2, is_locked: false, title: "loan", percentage: "10.00", amount: "100"},
                        {id: 3, is_locked: false, title: "creditcard", percentage: "10.00", amount: "100"},
                        {id: 4, is_locked: false, title: "healthcare", percentage: "10.00", amount: "100"},
                        {id: 5, is_locked: false, title: "insurance", percentage: "10.00", amount: "100"},
                        {id: 6, is_locked: false, title: "spendable", percentage: "50.00", amount: 500}
                    ]
                 }//beleza
        });
        

        request.then((data) => {

            if(!data.error) {

                console.log("")
                console.log("Pegando o budget")
                console.log("")

                console.log("")
                console.log(data.data)
                console.log("")

                AsyncStorage.setItem('budget', data.data)

                dispatch({type: SET_SERVER_BUDGET, payload: data.data });

            } else {

                dispatch({ type: START_SERVER_BUDGET, payload: { is_fetching: false, is_error: false } });

            }
        })
    }
};