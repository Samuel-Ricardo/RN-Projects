import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, Alert, TextInput, Image } from 'react-native'

import { connect } from "react-redux"
import { bindActionCreators } from 'redux';

import * as documents_actions from '../../../Store/actions/Documents';

import * as API from '../../server/API'

import getDriveFactoryStyle from './driver_style'

//import Header from '../../component/Header'
import Button from '../../component/Button'
import DriverCardIcon from '../../icon/DriverCardIcon';

import MaskInput , { Masks } from 'react-native-mask-input';

import Form from '../Form';
import ToggleButton from '../../component/ToggleButton';

import { MaskedTextInput } from "react-native-mask-text";

import Observation from '../../component/Observation'; 


const DriverFactoryScreen = ({
  navigation,
  app_theme,

  user,
  driver,

  removeDriver
}) => {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [CPF, setCPF] = useState('');
  const [expireCNH, setExpireCNH] = useState('');
  const [buonnyExpiresDate, setBuonnyExpiresDate] = useState('');
  const [apisulExpiresDate, setApisulExpiresDate] = useState('');
  const [opentechExpiresDate, setOpentechExpiresDate] = useState('');
  const [title, setTitle] = useState(driver != null ? 'Atualizar' : 'Cadastro');

  const [isActive, setActive] = useState(true);


  const DRIVE_STYLE = getDriveFactoryStyle(app_theme)


  const log = () => {
    console.log('')
    console.log('DRIVERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR')
    console.log(name)
    console.log(phone)
    console.log(CPF)
    console.log(expireCNH)
    console.log(buonnyExpiresDate)
    console.log(apisulExpiresDate)
    console.log(opentechExpiresDate)
    console.log(isActive)
    console.log('')
  }

  const loadData = () => {

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

    setName(namePilot);
    setPhone(telPilot);
    setCPF(cpfPilot);
    setExpireCNH(expireCNH);
    setBuonnyExpiresDate(expireBuonny);
    setApisulExpiresDate(expireApisul);
    setOpentechExpiresDate(expireOpentech);
    setActive(isActive);
  }


  const cancel = () => {
    removeDriver();
    navigation.navigate('factory-menu');
  }

  const save = async () => {

    if(name.length == 0) return alert("Nenhum campo pode estar vazio")
    if(phone.length == 0) return alert("Nenhum campo pode estar vazio")
    if(CPF.length == 0) return alert("Nenhum campo pode estar vazio")
    if(expireCNH.length == 0) return alert("Nenhum campo pode estar vazio")
    if(buonnyExpiresDate.length == 0) return alert("Nenhum campo pode estar vazio")
    if(apisulExpiresDate.length == 0) return alert("Nenhum campo pode estar vazio")
    if(opentechExpiresDate.length == 0) return alert("Nenhum campo pode estar vazio")
    
    Alert.alert(
      `Salvando`,
      `aguarde...`,
    )

    const bounny = new Date(buonnyExpiresDate);
    const apisul = new Date(apisulExpiresDate);
    const opentech = new Date(opentechExpiresDate);

    const body = {
      addBy: user._id,
      namePilot: name,
      telPilot: phone,
      cpfPilot: CPF,
      expireCNH: expireCNH,
      expireBuonny: buonnyExpiresDate,
      expireApisul: apisulExpiresDate,
      expireOpentech: opentechExpiresDate,
      isActive: isActive,
    };

    const response = await API.postRequest('add/docs', body, {});

    const title = response.error ? "Erro x-x" : "Sucesso"

    Alert.alert(
      title + " - Status: " + response.status,
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

    const bounny = new Date(buonnyExpiresDate);
    const apisul = new Date(apisulExpiresDate);
    const opentech = new Date(opentechExpiresDate);

    if(phone.length == 0){
      if(!driver) return alert("Nenhum campo pode estar vazio")
      setPhone(driver.telPilot);
    }

    const body = {
      addBy: user._id,
      _id: driver._id,
      namePilot: name,
      telPilot: phone,
      cpfPilot: CPF,
      expireCNH: expireCNH,
      expireBuonny: buonnyExpiresDate,
      expireApisul: apisulExpiresDate,
      expireOpentech: opentechExpiresDate,
      isActive: isActive,
    };

    const _response = await API.postRequest("update/docs",{ document: { ...body }}, {});
    const response = _response.data;

        Alert.alert(
          `Resultado - ${response.status}`,
          response.message,
          [
            {
              text: "OK"
            }
          ]
        )
  }

  useEffect(() => {

    setTitle(driver != null ? 'Atualizar' : 'Cadastro');

    if (driver != null) loadData();

    return;
  }, []);

  return (
    <>

    {log()}
      <View style={DRIVE_STYLE.Container}>

        <Form

          style={DRIVE_STYLE}

          title={title + " de Pilotos"}
          subTitle={
            <View style={DRIVE_STYLE.icon_background}>
              <Image source={require('../../assets/driver-license.png')} style={DRIVE_STYLE.icon}/>
            </View>
          }

          formTitle={title}

          form_fields={
            <>
              <TextInput
                style={DRIVE_STYLE.TextInput}
                placeholder="Digite o nome"
                onChangeText={text => setName(text)}
                value={name} 
              />

              <MaskedTextInput
                mask="(99) 99999-9999"
                onChangeText={(text, rawText) => setPhone(text)}
                value={phone}
                keyboardType='numeric'
                secureTextEntry={false}
                style={DRIVE_STYLE.TextInput}
                placeholder="Digite o Telefone"

              />

              {driver && <Observation>{driver.telPilot}</Observation>}

              <MaskedTextInput
                style={DRIVE_STYLE.TextInput}
                placeholder="Digite a CPF"
                defaultValue={CPF}
                value={CPF}
                keyboardType='numeric'
                secureTextEntry={false}
                mask="999.999.999-99"
                onChangeText={(text, rawText) => setCPF(text)}
              />
              
              {driver && <Observation>{driver.cpfPilot}</Observation>}
              
              <MaskInput
                style={DRIVE_STYLE.TextInput}
                placeholder="Digite a Data de Expiração CNH"
                defaultValue={expireCNH}
                value={expireCNH}
                keyboardType='numeric'
                secureTextEntry={false}
                mask = {Masks.DATE_DDMMYYYY}
                onChangeText={setExpireCNH}
              />
              
              {driver && <Observation>{driver.expireCNH}</Observation>}

              <MaskInput
                style={DRIVE_STYLE.TextInput}
                placeholder="Digite a Data de Expiração Buonny"
                value={buonnyExpiresDate}
                keyboardType='numeric'
                secureTextEntry={false}
                mask = {Masks.DATE_DDMMYYYY}
                onChangeText={setBuonnyExpiresDate}
              />
              
              {driver && <Observation>{driver.expireBuonny}</Observation>}

              <MaskInput
                style={DRIVE_STYLE.TextInput}
                placeholder="Digite a Data de Expiração Apsiul"
                value={apisulExpiresDate}
                keyboardType='numeric'
                secureTextEntry={false}
                mask = {Masks.DATE_DDMMYYYY}
                onChangeText={setApisulExpiresDate}
              />
              
              {driver && <Observation>{driver.expireApisul}</Observation>}

              <MaskInput
                style={DRIVE_STYLE.TextInput}
                placeholder="Digite a Data de Expiração Opentech"
                value={opentechExpiresDate}
                keyboardType='numeric'
                secureTextEntry={false}
                mask = {Masks.DATE_DDMMYYYY}
                onChangeText={setOpentechExpiresDate}
              />
              
              {driver && <Observation>{driver.expireOpentech}</Observation>}

              <View style={{ marginTop: 25}}>
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
                    ...DRIVE_STYLE.Button,
                    marginLeft: 10,
                    marginRight: 0,
                  }
                }
              >
                Cancelar
              </Button>

              <Button
                onClick={() => {driver == null ? save() : update()}}
                style_button={
                  {
                    ...DRIVE_STYLE.Button,
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
    driver: state.Documents.driver,
    app_theme: state.app_config.app_theme
  }
);

const mapDispatchToProps = dispatch => {
  return bindActionCreators(documents_actions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(DriverFactoryScreen);
