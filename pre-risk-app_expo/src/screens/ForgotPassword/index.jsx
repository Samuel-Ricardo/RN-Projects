import React, { useState } from 'react'
import { Text, TextInput, Alert } from 'react-native'

import { connect } from 'react-redux'

import Button from '../../component/Button'
import TextField from '../../component/FormFields/TextField'
import Form from '../Form'

import getForgotPasswordStyle from './forgot_password_style'

import * as API from '../../server/API';

const ForgotPasswordScreen = (props) => {

  const [email, setEmail] = useState("")

  const { navigation, route, app_theme } = props

  console.log("")
  console.log("Open: Forgot Password Screen")
  console.log("")
  console.log("Navigation Data:")
  console.log(navigation)
  console.log("")
  console.log("Navigation Route Data:")
  console.log(route)
  console.log("")

  const back = () => {

    navigation.goBack();
  }

  const recover = async () => {

    const form_data = {
      email
    }

    const recover_result = await API.postRequest("password/recovery", form_data, {})

    console.log( recover_result.data)

    if (recover_result.data.error === false) {

      Alert.alert(
        "Email Enviado com sucesso",
        " O email foi enviado, deve chegar em instantes, fique de olho no seu email ",
        [
          {
            text:"OK"
          }
        ]
      )
      

    } else {

      Alert.alert(
        "Ops, Ocorreu algum erro ao tentar enviar o email (~ X,X)~",
        recover_result.error,
        [
          {text: "OK"}
        ]
      )
    }
  }


  const forgot_password_style = getForgotPasswordStyle(app_theme)

  return (
    <Form
      style={forgot_password_style}

      title='Pre-Risk'
      subTitle='FR Transportes'
      paragraph='App para gestão de habilitações.'

      formTitle='Recuperar Senha'

      form_fields={
        <>
          <TextField
            title='Digite seu email'
            placeholder="Digite seu Email"
            onChangeText={emailText => setEmail(emailText)}
            value={email}
          />
        </>
      }

      description={
        <>
          <Text
            style={
              {
                color: app_theme.default_background,
              }
            }
          >
            Será enviado uma mensagem para o seu email, acesse ele e siga os passos para recuperar sua senha. caso não ache cheque a caixa de spam e a lixeira.
          </Text>
        </>
      }

      buttons={
        <>
          <Button
            onClick={() => back()}
            style_button = {
              {
                ...forgot_password_style.Button,
                marginLeft: 25,
                marginRight: 0,
              }
            }
          >
            Voltar
          </Button>

          <Button
            onClick={() => recover()}
            style_button = {
              {
                ...forgot_password_style.Button,
                marginLeft: 25,
                marginRight: 0,
              }
            }
          >
            Recuperar
          </Button>
        </>
      }
    />
  )
}

const mapStateToProps = state => ({
  app_theme: state.app_config.app_theme
})

export default connect(mapStateToProps)(ForgotPasswordScreen);
