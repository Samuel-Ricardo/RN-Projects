import { StyleSheet } from 'react-native';
import getGlobalStyle from '../../Style/GlobalStyle'
import getMarketStyle from '../MarketCar/MarketCarStyle'

export default function getItemUpdaterStyle(app_theme) {

  const global_style = getGlobalStyle(app_theme)
  const cart_style = getMarketStyle(app_theme)

  const item_style = StyleSheet.create({
    ...global_style,
    ...cart_style,
  })

  return item_style;
};
