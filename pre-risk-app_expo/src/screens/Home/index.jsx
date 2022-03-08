import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, Alert } from 'react-native'

import { connect } from "react-redux"
import { bindActionCreators } from 'redux'

import * as UserActions from "../../../Store/actions/User"
import * as API from '../../server/API'

import getHomeStyle from './home_style'

import Header from '../../component/Header/Index'
import Button from '../../component/Button'
import ItemList from '../../component/ItemList'
import Item from '../../component/Item'
import HomeIcon from '../../icon/HomeIcon'
import DocItem from '../../component/DocItem'


const HomeScreen = ({ navigation, route, user, logout, addItem, app_theme, dispatch }) => {

  const [docs, setDocs] = useState([])
  const [documents, setDocuments] = useState([])
  const [search, setSearch] = useState(``)

  const searchText = {text: search, setText: setSearch}

  //const docs = [];

  const searchDocs = async () => {

    if(search == " " || search.length === 0) return checkAPI();
    
    let temp_documents = []
    let temp_docs = [];

    let response = await API.postRequest(`doc/search`, {
      search,
      userID: user._id
    }, {}); 

    response = response.data;

    if(response.error === false){
      if(response.data !== undefined){

        temp_docs.push(response.data.docs);
        temp_documents = renderDocs(response.data.docs, temp_documents);
        
      }
    }
      setDocuments(temp_documents);
      return setDocs(temp_docs);
  }

  const checkAPI = async () => {

    let temp_documents = []
    let temp_docs = [];

    const driver_response = await API.getRequest(`get/pilots/${user._id}`, {}, {});
    const helper_response = await API.getRequest(`get/helpers/${user._id}`, {}, {});
    const vehicle_response = await API.getRequest(`get/vehicles/${user._id}`, {}, {});

    if (driver_response.data != undefined) {
      temp_docs.push(driver_response.data.pilot);
      temp_documents = renderDocs(driver_response.data.pilot, temp_documents);
      }

    if (helper_response.data != undefined) {
      temp_docs.push(helper_response.data.helper);
      temp_documents = renderDocs(helper_response.data.helper, temp_documents);
      }

    if (vehicle_response.data != undefined) {
      temp_docs.push(vehicle_response.data.vehicle);
      temp_documents = renderDocs(vehicle_response.data.vehicle, temp_documents);
    }

    setDocuments(temp_documents)

    return setDocs(temp_docs);
  }

  useEffect(() => {

    return checkAPI();

  }, []);

  const home_style = getHomeStyle(app_theme)

  function renderDocs(docs, temp_documents) {

    docs.forEach((item) => {
      temp_documents.push(
        <DocItem content={item} key={item._id} reloadList={() => checkAPI()} navigation={navigation}/>
      )
    })

    return temp_documents;

    /*
    for (document in docs) {
      documents.push(
        <DocItem />
      )
    }
*/
  }

  console.log("Documentos: " + docs.length);
  console.log("Docs:" + documents)

  return (
    <>
      <View style={home_style.Container}>

        <Header
          text="Documentos"
          config_action={() => logout(user)}
          icon={<HomeIcon fill={'#FFFFFF'} width={40} height={40} />}
        />

        <ScrollView style={{
          marginBottom: 0,
          maxHeight: 0//130, //MUDADO PARA NÃO HAVER ESPAÇO EM BRANCO;

        }} >

        </ScrollView>

        <Text style={home_style.Message}> Bem Vindo {user.name} </Text>

        <ItemList
          app_theme={app_theme}
          searchAction={searchDocs}
          searchText={searchText}
          itens={docs}
          navigation ={navigation}
          reloadList={() => checkAPI()}
        >

          {docs.length > 0 ?

            //documents.forEach((document) => document) ORIGINAL
            documents //O UNICO QUE APARECE ALGO
            //documents.forEach((documents) => documents)

            : (
              <Text style={{ marginTop: 30 }}>
                Sem documentos (~ U.U)~
              </Text>
            )}
        </ItemList>

      </View>
    </>
  )
}
//<ItemList></ItemList>
const mapStateToProps = state => (
  {
    user: state.User.logged_user,
    app_theme: state.app_config.app_theme
  }
)

const mapDispatchToProps = dispatch => {

  const actions = {
    ...UserActions
  }

  return bindActionCreators(actions, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);


/*
<ItemList
          app_theme={app_theme}
        >
              <Text style={{ marginTop: 30 }}>
                Tela em produção (~ U.U)~
            </Text>

        </ItemList>
*/
