/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 03/04/18.
 */
import { AsyncStorage } from 'react-native'
// import DeviceInfo from 'react-native-device-info';
// import { serviceLogout } from '../services/Auth.service'; <------------------AQUIIIIIII
import { setAuthorizationToken } from '../util/AuthTokenAxios.util';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const USER_PROFILE  = 'USER_PROFILE';

export const actionLoginUser = (user) => {
    return (dispatch) => { 

        dispatch({ type: LOGIN, payload: user });

        console.log("")
        console.log("Get User from login")
        console.log("")
        console.log(user)
        console.log("")

        AsyncStorage.setItem('jwt_token', user.authenticationToken);
        AsyncStorage.setItem('auth_user', JSON.stringify(user));
        AsyncStorage.setItem('user', user)

        setAuthorizationToken(user.token);

        AsyncStorage.getItem('auth_user').then(data => {

            console.log("")
            console.log("Get User from login AsyncStorage")
            console.log("")
            console.log(data)
            console.log("")

        })

        console.log('')
        console.log('VAZEI')
        console.log('')
        console.log('jwt_token 2: '+user.token)
        console.log('')
        console.log('jwt_token 3: '+user.authenticationToken)
        console.log('')

        // if(geolocation_data) {
        //     if('lat' in geolocation_data && 'lng' in geolocation_data) {
        //         dispatch(actionGetHomeData());
        //         dispatch(actionUpdateLocation(geolocation_data));
        //         dispatch(actionGetNearbyList({latitude: geolocation_data.lat, longitude: geolocation_data.lng}));
        //     }
        // }
    };
};

export const actionLogoutUser = () => {
    return (dispatch) => {
        // serviceLogout({ device_id: DeviceInfo.getUniqueID() }).then(() => { }).catch((err) => {})
        dispatch({ type: LOGOUT });
        AsyncStorage.removeItem('jwt_token');
        AsyncStorage.removeItem('auth_user');
        // setAuthorizationToken(null);
        //     const resetNavigator = StackActions.reset({
        //         index: 0,
        //         key: null,
        //         actions: [
        //             NavigationActions.navigate({
        //                 routeName: 'Authorized',
        //             })
        //         ],
        //     });
        //     dispatch(resetNavigator);
        //
        // const resetNavigator2 = StackActions.reset({
        //     index: 0,
        //     key: null,
        //     actions: [
        //         NavigationActions.navigate({
        //             routeName: 'Authorized',
        //         })
        //     ],
        // });
        // dispatch(resetNavigator2);
    };
};

export const checkToken = (value, captureData = null) => {
    console.log('checkToken data', value);
    return (dispatch) => {
        if(value) {
            const tempParsed = JSON.parse(value);
            setAuthorizationToken(tempParsed.token);
            dispatch({ type: LOGIN, payload: tempParsed });
        } else {
            AsyncStorage.removeItem('jwt_token');
            AsyncStorage.removeItem('auth_user');
            setAuthorizationToken();
            dispatch({ type: LOGOUT });
        }
    }
};
