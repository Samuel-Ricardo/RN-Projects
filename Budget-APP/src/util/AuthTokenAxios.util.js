/**
 * Created by charanjeetelectrovese@gmail.com. on 03/04/18.
 */

import axios from 'axios';

export function setAuthorizationToken(token) {
    if(token) {
        axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}