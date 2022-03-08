import React, { useEffect } from 'react'
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import getItemListStyle from './ItemListStyle';

import SearchBar from '../SearchBar';
import ToggleButton from '../ToggleButton';
import { useState } from 'react';
import DocItem from '../DocItem';
import { set } from 'react-native-reanimated';
import { connectAdvanced } from 'react-redux';

const ItemList = (props) => {

  console.log("Carregando a lsita de itens")

  const [showExpires, setShowExpires] = useState(false); 
  const [showToExpire, setToShowExpire] = useState(false); 

  const [expires, setExpires] = useState([]); 
  const [toExpires, setToExpires] = useState([]); 


  const { children, app_theme, searchAction, searchText, itens, reloadList, navigation } = props

  const item_list_style = getItemListStyle(app_theme)


  const isExpired = (date_int_array) => {
    const today = new Date();

    const date_doc = new Date(date_int_array[2],date_int_array[1], date_int_array[0])

    console.log("TODAAAAAAAAAAY:")
    console.log(today)
    console.log("")

    console.log("DATE DOOOOOOOOC:")
    console.log(date_doc)

    if(date_doc < today) return true;

    console.log('Pedro boboca >:()')

    if(
      (date_doc.getFullYear() < today.getFullYear() && date_doc.getMonth() > today.getMonth() && date_doc.getDate() > today.getDate()) ||
      (date_doc.getFullYear() == today.getFullYear() && date_doc.getMonth() <= today.getMonth() && date_doc.getDate() <= today.getDate()) ||
      (date_doc.getFullYear() == today.getFullYear() && date_doc.getMonth() <= today.getMonth() && date_doc.getDate() >= today.getDate())
    ){
      
      return true;

    } else {
      console.log("Pure...")
      return false;
    }
  }

  const  checkExpiresDateString = (date_string) => {
        const splited_date_string = date_string.split('/');
        const int_date = splited_date_string.map(date => date)//date => parseInt(date));

        console.log('')
        console.log('EXPIRE DATE ARRAY')
        console.log(int_date);
        console.log('')

        return isExpired(int_date);
  }


  const renderExpires = () => {
  
    let filter = []

    itens.forEach((_item) => {
          
        let _itens = _item.map(item => filterExpire(item));

        console.log('')
        console.log('ITENS DE EXPIRADOS PEDRO')
        console.log(_itens)
        console.log('')

        filter = [...filter, ..._itens];
      }
    )

    filter = filter.filter(item => item != undefined);

    console.log('')
    console.log('FILTRO DE EXPIRADOS')
    console.log(filter)
    console.log('')

    setExpires(filter);
  }

  const isToExpire = (date_string) => {
    const splited_date_string = date_string.split('/');
    const date_int_array = splited_date_string.map(date => date); // parseInt(date));

    const today = new Date();

    const date_doc = new Date(date_int_array[2],date_int_array[1] -1, date_int_array[0])
      
    console.log('')
    console.log('date array')
    console.log(date_int_array)
    console.log('')
    

    console.log('')
    console.log('date formated')
    //console.log(`${date_int_array[2]}-${date_int_array[1]}-${date_int_array[0]}`);
    //console.log(expireDate)
    console.log(date_doc)
    console.log('')

    // const diffInMs   = today - date_doc
    // const diffInDays = parseInt(diffInMs / (1000 * 60 * 60 * 24));
    var timeDiff = Math.abs(today.getTime() - date_doc.getTime());
    var diffInDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    console.log("DIAS DE DIFERENÇA ENTRE A DATA ATUAL E A DATA DO ITEM")
    console.log(diffInDays)

    var result = false;

    //  if(diffInDays <= 30 && diffInDays > 0) {
    //      console.log("Data entre 30 dias ou menos de distância")
    //      //result = true;
    //  } else {
    //      console.log("nueh")
    //    }


    // if(
    // (date_doc.getFullYear == today.getFullYear() && date_doc.getMonth() -1 == today.getMonth() && date_doc.getDate() <= today.getDate()) //||
    //  (date_doc.getFullYear() + 1 == today.getFullYear() && date_doc.getMonth() +1 == today.getMonth() && date_doc.getDate() <= today.getDate()) ||
    //  (date_doc.getFullYear() == today.getFullYear() && date_doc.getMonth() +1 == today.getMonth() && date_doc.getDate() == today.getDate())
    // ) {
    //   // console.log("Passou true.")
    //   // console.log("DATE USADA:")
    //   // console.log(date_doc)
    //   result = true;
    // }else{
    //   console.log("Passou false")
    //   console.log("DATE USADA:")
    //   console.log(date_doc)
    // }

      // const interval = new Date();
      // interval.setDate(date_doc.getDate() - 30);

      // console.log('')
      // console.log('date result')
      // console.log( today <= interval);
      // console.log('')

       if(diffInDays <= 30 && diffInDays > 0){//date_doc.getFullYear == today.getFullYear() && diffInDays <= 30 && date_doc.getDate() <= today.getDate()) { //||
        result = true;
      }

      // return today <= interval;
      console.log("RESULT:")
      console.log(result)
      return result;
  }

  const  checkToExpiresDateString = (item) => {
     if(checkExpiresDateString(item) === true) {
      console.log("Expirado:")
      console.log(item)
      
      //return isToExpire(item);
    } else if(checkExpiresDateString(item) === false){

      console.log('')
      console.log('date not expire')
      console.log(item);
      console.log('')

      return isToExpire(item);

    }
  }

  const renderToExpires = () => {
  
    console.log('A EXPIRAR')

    console.log("GUDI MORNING:")
    console.log(itens)

    let _itens = [];

    let filter = itens.map((_item) => {

    console.log('ITEM TO FILTER')
    let pedro = _item.map(item => filterToExpire(item)); 


    console.log(pedro)


    _itens = [..._itens, ...pedro]

    /*
    if (_item[0] != null) {
      var item = _item[0]
    } else {
      var item = _item
    }
    */
    // var item = _item

    // console.log(item)

    // console.log("FILTRU:")
    // console.log(filter)

    // console.log("ITEMZINHO:")
    // console.log(item)
    
        
      }
    )

    filter = _itens.filter(item => item != undefined)

    console.log('FILTROOOOOOO')
    console.log(filter)

    setToExpires(filter)
 }

 const filterExpire = (item) => {
  if(item.isActive){

    if(item.namePilot){
      if(checkExpiresDateString(item.expireCNH) === true) return item; 
      if(checkExpiresDateString(item.expireBuonny) === true) return item; 
      if(checkExpiresDateString(item.expireApisul) === true) return item; 
      if(checkExpiresDateString(item.expireOpentech) === true) return item; 
    }

    if(item.nameHelper){
      if(checkExpiresDateString(item.expireBuonny) === true) return item; 
      if(checkExpiresDateString(item.expireOpentech) === true) return item; 
    }

    if(item.plateNumber){
      if(checkExpiresDateString(item.expireANTT) === true) return item; 
      if(checkExpiresDateString(item.expireOpentech) === true) return item; 
    }
  }
 }

 const filterToExpire = (item) => {
  if(item.isActive){
    if(item.namePilot){
      if(checkToExpiresDateString(item.expireCNH) === true) return item; 
      if(checkToExpiresDateString(item.expireBuonny) === true) return item; 
      if(checkToExpiresDateString(item.expireApisul) === true) return item; 
      if(checkToExpiresDateString(item.expireOpentech) === true) return item; 
    }

    if(item.nameHelper){
      if(checkToExpiresDateString(item.expireBuonny) === true) return item; 
      if(checkToExpiresDateString(item.expireOpentech) === true) return item; 
    }

    if(item.plateNumber){
      if(checkToExpiresDateString(item.expireANTT) === true) return item; 
      if(checkToExpiresDateString(item.expireOpentech) === true) return item; 
    }
  }
 }

  useEffect(() => {
    if(showExpires){
      renderExpires()
      console.log("useEffect do showExpires passado")
    }
  },[itens, showExpires]);

  useEffect(() => {
    if(showToExpire){
      console.log("useEffect do showToExpire passado")
      renderToExpires()
    }
  },[itens, showToExpire])

  return (

    <View style={item_list_style.Background}>

      <View style={item_list_style.Header}>

        <SearchBar text={searchText} onButtonPress={searchAction}></SearchBar>

        <View style={item_list_style.division}/>

        <View style={{
          ...item_list_style.ButtonGroup,
            marginTop: -15,
            paddingHorizontal:  10,
            paddingBottom: 15,
          }}>
          <ToggleButton isActive={showExpires} setActive={setShowExpires}> Expirados </ToggleButton>
          <ToggleButton isActive={showToExpire} setActive={setToShowExpire}> À expirar </ToggleButton>
        </View>

      </View>

      <ScrollView>
        <View style={item_list_style.Item}>
          {showExpires || showToExpire ?
            <>
              {showExpires && expires.length > 0  ? 
                
                <>
                  {console.log('oi')}  
                  {console.log(expires)}
                  {expires.map(
                    item => item ? <DocItem content={item} key={item.id} reloadList={reloadList} navigation={navigation}/> 
                    : <View key={Math.random()}/>
                    )
                  }
                </>
                
              : 
              <>
                {showToExpire && toExpires.length > 0  ? 
                  
                  <>
                    {toExpires.map(item => item ? <DocItem content={item} key={item.id} reloadList={reloadList} navigation={navigation}/> : <View key={Math.random()}/>)}
                  </>
                  
                  : 
                  <>
                    <Text style={{ marginTop: 30 }}>
                      Sem documentos (~ U.U)~
                    </Text>
                  </>}
              </>}
            </>
           : 
            <>
                {children}
            </>}
        </View>
      </ScrollView>
    </View>
  );
};

export { ItemList as default };
