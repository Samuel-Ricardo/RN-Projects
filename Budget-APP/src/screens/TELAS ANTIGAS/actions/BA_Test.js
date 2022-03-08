import { serviceGetBudget } from '../services/Home.service';

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

export const actionGetBudgetFromServer = () => {

  const request = serviceGetBudget("/budget");

  return (dispatch) => {
      
    dispatch({ type: START_SERVER_BUDGET, payload: { is_fetching: true, is_error: false } });
    
    request.then((data) => {
          
      if (!data.error) {
              
        dispatch({ type: SET_SERVER_BUDGET, payload: data.data });

      } else {
        
        dispatch({ type: START_SERVER_BUDGET, payload: { is_fetching: false, is_error: true } });
        
      }
      
    })
    
  }
}