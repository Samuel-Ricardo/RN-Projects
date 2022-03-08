import { StyleSheet } from 'react-native'
import getGlobalStyle from '../../style/Global_Style'



const getFieldStyle = (app_theme) => {

  const global_style = getGlobalStyle(app_theme)

  const field_style = {
    ...global_style,

    Container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      alignSelf: 'baseline',
    },

    Text: {
      ...global_style.Text,

      color: app_theme.styled_text_color,
      fontWeight: 'bold',
  },

  P: {
      ...global_style.P,

      color: app_theme.styled_text_color,
      
  }
   
  };

  return field_style;
}

export { getFieldStyle as default };