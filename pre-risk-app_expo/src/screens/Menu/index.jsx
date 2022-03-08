import React, { Children } from 'react'
import { Image, ScrollView, View, Text } from 'react-native'

import * as user_actions from '../../../Store/actions/User'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import getMenuStyle from './menu_style';

const Menu = (props) => {

  const {
    app_theme,
    Children,

    onTouch
  } = props;

  const style = getMenuStyle(app_theme);

  return (
    <View style={style.background} onTouchStart={() => onTouch()}>

      <View style={style.side_bar}>

        <View style={style.header}>

          <Text style={style.H2}>
            Menu
          </Text>

          <Image style={style.icon} source={require('../../assets/menu.png')} />

        </View>

        <ScrollView>



        </ScrollView>

      </View>

    </View>
  )
}

const mapStateToProps = (state) => ({
  app_theme: state.app_config.app_theme
})

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(user_actions, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
