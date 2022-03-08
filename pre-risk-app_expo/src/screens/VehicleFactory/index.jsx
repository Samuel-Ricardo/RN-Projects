import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, Alert, TextInput, Image } from 'react-native'

import Form from '../Form';
import Button from '../../component/Button'

import { connect } from "react-redux"
import { bindActionCreators } from 'redux';
import * as documents_actions from '../../../Store/actions/Documents';

import MaskInput , { Masks } from 'react-native-mask-input';

import MaskedText from 'react-native-masked-text'

import * as API from '../../server/API'

import getVehicleFactoryStyle from './vehicle_style.js'

import ReactInputDateMask from 'react-input-date-mask';

//import Header from '../../component/Header'

import ToggleButton from '../../component/ToggleButton';

import { MaskedTextInput } from "react-native-mask-text";

import Observation from '../../component/Observation';



const VehicleFactoryScreen = ({
  navigation,
  app_theme,

  user,
  vehicle,

  removeVehicle,
}) => {

  const [year, setYear] = useState('');
  const [owner, setOwner] = useState('');
  const [numANTT, setNumANTT] = useState('');
  const [expireANTT, setExpireANTT] = useState('');
  const [opentechExpiresDate, setOpentechExpiresDate] = useState('');

  const [plateNumber, setPlateNumber] = useState('')

  const [isSendForBuonny, setIsSendForBuonny] = useState(true);
  const [isActive, setActive] = useState(true);



  const [title, setTitle] = useState(vehicle != null ? 'Atualizar' : 'Cadastro');


  const loadData = () => {

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

    setOwner(owner)
    setYear(year);
    setOpentechExpiresDate(expireOpentech);
    setExpireANTT(expireANTT);
    setNumANTT(numANTT);
    setIsSendForBuonny(isSendForBuonny);
    setActive(isActive);
    setPlateNumber(plateNumber)
  }


  const VEHICLE_STYLE = getVehicleFactoryStyle(app_theme)

  const cancel = () => {
    removeVehicle();
    navigation.navigate('factory-menu');
  }

  const save = async () => {

    Alert.alert(
      `Salvando`,
      `aguarde...`, 
    )

    console.log("SAVE");

    const ANTT = new Date(expireANTT);
    const opentech = new Date(opentechExpiresDate);

    const body = {
      addBy: user._id,
      year: year,
      numANTT: numANTT,
      expireANTT: expireANTT,
      expireOpentech: opentechExpiresDate,
      isSendForBuonny: isSendForBuonny,
      isActive: isActive,
      plateNumber: plateNumber,
      owner: owner
    };

    const response = await API.postRequest('add/car', body, {});

    const message = response.error ? "Erro x-x" : "Sucesso"

    Alert.alert(
      message + " - Status: " + response.status,
      response.message,
      [
        {
          text: "OK",
        }
      ]
    )
  }

  const update = async () => {

    Alert.alert(
      `Salvando`,
      `aguarde...`,
    )

    const ANTT = new Date(expireANTT);
    const opentech = new Date(opentechExpiresDate);

    const body = {
      addBy: user._id,
      _id: vehicle._id,
      year: year,
      numANTT: numANTT,
      isActive: isActive,
      expireANTT: expireANTT,
      expireOpentech: opentechExpiresDate,
      isSendForBuonny: isSendForBuonny,
      plateNumber: plateNumber,
      owner: owner
    };

    const response = await API.postRequest("update/docs",{ document: { ...body }}, {});
 
    Alert.alert(
      `Resultado - ${response.status}`,
      response.data.message,
      [
        {
          text: "OK"
        }
      ]
    )
  }

  useEffect(() => {

    setTitle(vehicle != null ? 'Atualizar' : 'Cadastro');

    if (vehicle != null) loadData();

    return;
  }, []);



  return (
    <>
      <View style={VEHICLE_STYLE.Container}>

        <Form

          style={VEHICLE_STYLE}

          title={title + " de Veículos"}
          subTitle={
            <View style={VEHICLE_STYLE.icon_background}>
              <Image source={require('../../assets/hatchback.png')} style={VEHICLE_STYLE.icon} />
            </View>
          }

          formTitle={title}

          form_fields={
            <>
            
            <TextInput
                style={VEHICLE_STYLE.TextInput}
                placeholder="Digite o nome"
                onChangeText={text => setOwner(text)}
                value={owner}
              />
              
              <MaskedTextInput
                mask="999999999"
                onChangeText={(text, rawText) => setNumANTT(text)}
                value={numANTT}
                keyboardType='numeric'
                secureTextEntry={false}
                style={VEHICLE_STYLE.TextInput}
                placeholder="Digite o número ANTT"
              />
              
              {vehicle && <Observation>{vehicle.numANTT}</Observation>}

              <MaskInput
                style={VEHICLE_STYLE.TextInput}
                placeholder="Digite a placa do veículo"
                value={plateNumber}
                keyboardType='default'
                secureTextEntry={false}
                onChangeText={setPlateNumber}
                // mask="AAA-9A99"
                mask = {Masks.BRL_CAR_PLATE}
              />
              
              {vehicle && <Observation>{vehicle.plateNumber}</Observation>}

              {/* <TextInputMask
      refInput={(ref) => this.myDateText = ref;}
      type={'datetime'}
      options={{
        format: 'DD-MM-YYYY HH:mm:ss'
      }}
    /> */}

              <MaskInput
                style={VEHICLE_STYLE.TextInput}
                placeholder="Digite a Data de expiração do documento ANTT"
                value={expireANTT}
                keyboardType='numeric'
                secureTextEntry={false}
                mask = {Masks.DATE_DDMMYYYY}
                //onChangeText={(text, rawText) => setExpireANTT(text)}
                onChangeText={setExpireANTT}
                
              />
              
              {vehicle && <Observation>{vehicle.expireANTT}</Observation>}

              <MaskInput
                style={VEHICLE_STYLE.TextInput}
                placeholder="Digite a Data do Documento"
                value={year}
                keyboardType='numeric'
                secureTextEntry={false}
                mask = {Masks.DATE_DDMMYYYY}
                //onChangeText={(text, rawText) => setYear(text)}
                onChangeText={setYear}
              />
              
              {vehicle && <Observation>{vehicle.year}</Observation>}


              <MaskInput
                style={VEHICLE_STYLE.TextInput}
                placeholder="Digite a Data de Expiração Opentech"
                value={opentechExpiresDate}
                keyboardType='numeric'
                secureTextEntry={false}
                mask = {Masks.DATE_DDMMYYYY}
                //onChangeText={(text, rawText) => setOpentechExpiresDate(text)}
                onChangeText={setOpentechExpiresDate}
              />
              
              {vehicle && <Observation>{vehicle.expireOpentech}</Observation>}

              <View style={{ marginTop: 25 }}>
                <ToggleButton
                  isActive={isSendForBuonny}
                  setActive={setIsSendForBuonny}
                  app_theme={app_theme}
                >
                  {isSendForBuonny ? `Enviado por Buonny` : `Não enviado por Buonny`}
                </ToggleButton>
              </View>

              <View style={{ marginTop: 25 }}>
                <ToggleButton
                  isActive={isActive}
                  setActive={setActive}
                  app_theme={app_theme}
                >
                  {isActive ? `Ativo` : `Inativo`}
                </ToggleButton>
              </View>
            </>
          }


          buttons={
            <>
              <Button
                onClick={() => cancel()}
                style_button={
                  {
                    ...VEHICLE_STYLE.Button,
                    marginLeft: 10,
                    marginRight: 0,
                  }
                }
              >
                Cancelar
              </Button>

              <Button
                onClick={() => vehicle == null ? save() : update()}
                style_button={
                  {
                    ...VEHICLE_STYLE.Button,
                    marginLeft: 0,
                    marginRight: 10,
                  }
                }
              >
                Salvar
              </Button>
            </>
          }
        />

      </View>
    </>
  )
}


const mapStateToProps = state => (
  {
    user: state.User.logged_user,
    vehicle: state.Documents.vehicle,

    app_theme: state.app_config.app_theme
  })

const mapDispatchToProps = dispatch => (
  bindActionCreators(documents_actions, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(VehicleFactoryScreen);
