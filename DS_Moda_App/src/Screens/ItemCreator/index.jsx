import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, Text, Alert, Image, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import { connect } from 'react-redux';

import * as API from '../../Services/API/API'

import Link from '../../Components/Link';
import ShoppingCartIcon from '../../image/icon/ShoppingCartIcon'
import Button from '../../Components/Button'
import Form from '../Form'

import getItemUpdaterStyle from './ItemCreatorStyle'
import TextField from '../../Components/FormFields/TextField';

const ItemCreatorScreen = (props) => {

  const {
    navigation,
    route,

    app_theme,
  } = props

  const main_style = getItemUpdaterStyle(app_theme)

  const [name, setName] = useState('')
  const [value, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [size, setSize] = useState('')
  const [image_url, setImageUrl] = useState('')

  const create = () => {

    const price = parseFloat(value)
    setPrice(price)
    const estoque = parseInt(stock)
    setStock(estoque)

    const form_data = {
      name,
      value: price,
      stock: estoque,
      size,
      image_url
    }

    const response = API.postRequest('add/items',form_data,{})

    console.log('create item response')
    console.log(response)

    if (response) {
      Alert.alert('Criado', 'Item Criado com Sucesso', [{text: "OK"}])
    } else {
      Alert.alert('Ops...', 'Erro ao Criar o Item', [{text: "OK"}])
    }
  }


  return (

    <Form style={main_style}

      fill={false}

      title='Criador'
      subTitle={
        <>
          <View style={main_style.icon_background}>
            <ShoppingCartIcon width={100} height={100} />
          </View>
        </>
      }
      paragraph=''

      formTitle='Produto'

      form_fields={

        <View style={{ flex: 1 }}>

          <TextField
            title='Nome'
            style={{ marginBottom: 20 }}
            placeholder="Nome do Produto..."
            onChangeText={nameText => setName(nameText)}
            value={name}
          />

          <TextField
            title='Preço'
            style={{ marginBottom: 20 }}
            placeholder="Ex.: 35.25"
            onChangeText={priceText => setPrice(priceText)}
            value={value}
          />

          <TextField
            title='Estoque'
            style={{ marginBottom: 20 }}
            placeholder="Quantidade Produto..."
            onChangeText={stockText => setStock(stockText)}
            value={stock}
          />

          <TextField
            title='Tamanho'
            style={{ marginBottom: 20 }}
            placeholder="G / M / P / PP..."
            onChangeText={sizeText => setSize(sizeText)}
            value={size}
          />

          <TextField
            title='URL da Imagem'
            style={{ marginBottom: 0 }}
            placeholder="http://..."
            onChangeText={urlText => setImageUrl(urlText)}
            value={image_url}
          />

        </View>
      }

      description={
        ''
      }

      buttons={
        <>
          <Button
            onClick={() => {
              return navigation.navigate('Config')
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

          <Button
            onClick={() => create()}
            style_button={
              {
                ...main_style.Button,
                marginLeft: 0,
                marginRight: 10,
              }
            }
          >
            Criar
            </Button>
        </>
      }
    />
  )
}


const mapStateToProps = state => ({

  app_theme: state.app_config.app_theme,

})

export default connect(mapStateToProps)(ItemCreatorScreen);
