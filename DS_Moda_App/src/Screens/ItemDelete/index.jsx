import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, Text, Alert, Image, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import { connect } from 'react-redux';

import * as API from '../../Services/API/API'

import SearchingIcon from '../../image/svg/SearchingIcon'
import Button from '../../Components/Button'
import Form from '../Form'

import getItemDeleteStyle from './ItemDeleteStyle'
import Item from '../../Components/Item';
import SearchBar from '../../Components/SearchBar';


const ItemDeleteScreen = (props) => {

  const {
    navigation,
    route,

    app_theme,

  } = props

  const main_style = getItemDeleteStyle(app_theme)

  const LoadScreen = (text) => {

    return (
      <View style={{ alignItems: 'center', marginTop: -15 }}>
        <Text style={main_style.StyledTitle}>{text}</Text>
        <SearchingIcon width={300} height={400} />
      </View>
    )
  }



  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState({})
  const [search, setSearch] = useState('')
  const [allItems, setAllItems] = useState([])

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

  useEffect(() => {

    loadItems()
  }, [])


  const delet = (item) => {

    setSelectedItem(item)

    Alert.alert(
      '!!!Cuidado!!!',
      'Você Tem Certeza que Deseja Excluir Esse Produto Permanentemente?',
      [
        {
          text: 'Sim',
          onPress: deleteItem
        },

        {
          text: 'Não',
        }
      ])
  }

  const deleteItem = async () => {

    Alert.alert('Excluindo o Produto: ' + selectedItem.name, 'Aguarde um Instante...')

    const response = await API.deleteRequest('delete/item/' + selectedItem._id, {}, {})

    console.log('delte response')
    console.log(response)

    Alert.alert('Excluido com Sucesso', '', [{ text: "Ok" }])

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
            items.length > 0
              ?
              items.map(item_data => {

                return (
                  <Item
                    id={item_data._id}
                    key={item_data._id}

                    onClick={() => delet(item_data)}
                    buttonText='-'

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

        </View>

      </ScrollView>
    </View>
  )
}


const mapStateToProps = state => ({

  app_theme: state.app_config.app_theme,

})


export default connect(mapStateToProps)(ItemDeleteScreen);
