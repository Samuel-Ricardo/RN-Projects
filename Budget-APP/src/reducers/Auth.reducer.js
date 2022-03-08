/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 03/04/18.
 */

import { LOGIN, LOGOUT, USER_PROFILE } from '../actions/Auth.action';

const initialState = { 
    
    is_authenticated: false,
    error: false, 
    error_message: '', 
    user_id: null, 
    user_profile: {} 
};

export default function (state = initialState, action) {

    switch (action.type) {

        case LOGIN : {

            return { ...state,
                 is_authenticated: true, 
                 user_id: action.payload._id, 
                 user_profile: { ...action.payload } };
        }
        case LOGOUT: {
            
            return { ...state,
                 is_authenticated: false,
                 user_id: null, 
                 user_profile: { } };
        }
        
        default: {
            return state;
        }
    }
}
