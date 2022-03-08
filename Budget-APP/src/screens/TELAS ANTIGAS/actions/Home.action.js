/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 23/07/18.
 */
import { serviceGetLastestPosts } from '../services/Home.service';


export const GET_HOME_DATA = 'GET_HOME_DATA';
export const HOME_UPDATE_INITIATED = 'HOME_UPDATE_INITIATED';
export const HOME_UPDATE_END = 'HOME_UPDATE_END';
export const UPDATE_HOME_DATA = 'UPDATE_HOME_DATA';

export const actionGetHomeData = (params = {}) => {
    const request = serviceGetLastestPosts(params);
    return (dispatch) => {
        dispatch({ type: HOME_UPDATE_INITIATED });
        request.then((data) => {
            dispatch({ type: GET_HOME_DATA, payload: data.data });
            dispatch({ type: HOME_UPDATE_END });
        })
    };
};

export const actionUpdateHomeData = (params = {}) => {
    const request = serviceGetLastestPosts(params);
    return (dispatch) => {
        dispatch({ type: HOME_UPDATE_INITIATED });
        request.then((data) => {
            dispatch({ type: UPDATE_HOME_DATA, payload: data.data });
            dispatch({ type: HOME_UPDATE_END });
        })
    };
};