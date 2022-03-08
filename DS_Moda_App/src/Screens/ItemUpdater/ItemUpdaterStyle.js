import { StyleSheet } from 'react-native';
import getGlobalStyle from '../../Style/GlobalStyle'
import getMarketStyle from '../MarketCar/MarketCarStyle'
import getStoreStyle from '../Store/StoreStyle'
import getLoginStyle from '../Login/LoginStyle'

export default function getItemUpdaterStyle(app_theme) {

  const global_style = getGlobalStyle(app_theme)
  const cart_style = getMarketStyle(app_theme)
  const store_style = getStoreStyle(app_theme)
  const login_style = getLoginStyle(app_theme)

  const item_style = StyleSheet.create({
    ...global_style,
    ...cart_style,
    ...store_style,

    ButtonGroup: {
      ...login_style.ButtonGroup,

      marginTop: 30,
      marginBottom: 20,
    },

    form_area: {

      marginTop: 20,
      marginLeft: 20,
      marginRight: 20,
    }
  })

  return item_style;
};
