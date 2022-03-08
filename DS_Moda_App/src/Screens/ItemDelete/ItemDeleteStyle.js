import { StyleSheet } from 'react-native';
import getGlobalStyle from '../../Style/GlobalStyle'
import getMarketStyle from '../MarketCar/MarketCarStyle'
import getStoreStyle from '../Store/StoreStyle'

export default function getItemDeleteStyle(app_theme) {

  const global_style = getGlobalStyle(app_theme)
  const cart_style = getMarketStyle(app_theme)
  const store_style = getStoreStyle(app_theme)

  const item_style = StyleSheet.create({
    ...global_style,
    ...cart_style,
    ...store_style,
  })

  return item_style;
};
