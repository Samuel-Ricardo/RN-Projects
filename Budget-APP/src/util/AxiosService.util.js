/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 03/04/18.
 */
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import { NativeEventEmitter } from 'react-native';
import Constants from '../config/Constants.config';

export async function postRequest(url, params, headers) {

    try {

        const tempRequest = await axios.post(`${Constants.DEFAULT_APP_URL}${url}`, {...params }, {headers: {...headers}});

        if(tempRequest.status === 200) {

            console.log(url , params, tempRequest.data);

            if(tempRequest.data.response_code === 1) {

                return {

                    error: false,
                    message: '',
                    data: tempRequest.data.response_obj,
                    authorization: true,
                    response_code: tempRequest.data.response_code, status: 200
                };
            }

            return {

                error: true,
                message: tempRequest.data.response_message,
                authorization: true,
                response_code: tempRequest.data.response_code,
                status: 200
            };
        }

    } catch (err) {

        console.log(err);

        if(err.response) {

            if (err.response.status === 401) {
                // const tempEvent = new NativeEventEmitter();
                // tempEvent.emit('logout', {});

                return {

                    error: true,
                    authorization: false,
                    response_code: 0,
                    status: 401
                };
            }

            if (err.response.status === 400) {

                return {

                    error: true,
                    message: 'Please Send Required Parameters',
                    authorization: true,
                    response_code: 0,
                    status: 400
                };
            }
        }

        Snackbar.show({

            title: 'Something Went Wrong',
            duration: Snackbar.LENGTH_SHORT,
        });

        return {

             error: true,
             message: 'Something Went Wrong',
             authorization: true,
             status: 500
            };
    }
}

export async function getRequest(url, params, headers) {

    console.log("Procurando nemo")

    try {

    console.log("Procurando nemo")
        const tempRequest = await axios.get(`${Constants.DEFAULT_APP_URL}${url}`, { params: { ...params }, headers: {...headers} });

    console.log("Procurando nemo na api")


        if(tempRequest.status === 200) {

            console.log("Pegamo")
            console.log(tempRequest.data);

            if(tempRequest.data.response_code === 1) {

                return {

                    error: false,
                    message: '',
                    data: tempRequest.data.response_obj,
                    authorization: true };
            }

            return {
                error: true,
                message: tempRequest.data.response_message,
                authorization: true
            };
        }

    } catch (err) {

        console.log(err);

        if(err.response) {

            console.log(err.response);

            if (err.response.status === 401) {
                // const tempEvent = new NativeEventEmitter();
                // tempEvent.emit('logout', {});

                return {error: true, authorization: false};
            }

            if (err.response.status === 400) {

                return {

                    error: true,
                    message: 'Please Send Required Parameters',
                    authorization: true
                };
            }
        }

        Snackbar.show({

            title: 'Something Went Wrong',
            duration: Snackbar.LENGTH_SHORT,
        });

        return {
            error: true,
            message: 'Something Went Wrong',
            authorization: true };
    }
}

export async function formDataRequest(url, formData) {
    console.log(url, formData);
    try {
        const tempRequest = await axios({
            method: 'post',
            url: `${Constants.DEFAULT_APP_URL}${url}`,
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        });
        if(tempRequest.status === 200) {
            // console.log(tempRequest.data);
            if(tempRequest.data.response_code === 1) {
                return { error: false, message: '', data: tempRequest.data.response_obj, authorization: true };
            }
            return { error: true, message: tempRequest.data.response_message, authorization: true };
        }
    }
    catch (err) {
        // console.log(err);
        if(err.response) {
            if (err.response.status === 401) {
                const tempEvent = new NativeEventEmitter();
                tempEvent.emit('logout', {});
                return {error: true, authorization: false};
            }
            if (err.response.status === 400) {
                return {error: true, message: 'Please Send Required Parameters', authorization: true};
            }
        }
        Snackbar.show({
            title: 'Something Went Wrong',
            duration: Snackbar.LENGTH_SHORT,
        });
        return { error: true, message: 'Something Went Wrong', authorization: true };
    }
}
