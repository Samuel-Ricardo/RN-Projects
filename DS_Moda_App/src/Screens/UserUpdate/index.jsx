import React, { useState } from 'react'
import { Alert, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as UserActions from "../../../Store/Actions/User";

import * as API from '../../Services/API/API';

import getUpdaterStyle from './UserUpdaterStyle'

import Button from '../../Components/Button'
import Form from '../Form';
import Link from '../../Components/Link';

import PerfilIcon from '../../image/icon/PerfilIcon'
import TextField from '../../Components/FormFields/TextField';

const PerfilUpdaterScreen = ({
  navigation,
  route,

  user,
  app_theme,

  loginUser,
}) => {

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


  const [email, setEmail] = useState(user.email)
  const [name, setName] = useState(user.name)
  const [number, setNumber] = useState('')

  const update = async () => {

    Alert.alert(
      "Estamos Atualizando sua conta",
      "Aguarde um instante...",
      []
    )

    const user_data = {
      userID: user._id,
      email: email,
      name: name,
      number: number,
    }

    const update_result = await API.postRequest("update", user_data, {})

    console.log("")
    console.log("Update Result:")
    console.log("")
    console.log(update_result)
    console.log("")

    if (update_result.error === false) {

      Alert.alert(
        "Tudo Certo /( > .<)/",
        "Sua Conta Foi Atualizada",
        [
          {
            text: 'Ok'
          }
        ]
      )

      loginUser(user)

    } else {

      Alert.alert(
        "Ops! Algo deu errado ;-;",
        update_result.error,
        [
          {
            text: 'Ok'
          }
        ]
      )
    }
  }

  const main_style = getUpdaterStyle(app_theme)

  return (

    <Form

      style={main_style}

      title='Perfil'

      subTitle={
        <>
          <View style={main_style.icon_background}>
            <PerfilIcon width={120} height={120} fill='#0085FF' />
          </View>
        </>
      }

      formTitle='Dados do Usuário'

      form_fields={
        <>

          <TextField
            title='Nome: '
            style={{marginBottom: 20}}
            placeholder="Digite Sua Senha..."
            onChangeText={nameText => setName(nameText)}
            value={name}
            secureTextEntry={true}
          />

          <TextField
            title='Email: '
            style={{marginBottom: 20}}
            placeholder="Digite Seu Email..."
            onChangeText={emailText => setEmail(emailText)}
            value={email}
          />

          <TextField
            title='Número para Contato: '
            style={{marginBottom: 20}}
            placeholder="(81) 91234-5678"
            onChangeText={nameText => setName(nameText)}
            value={name}
            secureTextEntry={true}
          />

        </>
      }

      description={

        <Link
          onClick={() => navigation.navigate('forgot_password')}
        >
          Atualizar Senha
        </Link>

      }

      buttons={
        <>
          <Button
            onClick={() => navigation.navigate('Config')}
            style_button={
              {
                ...main_style.Button,
                marginLeft: 10,
                marginRight: 0,
              }
            }
          >
            voltar
              </Button>

          <Button
            onClick={() => update()}
            style_button={
              {
                ...main_style.Button,
                marginLeft: 0,
                marginRight: 10,
              }
            }
          >
            Atualizar
              </Button>
        </>
      }
    />
  )
}


const mapStateToProps = state => ({

  user: state.User.loggedUser,
  app_theme: state.app_config.app_theme

})

const mapDispatchToProps = dispatch => (

  bindActionCreators(UserActions, dispatch)

)

export default connect(mapStateToProps, mapDispatchToProps)(PerfilUpdaterScreen);
