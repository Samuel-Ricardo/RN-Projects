import axios from 'axios';
import Constants from '../../config/constants';

const Authorization = {Authorization: `Bearer ${1234}` }

export async function postRequest(url, params, headers) {

  console.log("")
  console.log("Start Post Request")
  console.log("")
  console.log("url: "+url)
  console.log("")
  console.log("Authorization")
  console.log("")
  console.log(Authorization)
  console.log("")
  console.log("Headers:")
  console.log("")
  console.log(headers)
  console.log("")
  console.log("Params:")
  console.log("")
  console.log(params)
  console.log("")

  const header_request = {...Authorization, headers}

  console.log("header_request:")
  console.log("")
  console.log(header_request)
  console.log("")

  try {

    const response = await axios.post(`${Constants.DEFAULT_URL}${url}`, params, headers)

    console.log("")
    console.log("Response")
    console.log("")
    console.log(response)
    console.log("")


    return response.data

  } catch (error) {

    console.log("")
    console.log("Ocorreu algum erro Error")
    console.log("")
    console.log(error.response)
    console.log("")

    return error.response.data;

  }
}

export async function getRequest(url, params, headers) {

  console.log("")
  console.log("Start Get Request")
  console.log("")
  console.log("url: "+url)
  console.log("")
  console.log("Authorization")
  console.log("")
  console.log(Authorization)
  console.log("")
  console.log("Headers:")
  console.log("")
  console.log(headers)
  console.log("")
  console.log("Params:")
  console.log("")
  console.log(params)
  console.log("")

  const header_request = {...Authorization, headers}

  console.log("header_request:")
  console.log("")
  console.log(header_request)
  console.log("")

  try {

    const response = await axios.get(`${Constants.DEFAULT_URL}${url}`, params, headers)

    console.log("")
    console.log("Response")
    console.log("")
    console.log(response)
    console.log("")

    return response.data;

  } catch (error) {

    console.log("")
    console.log("Ocorreu algum erro Error")
    console.log("")
    console.log(error.response)
    console.log("")

    return error.response.data;

  }
}

export async function deleteRequest(url, params, headers) {

  console.log("")
  console.log("Start Delete Request")
  console.log("")
  console.log("url: " + url)
  console.log("")
  console.log("Authorization")
  console.log("")
  console.log(Authorization)
  console.log("")
  console.log("Headers:")
  console.log("")
  console.log(headers)
  console.log("")
  console.log("Params:")
  console.log("")
  console.log(params)
  console.log("")

  const header_request = { ...Authorization, headers }

  console.log("header_request:")
  console.log("")
  console.log(header_request)
  console.log("")

  try {

    const response = await axios.delete(`${Constants.DEFAULT_URL}${url}`, params, headers)

    console.log("")
    console.log("Response")
    console.log("")
    console.log(response)
    console.log("")

    return response.data;

  } catch (error) {

    console.log("")
    console.log("Ocorreu algum erro Error")
    console.log("")
    console.log(error.response)
    console.log("")

    return error.response.data;

  }
}
