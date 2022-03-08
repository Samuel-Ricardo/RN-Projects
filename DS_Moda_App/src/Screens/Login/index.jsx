import React, { useState } from 'react'
import { Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as UserActions from "../../../Store/Actions/User";

import * as API from '../../Services/API/API';

import getLoginStyle from './LoginStyle'

import Button from '../../Components/Button'
import Form from '../Form';
import Link from '../../Components/Link';

// import Firebase from '../../Services/Firebase/Firebase'

import auth from '@react-native-firebase/auth'
import { LoginManager, AccessToken } from 'react-native-fbsdk';

const LoginScreen = ({ navigation, route, state, app_theme, loginUser }) => {

  console.log("")
  console.log("Open: Login Screen")
  console.log("")
  console.log("Navigation Data:")
  console.log(navigation)
  console.log("")
  console.log("Navigation Route Data:")
  console.log(route)
  console.log("")

  //const setLogged = route.params?.setLogged


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remindMe, setRemindMe] = useState(true)

  const login = async () => {

    Alert.alert(
      "Procurando >,>",
      "Estamos procurando sua conta",
      [
        {
          text: "OK",
        }
      ]
    )

    const loginData = {
      email: email,
      password: password,
      remindMe: remindMe,
    }

    const login_result = await API.postRequest("login", loginData, {})

    console.log("")
    console.log("Login Result:")
    console.log("")
    console.log(login_result)
    console.log("")

    if (login_result.error === false) {

      loginUser(login_result.user)

    } else {

      Alert.alert(
        "Ops! Algo deu errado ;-;",
        login_result.error,
        [
          {
            text: 'Ok', onPress: () => { console.log("OK") }
          }
        ]
      )
    }
  }

  const register = async () => {

    navigation.navigate('user_register')
  }

  const FacebookLogin = async () => {

    console.log('')
    console.log('Iniciando Login Facebook')
    console.log('')

    console.log('')
    console.log(' Login Manager Facebook')
    console.log(LoginManager)
    console.log('')

    AccessToken

    console.log('')
    console.log(' Login AccessToken Facebook')
    console.log(AccessToken)
    console.log('')

  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    console.log('')
    console.log('Resukltado facebook')
    console.log(result)
    console.log('')

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  console.log('')
  console.log('Resukltado DATA facebook')
  console.log(data)
  console.log('')


  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

  console.log('')
  console.log('Resukltado credential facebook')
  console.log(facebookCredential)
  console.log('')

  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);

  //  console.log('')
  //  console.log('RResuklt Login Facebook ')
  //  console.log('')
  //  console.log(result)
  //  console.log('')

  }

  const login_style = getLoginStyle(app_theme)

  return (

    <Form

      style={login_style}

      title='DS Moda'
      subTitle='Moda Fitness'
      paragraph='Por Que Todos Merecem Fazer as Pazes com o Espelho'

      formTitle='Login'

      form_fields={
        <>
          <TextInput
            style={login_style.TextInput}
            placeholder="Digite Seu Email"
            onChangeText={emailText => setEmail(emailText)}
            value={email}
          />

          <TextInput
            style={login_style.TextInput}
            placeholder="Digite Sua Senha"
            onChangeText={passwordText => setPassword(passwordText)}
            value={password}
            secureTextEntry={true}
          />
        </>
      }

      description={

        <Link
          onClick={() => navigation.navigate('forgot_password')}
        >
          Esqueci Minha Senha :(
        </Link>

      }

      buttons={
        <>
          <Button
            onClick={() => register()}
            style_button={
              {
                ...login_style.Button,
                marginLeft: 10,
                marginRight: 0,
              }
            }
          >
            Cadastrar
              </Button>

          <Button
            onClick={() => login()}
            style_button={
              {
                ...login_style.Button,
                marginLeft: 0,
                marginRight: 10,
              }
            }
          >
            Login
              </Button>

              {/* <Button
            onClick={() => FacebookLogin()}
            style_button={
              {
                ...login_style.Button,
                marginLeft: 10,
                marginRight: 0,
              }
            }
          >
            Facebook
              </Button> */}
        </>
      }
    />
  )
}


const mapStateToProps = state => ({

  user: state.User,
  app_theme: state.app_config.app_theme

})

const mapDispatchToProps = dispatch => (

  bindActionCreators(UserActions, dispatch)

)

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

//{logUser: (user,setLogged) => dispatch(UserActions.logUser(user, setLogged))}
// <Button title='Login' onPress={()=>{navigation.navigate("Home",{user})}}/>
