import React, { useEffect, useState } from 'react'
import { Text, View, Image, Alert, TouchableOpacity } from 'react-native'

import { connect } from "react-redux"
import { bindActionCreators } from 'redux';
import * as documents_actions from '../../../Store/actions/Documents';

import * as API from '../../server/API'
import Button from '../Button';
import Field from '../Field';

const closeIcon = require('../../assets/close1.png');
const updateIcon = require('../../assets/magnifier.png');

import getDocItemStyle from './doc_item_style'

const DocItem = ({
  navigation,
  route,

  key,

  user,
  content,

  setDriver,
  setHelper,
  setVehicle,

  reloadList,

  app_theme,
}) => {

  const item_style = getDocItemStyle(app_theme)

  const [detail, setDetail] = useState(false)

  let ID;
  let name;
  let delete_route;


  function renderPilot(driver) {

    const {
      _id,
      addBy,
      namePilot,
      telPilot,
      cpfPilot,
      expireCNH,
      expireBuonny,
      expireApisul,
      expireOpentech,
      isActive,
    } = driver;

    const style = item_style.driver_style;

    ID = _id;
    name = namePilot;
    delete_route = `delete/docs`;

     async function update() {
       await setDriver(driver)
       navigation.navigate('factory-driver');
     }

    return (
      <>

        {detail == false ? (
          <View style={item_style._.Content}>
            <Field text='Nome: ' value={namePilot} />
            <Field text='CPF: ' value={cpfPilot} />
            <View style={item_style._.divide} />
            <Field text='Ativo: ' value={isActive ? "Sim" : "Não"} />
          </View>
        ) : (
          <View style={item_style._.Content}>
            <Field text='ID: ' value={_id} />
            <View style={item_style._.divide} />
            <Field text='Nome: ' value={namePilot} />
            <Field text='CPF: ' value={cpfPilot} />
            <Field text='Telefone: ' value={telPilot} />
            <View style={item_style._.divide} />
            <Field text='Expiração CNH: ' value={expireCNH} />
            <Field text='Expiração Buonny: ' value={expireBuonny} />
            <Field text='Expiração Apisul: ' value={expireApisul} />
            <Field text='Expiração Opentech: ' value={expireOpentech} />
            <View style={item_style._.divide} />
            <Field text='Ativo: ' value={isActive ? "Sim" : "Não"} />
            <View style={item_style._.divide} />
            <View style={{ margin: 10 }}>
              <Button onClick={() => update()}>Atualizar</Button>
            </View>
          </View>
        )
        }

      </>
    )
  }

  function renderHelper(helper) {

    const {
      _id,
      addPor,
      nameHelper,
      cpfHelper,
      expireBuonny,
      expireOpentech,
      telHelper,
      isActive,
    } = helper;

    ID = _id;
    name =nameHelper;
    delete_route = `delete/helper`;

    async function update() {
      await setHelper(helper)
      navigation.navigate('factory-helper');
    }

    return (
      <>
        {detail == false ? (
          <View style={item_style._.Content}>
            <Field text='Nome: ' value={nameHelper} />
            <Field text='CPF: ' value={cpfHelper} />
              <View style={item_style._.divide} />
            <Field text='Ativo: ' value={isActive ? "Sim" : "Não"} />
          </View>
        ) : (
          <View style={item_style._.Content}>
            <Field text='ID: ' value={_id} />
            <Field text='Nome: ' value={nameHelper} />
            <View style={item_style._.divide} />
            <Field text='CPF: ' value={cpfHelper} />
            <Field text='Telefone: ' value={telHelper} />
            <View style={item_style._.divide} />
            <Field text='Expiração Buonny: ' value={expireBuonny} />
            <Field text='Expiração Opentech: ' value={expireOpentech} />
            <View style={item_style._.divide} />
            <Field text='Ativo: ' value={isActive ? "Sim" : "Não"} />
            <View style={item_style._.divide} />
            <View style={{ margin: 10 }}>
              <Button onClick={() => update()}>Atualizar</Button>
            </View>
          </View>
        )

        }
      </>
    )
  }

  function renderVehicle(vehicle) {

    const {
      _id,
      addPor,
      year,
      numANTT,
      expireANTT,
      expireOpentech,
      isSendForBuonny,
      isActive,
      plateNumber,
      owner,
    } = vehicle;

    //print(vehicle)

    ID = _id
    //`${brand} ${model} de ${ownerName}`
    name =`${plateNumber} ${numANTT} de ${owner}` //'${plateNumber} de ${owner}'
    delete_route = `delete/vehicle`;

    async function update() {
      await setVehicle(vehicle)
      navigation.navigate('factory-vehicle');
    }

    return (
      <>
        {detail == false ? (
          <View style={item_style._.Content}>
            <Field text='Proprietário: ' value={owner} />
              <View style={item_style._.divide} />
            <Field text='N° ANTT: ' value={numANTT} />
            <Field text='Placa: ' value={plateNumber} />
              <View style={item_style._.divide} />
            <Field text='Ativo: ' value={isActive ? "Sim" : "Não"} />
          </View>
        ) : (
          <View style={item_style._.Content}>
            <Field text='ID: ' value={_id} />
            <Field text='N° ANTT: ' value={numANTT} />
            <Field text='Placa: ' value={plateNumber} />
            <View style={item_style._.divide} />
            <Field text='Ano: ' value={year} />
            <Field text='Proprietário: ' value={owner} />
            <View style={item_style._.divide} />
            <Field text='Expiração Opentech: ' value={expireOpentech} />
            <Field text='Expiração ANTT: ' value={expireANTT} />
            <View style={item_style._.divide} />
  
            <Field text='Ativo: ' value={isActive ? "Sim" : "Não"} />
            <Field text='Enviado para o Buonny: ' value={isSendForBuonny ? "Sim" : "Não"} />

            <View style={item_style._.divide} />
            
            <View style={{ margin: 10 }}>
              <Button onClick={() => update()}>Atualizar</Button>
            </View>
          </View>
        )
        }
      </>
    )
  }

  const render = () => {
    if (content.namePilot != undefined) return renderPilot(content);
    if (content.nameHelper != undefined) return renderHelper(content);
    if (content.plateNumber != undefined) return renderVehicle(content);
  }


  const toggleDetail = () => {
    setDetail(!detail)
  }

  const confirmDelete = () => {

    const delet = () => {
      API.deleteRequest(`${delete_route}/${ID}`, {},{}).then((response) => {

        console.log(`Delete log ${response}`)

        reloadList();

        Alert.alert(
          `Resultado`,
          response,
          [
            {
              text: "OK"
            }
          ]
        )
      });

    }

    Alert.alert(
      `Deseja deletar ${name}?`,
      `Esse documento não poderá ser recuperado!`,
      [
        {
          text: "Deletar",
          onPress: () => delet(),
        },
        {
          text: "cancelar",
          onPress: () => {return null},
        }
      ]
    )
  }

  return (
    <>
      <View style={item_style._.Container}>

        <View style={item_style._.Header}>

          <TouchableOpacity style={item_style._.Section} onPress={() => toggleDetail()}>
            <Image source={updateIcon} style={item_style.driver_style.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={{ ...item_style._.Section }} onPress={() => confirmDelete()}>
            <Image source={closeIcon} style={item_style.driver_style.icon} />
          </TouchableOpacity>

        </View>

        {render()}

      </View>
    </>
  )
}

const mapStateToProps = state => (
  {
    user: state.User.logged_user,
    app_theme: state.app_config.app_theme
  })

const mapDispatchToProps = dispatch => (
  bindActionCreators(documents_actions, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DocItem);
