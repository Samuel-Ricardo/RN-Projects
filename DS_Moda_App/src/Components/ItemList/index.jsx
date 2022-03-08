import React from 'react'
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import getItemListStyle from './ItemListStyle'

const ItemList = (props) => {

  console.log("Carregando a lsita de itens")


  const { children, app_theme } = props

  const item_list_style = getItemListStyle(app_theme)

  return (

    <View style={item_list_style.Background}>

      <View style={item_list_style.Header}>

        <Text style={item_list_style.HeaderFont}>
          Aqui Estão Alguns Produtos que Você Marcou ^-^
        </Text>

      </View>

      <ScrollView>
        <View style={item_list_style.Item}>
          {children}
        </View>
      </ScrollView>
    </View>
  );
};

export { ItemList as default };
