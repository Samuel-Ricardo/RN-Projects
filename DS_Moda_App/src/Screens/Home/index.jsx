import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, Alert } from 'react-native'

import { connect } from "react-redux"
import { bindActionCreators } from 'redux'

import * as UserActions from "../../../Store/Actions/User"
import * as cart_actions from '../../../Store/Actions/ShoppingCart'

import * as API from '../../Services/API/API'

import getHomeStyle from './HomeStyle'

import LoginScreen from "../Login"
import Header from '../../Components/Header'
import Button from '../../Components/Button'
import ItemList from '../../Components/ItemList'
import Item from '../../Components/Item'


const HomeScreen = ({ navigation, route, user, logoutUser, addItem, app_theme, dispatch }) => {

  console.log("")
  console.log("Open: Home Screen")
  console.log("")

  console.log("")
  console.log("Navigation Data:")
  console.log(navigation)
  console.log("")

  console.log("")
  console.log("Navigation Route Data:")
  console.log(route)
  console.log("")

  console.log("")
  console.log("State:")
  console.log(user)
  console.log("")

  // const setLogged = route.params?.setLogged

  const [items, setItem] = useState([])

  const goToPerfil = () => {
    navigation.navigate("Perfil")
  }

  const home_style = getHomeStyle(app_theme)

  const add = (item) => {

    addItem(item)

    Alert.alert("Produto Foi Adicionado ao Carrinho", "(~ U ,U)~", [{ text: 'ok' }])
  }

  const checkFavItems = async () => {

    const favItens = user.favoriteItems

      // if (favItens.length > 0) {

      //   const favorites = favItens.forEach((favId) => {

      //     // const item = API.postRequest('favorites/:id', { itemId: favId }, {})

      //     return (item)
      //   })

      const favorites = await API.getRequest('favorites/' + user._id, {}, {})

      console.log(' ')
      console.log('Favorites')
      console.log(favorites.userFavs)

      let favItems = []

    for (var i = 0; i < favorites.userFavs.length; ++i){

     favItems.push( await API.getRequest(`item/${favorites.userFavs}`, {}, {}))

    }

      setItem(favItems)
  }

  useEffect(() => {

    checkFavItems()
  }, [])

  return (
    <>
      <View style={home_style.Container}>
        <Header
          user={user}
          config_action={() => navigation.navigate('Config')}
          perfil_action={() => goToPerfil()}
        ></Header>
        <ScrollView style={{
          marginBottom: 0,
          maxHeight: 130,
        }} >

          <View style={home_style.Message}>
            <Text>Bem Vindo de Volta {user.name} :)</Text>
          </View>

        </ScrollView>
        <ItemList
          app_theme={app_theme}
        >

          {
            items.length > 0
              ?
              items.map((item_data, key) => (

                <Item
                  id={item_data._id}
                  key={key}

                  onClick={() => add(item_data)}
                  buttonText='+'

                  container_style={{
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 20,
                  }}

                  name={item_data.name}
                  image_url={item_data.image_url}

                  stock={item_data.stock}
                  size={item_data.size}
                  value={item_data.value}

                  favoritedBy={item_data.favoritedBy}
                />
              ))
              :
              <Text style={{ marginTop: 30 }}>
                Você não tem Nenhum item Favoritado (~ U.U)~
            </Text>
          }

        </ItemList>
      </View>
    </>
  )
}
//<ItemList></ItemList>
const mapStateToProps = state => (
  {
    user: state.User.loggedUser,
    app_theme: state.app_config.app_theme
  })

const mapDispatchToProps = dispatch => {

  const actions = {
    ...cart_actions,
    ...UserActions
  }

  return bindActionCreators(actions, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);


//    <View>
//      <Text> Home Screen { route.params?.user }</Text>
//    </View>
