import { StyleSheet } from 'react-native'
import getGlobalStyle from '../../Style/GlobalStyle'
import getItemStyle from '../Item/ItemStyle'


const getHistoryItemStyle = (app_theme) => {

  const global_style = getGlobalStyle(app_theme)
  const item_style = getItemStyle(app_theme)

  const history_item_style = {
    ...global_style,
    ...item_style,
  }

  return history_item_style;
}

export { getHistoryItemStyle as default};
