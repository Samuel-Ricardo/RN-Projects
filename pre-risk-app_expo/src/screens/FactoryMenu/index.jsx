import React, { useEffect, useState, setState } from 'react'
import { Text, View, ScrollView, Alert } from 'react-native'

import { connect } from "react-redux"
import { bindActionCreators } from 'redux'


import getFactoryMenuStyle from './menu_style'

import AddIcon from '../../icon/AddIcon'

import Header from '../../component/Header/Index'
import Button from '../../component/Button'
import InfoField from '../../component/FormFields/InfoField'

import * as user_actions from '../../../Store/actions/User'

var pilot, car, helper = false;


const FactoryMenuScreen = ({ user, navigation, route, app_theme, logout }) => {


  const style = getFactoryMenuStyle(app_theme)

  const margin = 10;

  //const { car, cnh, helper} = false;


  const pilotClick = async () => {
    navigation.navigate('factory-driver')
    console.log("Indo para o form Piloto");
    pilot = true;
    car = false;
    helper = false;
  }

  const carClick = async () => {

    navigation.navigate('factory-vehicle')
    console.log("Indo para o form Carro");
    car = true;
    pilot = false;
    helper = false;
  }

  const helperClick = async () => {

    navigation.navigate('factory-helper')
    console.log("Indo para o form Ajudante");
    helper = true;
    car = false;
    pilot = false;
  }

  return (
    <>
      <View style={style.Container}>

        <Header
          text="Criação"
          config_action={() => logout(user)}
          icon={<AddIcon fill='#FFFFFF' width={40} height={40} />}
        />

        <ScrollView style={{
          margin: 5,
        }} >

          <View style={{ margin }}>
            <InfoField title='Adicionar Piloto' >
              <Button onClick={() => pilotClick()}>
                Adicionar
              </Button>
            </InfoField>
          </View>

          <View style={{ margin }}>
            <InfoField title='Adicionar Veículo' >
              <Button onClick={() => carClick()}>
                Adicionar
              </Button>
            </InfoField>
          </View>

          <View style={{ margin }}>
            <InfoField title='Adicionar Ajudante' >
              <Button onClick={() => helperClick()}>
                Adicionar
              </Button>
            </InfoField>
          </View>
        </ScrollView>
      </View>
    </>
  )
}
const mapStateToProps = state => (
  {
    user: state.User.logged_user,
    app_theme: state.app_config.app_theme,
    //pilot: this.pilot
  })

  const mapDispatchToProps = dispatch => (bindActionCreators(user_actions, dispatch))
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(FactoryMenuScreen);
export { pilot, car, helper };
