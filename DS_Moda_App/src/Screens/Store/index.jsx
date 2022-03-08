import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View, Text, Alert } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../Components/Link';

import SearchBar from '../../Components/SearchBar';
import Button from '../../Components/Button';
import SearchingIcon from '../../image/svg/SearchingIcon'

import getStoreStyle from './StoreStyle'

import * as API from '../../Services/API/API'
import * as cart_actions from '../../../Store/Actions/ShoppingCart'

import Item from '../../Components/Item';
import HistoryItem from '../../Components/HistoryItem';

const StoreScreen = (props) => {

  const {
    navigation,
    route,

    app_theme,
    user,

    addItem,
  } = props


  console.log("")
  console.log("Open: Store Screen")
  console.log("")

  console.log("")
  console.log("Navigation Data:")
  console.log(navigation)
  console.log("")

  console.log("")
  console.log("Navigation Route Data:")
  console.log(route)
  console.log("")

  const store_style = getStoreStyle(app_theme)

  const add = (item) => {

    if (item.stock <= 0) {

      return Alert.alert(
        'Ops...',
        'O estoque do' + item.name + ' esgotou :/',
        [{text:"OK"}]
      )

    }

    addItem(item)

    Alert.alert("Produto Foi Adicionado ao Carrinho", "(~ U ,U)~", [{ text: 'ok' }])
  }

  const LoadScreen = (text) => {

    return (
      <View style={{alignItems: 'center', marginTop: -15}}>
        <Text style={store_style.StyledTitle}>{text}</Text>
        <SearchingIcon width={300} height={400} />
      </View>
    )
  }

  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [allItems, setAllItems] = useState([])

  const filter = (find) => {

    console.log('')
    console.log('Filter Called')
    console.log('Params: ' + find)

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
      if(name) {

        filter(name)
      }
    }

  useEffect(() => {

   loadItems()
  },[])

  const loadHistoric =  async () => {

    const request = await API.postRequest('user/history', {userId: user._id}, {})

    if (request) {
      setItems(request)
    }
  }

  // useEffect(() => {

  //   filter(search)

  // },[search])

  // if (request.error === false) {


  // } else {

  //   Alert.alert(
  //     'Não foi possivel achar os produtos (~ X,X)~',
  //     request.error,
  //     [
  //       {
  //         Text: 'ok',
  //       }
  //     ]
  //   )
  // }





  return (

    <View>

      <View>

        <SearchBar
          value={search}
          onChangeText={(text) => (filter(text))}
          onButtonPress={() => loadItems(search)}
        >

          <Button
            style_button={{marginLeft: 5, marginRight: 5, backgroundColor: '#FFFF' }}
            style_font={{ color: '#0085ff' }}
            onClick={() => loadItems()}
          >Loja</Button>

          <Button
            style_button={{ marginRight: 5, marginLeft: 5, backgroundColor: '#FFFF' }}
            style_font={{color: '#0085ff'}}
            onClick={() => loadHistoric()}
          >Histórico</Button>

          <Button
            style_button={{ marginRight: 5, marginLeft: 5, backgroundColor: '#FFFF' }}
            style_font={{ color: '#0085ff' }}
            onClick={() => navigation.navigate('Car')}
          >Carrinho</Button>

        </SearchBar>

      </View>


      <ScrollView style={{
        maxHeight: store_style.ScreenHeight - 245,
        marginBottom: 20
      }}>

          <View >

          {
            items.length > 0
              ?
              <>
                {
                  items.cep_data === undefined

                    ?
                    items.map((item_data, key) => {

                      return (
                        <Item
                          id={item_data._id}
                          key={key}

                          onClick={() => add(item_data)}
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

                    items.map((purchase_data, key) => {

                      return (
                        <HistoryItem
                          id={purchase_data._id}
                          key={key}

                          items={purchase_data.items}
                          cep_data={purchase_data.cep_data}

                          frete_data={purchase_data.frete_data}
                          buy_date={purchase_data.buy_date}
                          total_value={purchase_data.total_value}
                        />
                      )
                    }
                  )

                }
              </>
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
  user: state.User.loggedUser,
  cart: state.shopping_cart

})

const mapDispatchToProps = dispatch => (

  bindActionCreators(cart_actions, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(StoreScreen);
