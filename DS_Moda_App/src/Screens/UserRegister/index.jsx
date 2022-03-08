import React, { useState } from 'react'
import { View, Text, Alert } from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as UserActions from '../../../Store/Actions/User'
import UserActionsTypes from '../../../Store/Actions/Types/User'

import * as API from '../../Services/API/API'

import getRegisterStyle from './RegisterStyle'

import Form from '../Form'
import Button from '../../Components/Button'
import TextField from '../../Components/FormFields/TextField'

const UserRegisterScreen = (props) => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [remindMe, setRemindMe] = useState(true)

  const { user, app_theme, navigation, route, loginUser } = props

  console.log("")
  console.log("Open: User Register Screen")
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

  const register = async () => {

    console.log("Registrar")

    if (password === confirmPassword && password.length > 0) {

      Alert.alert(
        "Cadastrando (~ U,U)~",
        "Estamos cadastrando sua conta",
        []
      )

      if (name.length < 3 || email.length < 3) {

        return Alert.alert(
          "Ops...",
          "Nome ou Email tem menos que 3 caracteres",
          [{text:"Vou Corrigir"}]
        )
      }

      const form_data = {
        name,
        email,
        password,
        number,
        remindMe: true,
        isAdmin: false,
      }

      const register_result = await API.postRequest('add/users', { ...form_data }, {})

      if (register_result.error === false) {

        Alert.alert(
          "Sucesso (~ U,U)~",
          register_result.message,
          [
            { text: "Ok" }
          ]
        )

        loginUser(register_result.user)

      } else {

        Alert.alert(
          "Ops! Algo deu errado ;-;",
          register_result.error,
          [
            {
              text: 'Ok', onPress: () => { console.log("OK") }
            }
          ]
        )
      }
    } else {

      Alert.alert(
        "Ops... (~ X,X)~",
        'A sua senha está errada, reescreva por favor',
        [
          { text: "OK :)" }
        ]
      )
    }
  }

  const register_style = getRegisterStyle(app_theme)

  return (
    <>
      <Form
        style={register_style}

        title='DS Moda'
        subTitle='Moda Fitness'
        paragraph='Por Que Todos Merecem Fazer as Pazes com o Espelho'

        formTitle='Cadastro'

        form_fields={
          <>
            <TextField
              title='Nome'
              style={{ marginBottom: 20 }}
              placeholder="Digite Seu Nome"
              onChangeText={nameText => setName(nameText)}
              value={name}
            />

            <TextField
              title='Email'
              style={{ marginBottom: 20 }}
              placeholder="Digite Seu Email"
              onChangeText={emailText => setEmail(emailText)}
              value={email}
            />

            <TextField
              title='Número de celular'
              style={{ marginBottom: 20 }}
              placeholder="(21) 912345678"
              onChangeText={numberText => setNumber(numberText)}
              value={number}
              secureTextEntry={false}
            />

            <TextField
              title='Senha'
              style={{ marginBottom: 20 }}
              placeholder="Digite Sua Senha"
              onChangeText={passwordText => setPassword(passwordText)}
              value={password}
              secureTextEntry={true}
            />

            <TextField
              title='Confirmar Senha'
              placeholder="Confirme Sua Senha"
              onChangeText={passwordText => setConfirmPassword(passwordText)}
              value={confirmPassword}

            />
          </>
        }

        buttons={
          <>
            <Button
              onClick={() => back()}
              style_button={
                {
                  ...register_style.Button,
                  marginLeft: 10,
                  marginRight: 0,
                }
              }
            >
              Voltar
              </Button>

            <Button
              onClick={() => register()}
              style_button={
                {
                  ...register_style.Button,
                  marginLeft: 0,
                  marginRight: 10,
                }
              }
            >
              Cadastrar
              </Button>
          </>
        }
      />
    </>
  )
}

const mapStateToProps = state => ({
  user: state.User,
  app_theme: state.app_config.app_theme
})

const mapDispatchToProps = dispatch => (
  bindActionCreators(UserActions, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(UserRegisterScreen)
