import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, Image, addons } from 'react-native'

import getItemStyle from './ItemStyle'

import { Alert } from 'react-native'

import StartIcon from '../../image/icon/StarIcon'
import Button from '../Button'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as UserActions from '../../../Store/Actions/User'

import * as API from '../../Services/API/API'

const Item = (props) => {
  const {
    app_theme,
    user,
    updateFavorites,

    onClick,
    buttonText,
    key,

    container_style,
    font_style,

    id,
    name,
    image_url,
    size,
    stock,
    value,
    favoritedBy
  } = props

  const [isFav, setFav] = useState(false)

  const checkFavorite = async () => {

    console.log('check favorite')

    user.favoriteItems.forEach((favItem) => {

      console.log('favorites items')
      console.log('')
      console.log(favItem)

      if (id === favItem) {

        setFav(true)

        console.log('favorite true')
      }

    })

  }

  useEffect(() => {

    checkFavorite();

  }, [])

  const favorite = () => {

    setFav(!isFav)

    let newFavorites = [...user.favoriteItems]

    const itemId = id
    const userId = user._id

    API.postRequest('add/favorite', { itemId, userId }, {})

    if (!isFav === true) {

      newFavorites.push(id)

      console.log('New Favorites if')
      console.log(newFavorites)

    } else {

      newFavorites.splice(newFavorites.indexOf(id), 1)
    }

    console.log('New Favorites nofi')
    console.log(newFavorites)

    updateFavorites(newFavorites)
  }

  let item_style = getItemStyle(app_theme)

  return (

    <View style={{
      ...item_style.Container,
      ...container_style,
    }}>

      <View style={item_style.ImageArea}>

        <Image
          style={item_style.Image}
          resizeMode='cover'
          source={{
            uri: image_url,
          }}
        />

      </View>

      <View style={item_style.ContentArea}>

        <View style={item_style.Line}>

          <Text style={{
            ...item_style.Name,
            flex: 1,
            flexWrap: 'wrap',}}>
            {name}
          </Text>


          <TouchableOpacity
            onPress={() => favorite()}
          >
            <StartIcon
              height={30}
              width={30}
              fill={isFav === true ? 'rgba(255, 193, 7, 1)' : 'rgba(255, 193, 7, 0.3)'}
            />
          </TouchableOpacity>
        </View>

        <View style={{ ...item_style.Line, marginTop: 10, }}>

          <Text style={item_style.Stock}>
            Estoque: {stock}
          </Text>

          <Text style={item_style.Size}>
            Tamanho: {size}
          </Text>

        </View>
        <View style={{ ...item_style.Line, marginTop: 10, marginBottom: 10 }}>

          <Text style={item_style.Value}>
            R$ {value}
          </Text>

          <Button
            style_button={
              {
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 45,
                paddingRight: 45,
              }
            }
            onClick={() => onClick(id)}
          >
            {buttonText}
          </Button>
        </View>

      </View>
    </View>

  )
}

const mapStateToProps = state => ({
  app_theme: state.app_config.app_theme,
  user: state.User.loggedUser,
})

const mapDispatchToProps = dispatch => (

  bindActionCreators(UserActions, dispatch)

)

export default connect(mapStateToProps, mapDispatchToProps)(Item)
