import React from 'react'
import { View, Image } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as API from '../../Services/API/API'

import * as UserActions from "../../../Store/Actions/User"
import * as cart_actions from '../../../Store/Actions/ShoppingCart'
import * as app_actions from '../../../Store/Actions/App_Config'

import Button from '../../Components/Button'
import TextField from '../../Components/FormFields/TextField'
import InfoField from '../../Components/FormFields/InfoField'
import Form from '../Form'

import getConfigStyle from './ConfigStyle'



const ConfigScreen = (props) => {

  const {
    navigation,
    route,

    user,
    app_theme,

    logoutUser
  } = props

  const main_style = getConfigStyle(app_theme)

  return (
    <Form style={main_style}

      fill={false}

      title='Configurações'

      paragraph=''

      formTitle='Configurações'

      form_fields={

        <View style={{ flex: 1 }}>

          <InfoField
            title='Atualizar Dados de Usuário'
            style={{ Background: { marginBottom: 20 } }}
          >
            <Button
              style_button={{ marginTop: 10, }}
              onClick={() => navigation.navigate('UserUpdater')}
            >
              Atualizar
            </Button>
          </InfoField>

          {
            user.isAdmin === false
              ?
              <>
                <InfoField
                  title='Atualizar Produto'
                  style={{ Background: { marginBottom: 20 } }}
                >
                  <Button
                    style_button={{ marginTop: 10, }}
                    onClick={() => navigation.navigate('ItemUpdater')}
                  >
                    Atualizar
                </Button>
                </InfoField>

                <InfoField
                  title='Criar Produto'
                  style={{ Background: { marginBottom: 20 } }}
                >
                  <Button
                    style_button={{ marginTop: 20, }}
                    onClick={() => navigation.navigate('ItemCreator')}
                  >
                    Criar
                </Button>
                </InfoField>

                <InfoField
                  title='Deletar Produto'
                  style={{ Background: { marginBottom: 20 } }}
                >
                  <Button
                    style_button={{ marginTop: 20, }}
                    onClick={() => navigation.navigate('ItemDeleter')}
                  >
                    Deletar
                </Button>
                </InfoField>
              </>

              :

              <></>
          }

          <InfoField
            title='Sair da Conta'
            style={{ Background: { marginBottom: 0 } }}
          >
            <Button
              style_button={{ marginTop: 10, }}
              onClick={() => logoutUser(user)}
            >
              Sair
            </Button>
          </InfoField>

        </View>
      }

      description={
        <>

        </>
      }

      buttons={
        <>
          <Button
            onClick={() => {
              return navigation.navigate('Home')
            }}
            style_button={
              {
                ...main_style.Button,
                marginLeft: 10,
                marginRight: 0,
              }
            }
          >
            Voltar
            </Button>
        </>
      }
    />
  )
}

const mapStateToProps = state => (
  {
    user: state.User.loggedUser,
    app_config: state.app_config,
    app_theme: state.app_config.app_theme
  })

const mapDispatchToProps = dispatch => {

  const actions = {
    ...cart_actions,
    ...UserActions,
    ...app_actions
  }

  return bindActionCreators(actions, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ConfigScreen);
