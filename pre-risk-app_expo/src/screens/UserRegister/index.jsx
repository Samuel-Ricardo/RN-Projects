import React, { useState } from 'react'
import { View, Text, Alert } from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as UserActions from '../../../Store/actions/User'
import UserActionsTypes from '../../../Store/actions/types/User'

import * as API from '../../server/API'

import getRegisterStyle from './register_style'
import getDriverStyle from '../DriverFactory/driver_style'

import Form from '../Form'
import Button from '../../component/Button'
import TextField from '../../component/FormFields/TextField'
import { MaskedTextInput } from "react-native-mask-text";
import { TextInput } from 'react-native-gesture-handler'

const UserRegisterScreen = (props) => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [cnpj, setCnpj] = useState("")
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
        cnpj,
        password,
        number,
        isAdmin: true,
        docList: []
      }

      const register_result = await API.postRequest('add/users', { ...form_data }, {})

      if (register_result.data.error === false) {

        Alert.alert(
          "Sucesso (~ U,U)~",
          register_result.data.message,
          [
            { text: "Ok" }
          ]
        )

        //loginUser(register_result.user)

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
  const DRIVE_STYLE = getDriverStyle(app_theme)

  return (
    <>
      <Form
        style={register_style}

        title='Pre-Risk'
        subTitle='FR Transportes'
        paragraph='App para gestão da habilitações.'

        formTitle='Cadastro'

        form_fields={
          <>
            <TextInput
              style={ DRIVE_STYLE.TextInput}
              placeholder="Digite Seu Nome"
              onChangeText={nameText => setName(nameText)}
              value={name}
            /> 
            
            <MaskedTextInput
                mask="99.999.999/9999-99"
                onChangeText={(text, rawText) => setCnpj(text)}
                value={cnpj}
                keyboardType='numeric'
                secureTextEntry={false}
                style={ DRIVE_STYLE.TextInput}
                placeholder="Digite o CNPJ"

              />

            <TextInput
              //style={{ marginBottom: 20 }}
              style={DRIVE_STYLE.TextInput }
              placeholder="Digite Seu Email"
              onChangeText={emailText => setEmail(emailText)}
              value={email}
            />
            
            <MaskedTextInput
                mask="(99) 99999-9999"
                onChangeText={(text, rawText) => setNumber(text)}
                value={number}
                keyboardType='numeric'
                secureTextEntry={false}
                style={DRIVE_STYLE.TextInput}
                placeholder="Digite o número de telefone"

              />

            <TextInput
              //style={{ marginBottom: 20 }}
              style={ DRIVE_STYLE.TextInput }
              placeholder="Digite Sua Senha"
              onChangeText={passwordText => setPassword(passwordText)}
              value={password}
              secureTextEntry={true}
            />

            <TextInput
              placeholder="Confirme Sua Senha"
              style={ DRIVE_STYLE.TextInput}
              onChangeText={passwordText => setConfirmPassword(passwordText)}
              value={confirmPassword}
              secureTextEntry={true}

            />
          </>
        }

        buttons={
          <>
            

            <Button
              onClick={() => register()}
              style_button={
                {
                  ...DRIVE_STYLE.Button, 
                  marginLeft: 80,
                  marginRight: 0
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
