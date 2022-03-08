import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, Text, Alert, Image, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as cart_actions from '../../../Store/Actions/ShoppingCart'

import Link from '../../Components/Link';
import ShoppingCartIcon from '../../image/icon/ShoppingCartIcon'
import SearchingIcon from '../../image/svg/SearchingIcon'
import Button from '../../Components/Button'
import Form from '../Form'

import getCartStyle from './MarketCarStyle'
import Item from '../../Components/Item';


const MarketCarScreen = (props) => {

  const {
    navigation,
    route,

    app_theme,
    cart,

    removeItem,
    cleanCart,

    title,
    subTitle,
    paragraph,

    formTitle,
    form_fields,
    description,

    buttons
  } = props

  const main_style = getCartStyle(app_theme)

  const LoadScreen = (text) => {

    return (
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Text style={main_style.StyledTitle}>{text}</Text>
        <SearchingIcon width={300} height={300} />
      </View>
    )
  }

  const [items, setItems] = useState([])

  const checkItems = () => {

    setItems(cart.items)
  }

  useEffect(() => {

    checkItems()
  }, [])

  return (

    <Form style={main_style}

    fill = {true}

      title='Carrinho'
      subTitle={
        <>
          <View style={main_style.icon_background}>
            <ShoppingCartIcon width={100} height={100} />
          </View>
        </>
      }
      paragraph=''

      formTitle='Produtos'

      form_fields={


            <View style={{ flex: 1 }}>

              {
                items.length > 0

                  ?
                  items.map(item_data => (

                    <Item
                      id={item_data._id}
                      key={item_data._id}

                      onClick={() => removeItem(item_data)}
                      buttonText='-'

                      container_style={{
                        marginLeft: 0,
                        marginRight: 0,
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

                  <Text style={main_style.StyledTitle}>Nenhum Produto no Carrinho</Text>
              }

            </View>


      }

      description={
        <>
          <Text> Valor Total: {cart.total_value}  </Text>
        </>
      }

      buttons={
        <>
          <Button
            onClick={() => {
              cleanCart()
              return navigation.navigate('Store')
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
            onClick={() => {
              if (cart.items.length > 0) {

                return  navigation.navigate('Cep')
              } else {

                return Alert.alert('Sem Produtos no Carrinho','', [{text: 'Ok'}])
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
        </>
      }
    />
  )
}


const mapStateToProps = state => ({

  app_theme: state.app_config.app_theme,
  cart: state.shopping_cart,

})

const mapDispatchToProps = dispatch => (

  bindActionCreators(cart_actions, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(MarketCarScreen);
