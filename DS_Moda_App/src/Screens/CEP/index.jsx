import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, Text, Alert, Image, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import * as Linking from 'expo-linking';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import * as MediaLibrary from "expo-media-library"
import * as Sharing from 'expo-sharing';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as cart_actions from '../../../Store/Actions/ShoppingCart'

import * as API from '../../Services/API/API'

import Link from '../../Components/Link';
import ShoppingCartIcon from '../../image/icon/ShoppingCartIcon'
import MapIcon from '../../image/icon/MapIcon'
import Button from '../../Components/Button'
import TextField from '../../Components/FormFields/TextField'
import Form from '../Form'

import getCepStyle from './CepStyle'
import InfoField from '../../Components/FormFields/InfoField';


const CEPScreen = (props) => {

  const {
    navigation,
    route,
    user,

    app_theme,
    cart,

    updateCart,
    updateCepData,

    title,
    subTitle,
    paragraph,

    formTitle,
    form_fields,
    description,

    buttons
  } = props

  const main_style = getCepStyle(app_theme)

  const [cepText, setCep] = useState('')
  const [house_number, setHouse_number] = useState('')
  const [observation, setObs] = useState('')

  const [cepData, setCepData] = useState({
    bairro: '',
    cep: "",
    complemento: "",
    ddd: '',
    gia: '',
    ibge: '',
    localidade: "",
    logradouro: "",
    siafi: "",
    uf: "",
  })
  const [frete, setFrete] = useState({})

  const [isChecked, setChecked] = useState(false)
  const [isValid, setIsValid] = useState(false)

  const openBuscaCep = () => {

    Linking.openURL('https://buscacepinter.correios.com.br/app/endereco/index.php')
  }

  const checkCep = async () => {

    const response = await API.postRequest('cep', { cep: cepText }, {})

    console.log('CEP Response')
    console.log(response.result)


    if (response.MsgErro || response.result.erro === true) {

      setIsValid(false)

      Alert.alert('Cep não encontrado', '', [{ text: 'Ok' }])
    } else {

      setIsValid(true)
      setCepData(response.result)

      const freteData = await calcFrete()

      let items_value = 0.00

      for (var i = 0; i < cart.items.length; ++i) {

        items_value += cart.items[i].value
      }

      const total_value = items_value + parseFloat(cart.frete_data.valor)

      const purchase_data = {
        ...cart,
        cep_data: {
          ...response.result,
          observation,
          house_number
        },
        frete_data: {
          ...freteData
        },

        user: user,

        total_value,

      }

      updateCart(purchase_data)

    }
  }

  const calcFrete = async () => {

    Alert.alert('Calculando o frete', 'Espere um estante...', [])

    const response = await API.postRequest('frete', {
      cep: cepText
    }, {})

    console.log("frete response")
    console.log(response[0])

    setFrete(response[0])

    Alert.alert('Frete Calculado', ':)', [{ text: 'OK' }])

    return response[0]
  }

  const checkStock = () => {

    for (var i = 0; i < cart.items.length; ++i) {

      if (cart.items[i].stock <= 0) {

        Alert.alert(
          'A Compra não pode ser realizada',
          'O estoque do' + cart.items[i].name + ' esgotou :/',
          [{ text: "OK" }]
        )
      }
    }

    return price
  }

  const buy = async () => {

    if (house_number.length <= 0) {

      return Alert.alert('Ops...', 'Você não digitou o número da casa', [{ text: 'OK' }])
    }

    for (var i = 0; i < cart.items.length; ++i) {

      if (cart.items[i].stock <= 0) {

        return Alert.alert(
          'A Compra não pode ser realizada',
          'O estoque do' + cart.items[i].name + ' esgotou :/',
          [{ text: "OK" }]
        )
      }
    }

    let items_value = 0.00

    for (var i = 0; i < cart.items.length; ++i) {

      items_value += cart.items[i].value
    }

    const total_value = items_value + parseFloat(cart.frete_data.valor)

    const purchase_data = {
      ...cart,
      cep_data: {
        ...cepData,
        observation,
        house_number
      },
      frete_data: {
        ...frete
      },

      user,

      total_value,

    }

    const response = API.postRequest('purchase', {

      ...purchase_data,

      itemsId: purchase_data.items,
      userId: purchase_data.user._id,

      paymentMethod: '',
    }, {})

    console.log('purchase response')
    console.log(response)

    updateCart(purchase_data)

    const getItemsPrice = () => {

      let price = 0.00

      for (var i = 0; i < cart.items.length; ++i) {

        price += cart.items[i].value
      }

      return price
    }

    const loadItems = (item, key) => {

      return `
    <div class="item" key=${key}>

    <div class="image">
      <img src="${item.image_url}" alt="" srcset="">
    </div>


    <div class="item-data">

      <div class='line'>
        <p class="name">
          ${item.name}
        </p>
      </div>

      <div class='line'>
        <p class="stock">
          Estoque: ${item.stock}
        </p>

        <p class="size">
         Tamanho: ${item.size}
        </p>
      </div>

      <div class='line'>
        <p class="price">
          R$ ${item.value}
        </p>
      </div>
    </div>
  </div>
    `
    }

    const htmlContent = `
  <!DOCTYPE html>
  <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <title>Dados de Compra</title>

      <style>
          body {
            font-size: 16px;
            color: #0085ff;
            padding: 20;

            font-family: Arial, Helvetica, sans-serif;

            /* max-width: 595pt; */
          }

          h1 {
            font-size: 24pt;
            font-weight: bolder;
          }

          h2 {
            font-size: 20pt;
            font-weight: bolder;
          }

          h3 {
            font-size: 18pt;
            font-weight: bolder;
          }

          .text-center{
            text-align: center;
          }

          .item, .item-data, .item-list, .addres-data{

            display: flex;
            flex:1;
          }

          .item-list, .addres-data {

            box-shadow: 7px 7px 3px rgba(0, 0, 0, 0.8);
          }

          .item-list, .addres-data{

            border-style: solid;
            border-width: 5pt;
            border-radius: 20pt;
          }

          .item-list, .addres-data{
            flex-direction: column;

            padding: 20px;

            margin-bottom: 20pt;

          }

          .item{

            flex-direction: row;

            border-style: solid;
            border-width: 3px;
            border-color: #0085ff;
            border-radius: 20px;

            padding: 20px;

            margin-bottom: 20pt;
          }

          .image {
            padding: 2;

            padding-right: 20px;

            border-style: solid;
            border-width: 0;
            border-right-width: 5px;
            border-color: #0085ff;
          }

          img {
            border-radius: 10%;
            max-width: 150px;
          }

          .item-data {

            margin-left: 20pt;

            flex-direction: column;
          }

          .line {

            display: flex;
            flex-direction: row;

            justify-content: space-between;

            margin-bottom: auto;
          }

          .name, .price, .stock, .size {

            font-weight: bolder;
            font-size: 16px;
          }

          .cep-data, .frete-data {
            border-style: solid;
            border-width: 3pt;
            border-radius: 20pt;

            padding: 20;
          }

          .info{

            margin: 20pt;
            margin-bottom: 0pt;

            border-radius: 20pt;
            border-width: 0;
            border-style: none;



            display: flex;
            flex: 1;
            flex-direction: column;
          }

          .info h3 {

            margin-top: 0;
          }

          .info p{

            margin-top: 0;
            margin-left: 10pt;
            font-weight: bold;
          }

          .info-container{

            margin: 20pt;
            margin-bottom: 20pt;
          }

      </style>
    </head>

    <body>

      <h1 class="text-center">Dados da Compra</h1>

      <h2>Carrinho: </h2>

      <div class="item-list">

        ${cart.items.map((item, key) => {

      return loadItems(item, key)
    })}

      </div>

      </div>

      <h2>Endereço: </h2>

      <div class="addres-data">

        <h2>Dados do CEP: </h2>

        <div class="cep-data">

          <div class="info">
            <h3>Logadouro: </h3>
            <p>${cart.cep_data.logradouro}</p>
          </div>

          <div class="info">
            <h3>Localidade: </h3>
            <p>${cart.cep_data.localidade}</p>
          </div>

          <div class="info">
            <h3>Bairro: </h3>
            <p>${cart.cep_data.bairro}</p>
          </div>

          <div class="info">
            <h3>UF: </h3>
            <p>${cart.cep_data.uf}</p>
          </div>

        <div class="info">
          <h3>Número da casa: </h3>
          <p>${house_number}</p>
        </div>

        <div class="info">
          <h3>Observações: </h3>
          <p>${observation}</p>
        </div>

          <div class="info">
            <h3>CEP: </h3>
            <p>${cart.cep_data.cep}</p>
          </div>

          <div class="info">
            <h3>DDD: </h3>
            <p>${cart.cep_data.ddd}</p>
          </div>

        </div>

        <h2>Dados do Frete: </h2>

        <div class="frete-data">

          <div class="info">
            <h3>Frete: </h3>
            <p>R$ ${cart.frete_data.valor}</p>
          </div>

          <div class="info">
            <h3>Prazo Estimado: </h3>
            <p>${cart.frete_data.prazoEntrega} Dias</p>
          </div>

          <div class="info">
            <h3>Agência de Entrega: </h3>
            <p>${cart.frete_data.name}</p>
          </div>

          <div class="info">
            <h3>Entrega em Dias de Sábado: </h3>
            <p>${cart.frete_data.entregaSabado === 'N' ? 'Não' : "Sim"}</p>
          </div>

          <div class="info">
            <h3>Entrega a Domicílio: </h3>
            <p>${cart.frete_data.entregaDomiciliar === 'N' ? 'Não' : "Sim"}</p>
          </div>

        </div>

      </div>

      <h2>Dados do Comprador: </h2>

        <div class="addres-data">

          <div class="info-user">
            <h3>Nome: </h3>
            <p>${user.name}</p>
          </div>

          <div class="info-user">
            <h3>Email: </h3>
            <p>${user.email}</p>
          </div>

          <div class="info-user">
            <h3>Celular: </h3>
            <p>${user.number === undefined
        ?
        'Sem Número'
        :
        user.number
      }</p>
          </div>

        </div>
        </div>

      <h2>Dados de Pagamento: </h2>

        <div class='info'>
          <p> Realize a Transderencia do valor total no seu aplicativo de pagamentos ou banco favorito. </p>
        </div>

        <div class="cep-data">

          <div class="cep-data info-container">
            <div class='info'>
              <h3> Valor a ser Pago </h3>
            </div>

            <div class="info">
              <h3>Produtos: </h3>
              <p>R$ ${getItemsPrice()}</p>
            </div>

            <div class="info">
              <h3>Frete: </h3>
              <p>R$ ${cart.frete_data.valor}</p>
            </div>

            <div class="info">
              <h3>Valor Total: </h3>
              <p>R$ ${cart.total_value}</p>
            </div>
          </div>

          <div class="cep-data info-container">
            <div class='info'>
              <h3> Pix </h3>
            </div>

            <div class="info">
              <h3>CNPJ: </h3>
              <p>4002-8922</p>
            </div>
          </div>

          <div class="cep-data info-container">
            <div class='info'>
              <h3> Dados Bancários </h3>
            </div>

            <div class="info">
              <h3>Agéncia: </h3>
              <p>4002 - Bom dia e Companhia</p>
            </div>
          </div>

        </div>

      </div>

    </body>

  </html>
`;

    const createPDF = async (html) => {
      try {
        const { uri } = await Print.printToFileAsync({ html });
        return uri;


      } catch (err) {
        console.log('')
        console.log('erro pdf')
        console.error(err);
      }
    };


    API.postRequest('', {}, {})


    const pdf = await createPDF(htmlContent)
    console.log('')
    console.log('pdf resuolti')
    console.log(pdf)

    try {



      const permission = await MediaLibrary.requestPermissionsAsync();

      if (permission.granted) {

        const save_photo = await MediaLibrary.createAssetAsync(pdf);
        console.log('')
        console.log('save photo')
        console.log('')
        console.log(save_photo)

        const share_result = await Sharing.shareAsync(save_photo.uri)

        console.log('')
        console.log('Share result')
        console.log('')
        console.log(share_result)

        Alert.alert('A Compra foi Registrada', 'A compra foi registrada no seu Histórico, use o PDF gerado que você compartilhou para pagar', [{ text: "OK" }])

        // View File

        //   const file = await FileSystem.getContentUriAsync(save_photo.uri)

        //   console.log('')
        //   console.log('file result')
        //   console.log('')
        //  console.log(file)

        //   IntentLauncher.startActivityAsync( 'android.intent.action.VIEW' , {
        //       data: save_photo.uri,
        //       flags: 1,
        //       type: 'application/pdf'
        //    });


      }

    } catch (error) {
      console.error(error);
    }




    // Linking.openURL(pdf)
    // navigation.navigate('')
  }

  return (

    <Form style={main_style}

      fill={true}

      title='Entregador'
      subTitle={
        <>
          <View style={main_style.icon_background}>
            <MapIcon width={100} height={100} />
          </View>
        </>
      }
      paragraph='Lembre-se de Checar o CEP, só depois de confirmar o CEP a compra poderá ser feita'

      formTitle='Pra Onde Vai o Produto?'

      form_fields={


        <View style={{ flex: 1 }}>

          <View style={{ flexDirection: 'row', marginBottom: 20, }}>
            <TextField
              title="Cep"
              placeholder='Digite o CEP do Endereço de destino...'

              onChangeText={text => setCep(text)}
              value={cepText}

              button={true}
            // buttonText='Checar'
            // onPress={() => checkCep()}
            />

            <Button
              onClick={() => checkCep()}
              style_button={
                {
                  ...main_style.Button,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                  paddingLeft: 10,
                  paddingRigth: -3,
                }
              }
            >
              Checar
            </Button>
          </View>

          <Link
            background_style={{ marginBottom: 20 }}
            onClick={() => openBuscaCep()}
          >
            Não Sabe Seu Cep? Clique aqui
          </Link>

          <View >
            {
              isValid === true
                ?
                <View style={main_style.Container}>

                  <Text style={
                    {
                      ...main_style.StyledTitle,
                      marginBottom: 20,
                    }}>
                    Confirme os Dados e Verifique se a Localização esta Correta
                  </Text>

                  <View style={{
                    marginTop: 10,
                    marginBottom: 20,
                    backgroundColor: app_theme.default_background,
                    height: 10,

                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,

                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10
                  }} />

                  <InfoField
                    title='Logadouro'
                    children={cepData.logradouro}
                  />

                  <View style={{ marginBottom: 20, }} />

                  <InfoField
                    title='Localidade'
                    children={cepData.localidade}
                  />

                  <View style={{ marginBottom: 20, }} />

                  <InfoField
                    title='Bairro'
                    children={cepData.bairro}
                  />

                  <View style={{ marginBottom: 20, }} />

                  <InfoField
                    title='UF'
                    children={cepData.uf}
                  />

                  <View style={{ marginBottom: 20, }} />

                  <InfoField
                    title='CEP'
                    children={cepData.cep}
                  />

                  <View style={{ marginBottom: 20, }} />

                  <InfoField
                    title='DDD'
                    children={cepData.ddd}
                  />

                  <View style={{
                    marginTop: 15,
                    marginBottom: 15,
                    backgroundColor: app_theme.default_background,
                    height: 10,

                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,

                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10
                  }} />

                  <InfoField
                    title='Frete'
                    children={'R$ ' + frete.valor}
                  />

                  <View style={{ marginBottom: 20, }} />

                  <InfoField
                    title='Prazo Estimado'
                    children={frete.prazoEntrega + ' Dias'}
                  />

                  <View style={{ marginBottom: 20, }} />

                  <InfoField
                    title='Agência de Entrega'
                    children={frete.name}
                  />

                  <View style={{ marginBottom: 20, }} />

                  <InfoField
                    title='Entrega em Dias de Sábado'
                    children={frete.entregaSabado === 'N' ? 'Não' : "Sim"}
                  />

                  <View style={{ marginBottom: 20, }} />

                  <InfoField
                    title='Entrega a Domicílio'
                    children={frete.entregaDomiciliar === 'N' ? 'Não' : "Sim"}
                  />

                  <View style={{
                    marginTop: 20,
                    marginBottom: -20,
                    backgroundColor: app_theme.default_background,
                    height: 10,

                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,

                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10
                  }} />

                  <View style={{ marginBottom: 20, }} />

                  <View style={{ marginTop: 30, flexDirection: 'row', ...main_style.ButtonGroup }}>
                    <Button
                      onClick={() => {
                        setIsValid(false)
                        setChecked(false)
                      }}

                      style_button={
                        {
                          ...main_style.Button,
                          marginLeft: 10,
                          marginRight: 0,
                        }
                      }
                    >
                      Não
                  </Button>

                    <Button
                      onClick={() => {
                        setIsValid(true)
                        setChecked(true)
                      }}

                      style_button={
                        {
                          ...main_style.Button,
                          marginLeft: 0,
                          marginRight: 10,
                        }
                      }
                    >
                      Confirmar
                    </Button>
                  </View>

                </View>
                :
                <></>
            }
          </View>

          <TextField
            title="Numero da Casa:"
            placeholder='Ex.: 270 C / 61 ...'

            onChangeText={text => setHouse_number(text)}
            value={house_number}

            button={true}
          />

          <TextField
            title="Complemento / Observação:"
            placeholder='Digite informações extra que ajude a localização...'

            onChangeText={text => setObs(text)}
            value={observation}

            button={true}
          />

        </View>


      }

      description={
        <View style={{ flexDirection: 'column', flex: 1, maxWidth: main_style.ScreenWidth - 40 }}>

          <View style={{ marginBottom: 20 }}>

            <Text style={{
              ...main_style.Link,
              textAlign: 'justify',
              fontWeight: 'bold'
            }}>

              Valor a ser pago: {cart.total_value}
            </Text>

          </View>

          <View style={{ marginBottom: -20 }}>

            <Text style={{
              ...main_style.Link,
              textAlign: 'justify'
            }}>

            </Text>

          </View>

          <Text style={{
            ...main_style.Link,
            textAlign: 'justify'
          }}>

            Vai Ser Gerado um PDF, ele é seu comprovante, envie para o Whatssap da empresa (54) 4002-8922, ou salve no seu dispositivo, dentro dele haverá instruções para realizar o pagamento.

          </Text>

        </View>
      }

      buttons={
        <>
          <Button
            onClick={() => navigation.navigate('Car')}
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

          {
            isChecked === true
              ?
              <Button
                onClick={() => {
                  if (cart.items.length > 0) {

                    return buy();
                  } else {

                    return Alert.alert('Sem Produtos no Carrinho', '', [{ text: 'Ok' }])
                  }
                }}
                style_button={
                  {
                    ...main_style.Button,
                    marginLeft: 0,
                    marginRight: 10,
                  }
                }
              >
                Compar
            </Button>
              :
              <></>
          }
        </>
      }
    />
  )
}


const mapStateToProps = state => ({

  app_theme: state.app_config.app_theme,

  user: state.User.loggedUser,
  cart: state.shopping_cart,

})

const mapDispatchToProps = dispatch => (

  bindActionCreators(cart_actions, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(CEPScreen);
