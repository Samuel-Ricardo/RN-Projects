import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, Text, Alert, Image, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import { connect } from 'react-redux';

import * as API from '../../Services/API/API'

import SearchingIcon from '../../image/svg/SearchingIcon'
import Button from '../../Components/Button'
import Form from '../Form'

import getItemUpdateStyle from './ItemUpdaterStyle'
import Item from '../../Components/Item';
import SearchBar from '../../Components/SearchBar';
import TextField from '../../Components/FormFields/TextField';
import InfoField from '../../Components/FormFields/InfoField';


const ItemUpdaterScreen = (props) => {

  const {
    navigation,
    route,

    app_theme,

  } = props

  const main_style = getItemUpdateStyle(app_theme)

  const LoadScreen = (text) => {

    return (
      <View style={{ alignItems: 'center', marginTop: -15 }}>
        <Text style={main_style.StyledTitle}>{text}</Text>
        <SearchingIcon width={300} height={400} />
      </View>
    )
  }



  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(undefined)
  const [search, setSearch] = useState('')
  const [allItems, setAllItems] = useState([])

  const [name, setName] = useState('')
  const [value, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [size, setSize] = useState('')
  const [image_url, setImageUrl] = useState('')

  const filter = (find) => {

    setSearch(find)

    if (find === '') {

      setItems(allItems)

      return items
    }

    if (Array.isArray(allItems)) {

      let filtered_array = []

      for (let i = 0; i !== allItems.length; ++i) {

        if (allItems[i].name.toLowerCase().includes(find.toLowerCase())) {

          filtered_array.push(allItems[i])
        }
      }

      setItems(filtered_array)
    }
  }

  const loadItems = async (name) => {

    setSelectedItem(undefined)

    const request = await API.getRequest('list/items', {}, {})

    console.log("request data")
    console.log(request)

    setItems(request)

    console.log("items")
    console.log(items)

    setAllItems(request)

    console.log("items  au it")
    console.log(allItems)
    if (name) {

      filter(name)
    }
  }

  const loadSelectedItem = () => {

    if (selectedItem !== undefined) {

      setName(selectedItem.name)
      setImageUrl(selectedItem.image_url)
      setPrice(selectedItem.value+'')
      setSize(selectedItem.size)
      setStock(selectedItem.stock+'')
    }
  }

  useEffect(() => {

    loadItems()
  }, [])

  useEffect(() => {

    loadSelectedItem()
}, [selectedItem])


  const select = (item) => {

    setSelectedItem(item)
  }

  const updateItem = async () => {

    Alert.alert('Atualizando o Produto: ' + selectedItem.name, 'Aguarde um Instante...')

    const response = await API.postRequest('update/item', {
       itemId: selectedItem._id,
       name: name,
       value: value,
       img_url: image_url,
       size: size,
      }, {})

    const stock_response = await API.postRequest('add/stock',{
      id: selectedItem._id,
      stock: parseInt(stock),
    },{})

    console.log('Atualizado response')
    console.log(response)

    Alert.alert('Atualizando com Sucesso', '', [{ text: "Ok" }])

    loadItems()
  }

  return (

    <View>

      <View>

        <SearchBar
          value={search}
          onChangeText={(text) => (filter(text))}
          onButtonPress={() => loadItems(search)}
        >

          <Button
            style_button={{ marginLeft: 5, marginRight: 5, backgroundColor: '#FFFF' }}
            style_font={{ color: '#0085ff' }}
            onClick={() => loadItems()}
          >Todos Produtos</Button>

          <Button
            style_button={{ marginLeft: 5, marginRight: 5, backgroundColor: '#FFFF' }}
            style_font={{ color: '#0085ff' }}
            onClick={() => navigation.navigate('Config')}
          >Voltar</Button>

        </SearchBar>

      </View>

      <ScrollView style={{
        maxHeight: main_style.ScreenHeight - 245,
        marginBottom: 20
      }}>

        <View >

          {
            selectedItem === undefined
              ?
              <>
                {
                  items.length > 0
                    ?
                    items.map((item_data, key) => {

                      return (
                        <Item
                          id={item_data._id}
                          key={key}

                          onClick={() => select(item_data)}
                          buttonText='+'

                          name={item_data.name}
                          image_url={item_data.image_url}

                          stock={item_data.stock}
                          size={item_data.size}
                          value={item_data.value}

                          favoritedBy={item_data.favoritedBy}
                        />
                      )
                    }
                    )

                    :

                    LoadScreen("Em Busca de Produtos Pra Você")
                }

              </>

              :
              <>

                <View style={main_style.form_area}>

                  <InfoField
                    title='ID: '
                  >
                    {selectedItem._id}
                  </InfoField>

                  <TextField
                    title='Nome'
                    style={{ marginBottom: 20, marginTop: 20 }}
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

                <View style={main_style.ButtonGroup}>
                  <Button
                    onClick={() => {
                      return loadItems()
                    }}
                    style_button={
                      {
                        ...main_style.Button,
                        marginLeft: 10,
                        marginRight: 0,
                      }
                    }
                  >
                    Cancelar
            </Button>

                  <Button
                    onClick={() => updateItem()}
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
                </View>
              </>
          }

        </View>

      </ScrollView>
    </View>
  )
}


const mapStateToProps = state => ({

  app_theme: state.app_config.app_theme,

})


export default connect(mapStateToProps)(ItemUpdaterScreen);
