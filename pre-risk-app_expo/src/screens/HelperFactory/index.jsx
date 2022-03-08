import React, {useEffect, useState } from 'react'
import { Text, View, ScrollView, Alert, TextInput, Image } from 'react-native'

import Form from '../Form';
import Button from '../../component/Button';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import * as documents_actions from '../../../Store/actions/Documents';

import * as API from '../../server/API';

import getHelperFactoryStyle from './helper_style';

import MaskInput , { Masks } from 'react-native-mask-input';

//import Header from '../../component/Header'

import ToggleButton from '../../component/ToggleButton';

import { MaskedTextInput } from "react-native-mask-text";

import Observation from '../../component/Observation'; 


const HelperFactoryScreen = ({
  navigation,
  app_theme,

  user,
  helper,

  removeHelper
}) => {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [CPF, setCPF] = useState('');
  const [buonnyExpiresDate, setBuonnyExpiresDate] = useState('');
  const [opentechExpiresDate, setOpentechExpiresDate] = useState('');
  const [title, setTitle] = useState(helper != null ? 'Atualizar' : 'Cadastro');

  const [isActive, setActive] = useState(true);


  const loadData = () => {

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

    setName(nameHelper);
    setPhone(telHelper);
    setCPF(cpfHelper);
    setBuonnyExpiresDate(expireBuonny);
    setOpentechExpiresDate(expireOpentech);
    setActive(isActive);
  }

  const HELPER_STYLE = getHelperFactoryStyle(app_theme)



  const cancel = () => {
    removeHelper();
    navigation.navigate('factory-menu');
  }

  const save = async () => {

    Alert.alert(
      `Salvando`,
      `aguarde...`,
    )

    const bounny = new Date(buonnyExpiresDate);
    const opentech = new Date(opentechExpiresDate);

    const body = {
      nameHelper: name,
      cpfHelper: CPF,
      expireBuonny: buonnyExpiresDate,
      expireOpentech: opentechExpiresDate,
      telHelper: phone,
      isActive: isActive,
      addBy: user._id
    };

    const response = await API.postRequest('add/helper', body, {});

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

    const bounny = new Date(buonnyExpiresDate);
    const opentech = new Date(opentechExpiresDate);

    const body = {
      _id: helper._id,
      nameHelper: name,
      cpfHelper: CPF,
      expireBuonny: buonnyExpiresDate,
      expireOpentech: opentechExpiresDate,
      telHelper: phone,
      isActive: isActive,
      addBy: user._id
    };

    const response = await API.postRequest("update/docs", { document: {...body} }, {});


    Alert.alert(
      `Resultado - ${response.status}`,
      response.data.message,
      [
        {
          text: "OK"
        }
      ]
    )
  };

  useEffect(() => {


    setTitle(helper != null ? 'Atualizar' : 'Cadastro');


    if (helper != null) loadData();

    return;
  }, []);

  return (
    <>
      <View style={HELPER_STYLE.Container}>

        <Form

          style={HELPER_STYLE}

          title={title + " de Ajudantes"}
          subTitle={
            <View style={HELPER_STYLE.icon_background}>
              <Image source={require('../../assets/driver-license.png')} style={HELPER_STYLE.icon} />
            </View>
          }

          formTitle={title}

          form_fields={
            <>
              <TextInput
                style={HELPER_STYLE.TextInput}
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
                style={HELPER_STYLE.TextInput}
                placeholder="Digite o Telefone"

              />
              
              {helper && <Observation>{helper.telHelper}</Observation>}

              <MaskedTextInput
                style={HELPER_STYLE.TextInput}
                placeholder="Digite a CPF"
                value={CPF}
                keyboardType='numeric'
                secureTextEntry={false}
                mask="999.999.999-99"
                onChangeText={(text, rawText) => setCPF(text)}
              />
              
              {helper && <Observation>{helper.cpfHelper}</Observation>}

              <MaskInput
                style={HELPER_STYLE.TextInput}
                placeholder="Digite a Data de Expiração Buonny"
                value={buonnyExpiresDate}
                keyboardType='numeric'
                secureTextEntry={false}
                mask = {Masks.DATE_DDMMYYYY}
                onChangeText={setBuonnyExpiresDate}
              />
              
              {helper && <Observation>{helper.expireBuonny}</Observation>}


              <MaskInput
                style={HELPER_STYLE.TextInput}
                placeholder="Digite a Data de Expiração Opentech"
                value={opentechExpiresDate}
                keyboardType='numeric'
                secureTextEntry={false}
                mask = {Masks.DATE_DDMMYYYY}
                onChangeText={setOpentechExpiresDate}
              />
              
              {helper && <Observation>{helper.expireOpentech}</Observation>}

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
                    ...HELPER_STYLE.Button,
                    marginLeft: 10,
                    marginRight: 0,
                  }
                }
              >
                Cancelar
              </Button>

              <Button
                onClick={() => helper === null ? save() : update()}
                style_button={
                  {
                    ...HELPER_STYLE.Button,
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
    helper: state.Documents.helper,
    app_theme: state.app_config.app_theme
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators(documents_actions, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HelperFactoryScreen);
