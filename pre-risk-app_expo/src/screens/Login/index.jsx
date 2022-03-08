import React, { useEffect, useState } from 'react'
import { Alert, AsyncStorage } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';


import getLoginStyle from "./login_style"

import * as user_actions from '../../../Store/actions/User';

import Button from '../../component/Button'
import Form from '../Form';
import Link from '../../component/Link';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as API from '../../server/API';


const LoginScreen = ({ navigation, route, user, app_theme, login}) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remindMe, setRemindMe] = useState(true)

  const loginUser = async () => {

    Alert.alert(
      "Procurando...",
      "Estamos procurando sua conta",
      [
        {
          text: "OK",
        }
      ]
    )

    const loginData = {
      email: email,
      password: password
    }

    const login_result = await API.postRequest("login", loginData, {})

    console.log("")
    console.log("Login Result:")
    console.log("")
    console.log(login_result)
    console.log("")

    // console.log("Error1:")
    // console.log(login_result.data.error)
    // console.log("Error2:")
    // console.log(login_result.error)

    if (login_result.data.error === false) {

      Alert.alert(
        "Acesso concedido!",
        login_result.data.message,
        [
          {
            text: 'Ok', onPress: () => { console.log("OK") }
          }
        ]
      )

      login(login_result.data.user, login_result.data.token)
    } else {

      Alert.alert(
        "Ops! Algo deu errado ;-;",
        login_result.data.message,
        [
          {
            text: 'Ok', onPress: () => { console.log("OK") }
          }
        ]
      )
    }
  }

  const login_style = getLoginStyle(app_theme)

  const register = async () => {

    navigation.navigate('user_register')
  }

  const checkLogged = async () => {
    let user = await AsyncStorage.getItem('@pre-risk:logged_user')
  
    if(user){ 
      user = JSON.parse(user); 
      login(user, user.authenticationToken);
    }
  }

  useEffect(() => {
    checkLogged();
  }, [])

  return (
    <Form

      style={login_style}

      title='Pre-Risk'
      subTitle='FR Transportes'
      paragraph='App para gestão de habilitações.'

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
          Esqueci Minha Senha
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
            onClick={() => loginUser()}
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
        </>
      }
    />
  )
}

const mapStatteToProps = state => ({
  user: state.User.logged_user,
  app_theme: state.app_config.app_theme
})

const mapDispatchToProps = dispatch => (
  bindActionCreators(user_actions, dispatch)
)

export default connect(mapStatteToProps, mapDispatchToProps)(LoginScreen);
