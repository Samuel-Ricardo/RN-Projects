import React, { useState } from 'react'
import { StyleSheet, ScrollView, View, Text, Alert } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../Components/Link';

import getFormStyle from './FormStyle'


const FormScreen = (props) => {

  const {
    app_theme,

    fill,

    title,
    subTitle,
    paragraph,

    formTitle,
    form_fields,
    description,

    buttons
  } = props

  const form_style = getFormStyle(app_theme)

  console.log('subtitle')
  console.log(subTitle)

  return (

   <>
      {fill === true

        ?

        <View style={form_style.Container}>
        <ScrollView>
          <View style={form_style.TextArea}>

            <Text style={form_style.Title}> {title} </Text>


            <Text style={form_style.SubTitle}> {subTitle} </Text>


            <Text style={form_style.P}> {paragraph} </Text>

          </View>

            <View style={{
              ...form_style.Pane,
              marginTop: -20,
              marginLeft: 0,
            marginRight: 0,
          }}>

            <Text style={{
              ...form_style.StyledSubTitle,

              color: app_theme.default_background

            }}> {formTitle} </Text>

            {form_fields}

            <Text style={form_style.Link}> {description} </Text>

            <View style={form_style.ButtonGroup}>

              {buttons}

            </View>
          </View>
        </ScrollView>
      </View>

        :
      <View style={form_style.Container}>
        <ScrollView>
          <View style={form_style.TextArea}>

            <Text style={form_style.Title}> {title} </Text>


            <Text style={form_style.SubTitle}> {subTitle} </Text>


            <Text style={form_style.P}> {paragraph} </Text>

          </View>

          <View style={form_style.Pane}>

            <Text style={{
              ...form_style.StyledSubTitle,

              color: app_theme.default_background

            }}> {formTitle} </Text>

            {form_fields}

            <Text style={form_style.Link}> {description} </Text>

            <View style={form_style.ButtonGroup}>

              {buttons}

            </View>
          </View>
        </ScrollView>
      </View>}
   </>
  )
}


const mapStateToProps = state => ({

  app_theme: state.app_config.app_theme

})

export default connect(mapStateToProps)(FormScreen);
