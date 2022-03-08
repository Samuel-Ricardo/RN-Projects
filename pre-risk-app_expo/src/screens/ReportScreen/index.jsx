import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, Alert, Image } from 'react-native'

import { connect } from "react-redux"
import { bindActionCreators } from 'redux'

import * as UserActions from "../../../Store/actions/User"

import * as Print from 'expo-print';
import * as MediaLibrary from "expo-media-library"
import * as Sharing from 'expo-sharing';

import * as API from '../../server/API';

import getReportStyle from './report_style'

import Header from '../../component/Header/Index'
import Button from '../../component/Button'
import InfoField from '../../component/FormFields/InfoField'


const ReportScreen = ({
  navigation,
  user,
  logout,
  app_theme,
}) => {


  const report_style = getReportStyle(app_theme)

  const pdfStyle = `
  .root{

    display: flex;
    position: relative;

    width: 100%;

    flex: 1;

    background-color: aliceblue;
    padding: 0px;
    margin: 0px;

    flex-direction: column;
  }

  .header{

    background-color: blue;

    width: 100%;
    height: 70pt;

    border-radius: 0pt 0pt 45pt 45pt;

    align-items: center;
    justify-content: center;
  }

  .header .title {

    font-size: 24pt;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;

    color: white;


    text-align: center;
  }

  .content{
    background-color: rgb(255, 255, 255);

    display: flex;

    width: 100%;

    justify-content: center;
    border-radius: 10pt;
    margin: 10pt;

    overflow: scroll;

  }

  .table{
    width: 100%;
    border-radius: 10pt;
    padding: 5pt;

    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 17pt;
  }

  .table *{
    width: 100%;
    border-width: 0;
    background-color: rgb(223, 223, 223);
    border-radius: 5pt;

    min-width: max-content;

  }

  .table tbody * {
    width: 100%;
    font-size: 14pt;
    padding-left: 10pt;
    background-color: rgb(191, 250, 250);
  }

  .row-reverse td {
    background-color: rgb(215, 250, 215);
  }
`;


  const save_file = async (uri) => {

    const permission = await MediaLibrary.requestPermissionsAsync();

    if(permission.granted){

      console.log(uri);


      const save_pdf = await MediaLibrary.createAssetAsync(uri);
      
      console.log('')
      console.log('save photo')
      console.log('')
      console.log(save_pdf)

      const share_result = await Sharing.shareAsync(save_pdf.uri)
    
        console.log('')
        console.log('Share result')
        console.log('')
        console.log(share_result)
    } else {
      Alert.alert(
        'Não é possivel gerar o PDF pois o app não tem permissão para acessar o armazanamento',
        'conceda a permissão ao app para gerar e salvar o pdf',
        [{ text: "OK", action: () => {return} }])
    }

  }

  const creatPDF = async (html) => {
    try {


      const { uri } = await Print.printToFileAsync({ html });


      return uri;

    } catch (err) {
      console.log('')
      console.log('erro pdf')
      console.error(err);
    }
  }


  const generateEmployeReport = async () => {

    Alert.alert(
      '',
      'Gerando PDF...',
      [{ text: "OK", action: () => {return} }]
      )

    const compileDocs = async () => {

      let response = await API.getRequest('get/pilots/' + user._id, {}, {});
      let docs = [];

        if (response.error == false && response.data.pilot != undefined) {
          docs = response.data.pilot;
        }

      response = await API.getRequest('get/helpers/' + user._id, {}, {});

      if (response.error == false && response.data.helper != undefined) {
        let helpers = response.data.helper;
        helpers.forEach((doc) => docs.push(doc));
      }


        let iterator = 0;
        let row;
        
        return docs.map((document) => {

          const row_class = iterator % 2 === 0 ? `row` : `row-reverse`;

          console.log(document)

          if(document.namePilot != undefined){
            const {
              _id,
              addBy,
              namePilot,
              telPilot,
              cpfPilot,
              expireCNH,
              expireBuonny,
              expireApisul,
              expireOpentech,
              isActive,
            } = document;

            row = `
                    <tr class="${row_class}">
                      <td>${namePilot}</td>
                      <td>${cpfPilot}</td>
                      <td>${expireCNH}</td>
                      <td>${expireBuonny}</td>
                      <td>${expireApisul}</td>
                      <td>${expireOpentech}</td>
                      <td>${isActive ? "S" : "N"}</td>
                    </tr>
                  `;

          } else {

            const {
              _id,
              addPor,
              nameHelper,
              cpfHelper,
              expireBuonny,
              expireOpentech,
              telHelper,
              isActive,
            } = document;
            
            row = `
                    <tr class="${row_class}">
                      <td>${nameHelper}</td>
                      <td>${cpfHelper}</td>
                      <td>Não Consta</td>
                      <td>${expireBuonny}</td>
                      <td>Não Consta</td>
                      <td>${expireOpentech}</td>
                      <td>${isActive ? "S" : "N"}</td>
                    </tr>
                  `;
          }

          iterator++;


          return row;
      })
    }

      const HTML = `
      
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta http-equiv="X-AU-Compatible" content="IE=edge">
      
          <title> Relatório de Empregados </title>
      
          <meta name="viewport" content="width=device-width, initial-scale=1">
      
          <style>
            ${pdfStyle}
          </style>
      
        </head>
      
        <body class="root">
      
          <header class='header'>
      
            <p class="title"> Relatório de Funcionários </p>
      
          </header>
      
      
          <section class="content">
            <table class="table" border=1 >
      
              <thead class='thead'>
                <tr class="row"'>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>CNH</th>
                  <th>Buonny</th>
                  <th>Apisul </th>
                  <th>Opentech</th>
                  <th>Ativo</th>
                </tr>
              </thead>
      
              <tbody>
                ${await compileDocs()}
              </tbody>
      
              <tfoot class='thead'>
                <tr class="row">
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>CNH</th>
                  <th>Buonny</th>
                  <th>Apisul </th>
                  <th>Opentech</th>
                  <th>Ativo</th>
                </tr>
              </tfoot>
            </table>
      
          </section>
      
        </body>
      </html>
      
      
      `;

      return save_file ( await creatPDF(HTML));
  }

  async function generateVehicleReport () {

      Alert.alert(
        '',
        'Gerando PDF...',
      [{ text: "OK", action: () => {return} }]
      )

      let response = await API.getRequest('get/vehicles/' + user._id, {}, {});
      let docs = [];

        if (response.error == false && response.data.vehicle != undefined) {
          docs = response.data.vehicle;
        }

        console.log(docs)

      const compileDocs = (docs) => {
        console.log(docs)

        let iterator = 0
        

        return docs.map((document) => {

          const {
            _id,
            addPor,
            year,
            numANTT,
            expireANTT,
            expireOpentech,
            isSendForBuonny,
            isActive,
            plateNumber,
            owner,
          } = document;

          const row_class = iterator % 2 === 0 ? `row` : `row-reverse`;
          iterator++;


          return (`
            <tr class="${row_class}">
              <td>${plateNumber}</td>
              <td>${year}</td>
              <td>${owner}</td>
              <td>${expireOpentech}</td>
              <td>${isSendForBuonny ? `Enviado` : `Não enviado`}</td>
              <td>${isActive? `S` : `N`}</td>
            </tr>
          `)
        })

      };

      const HTML = `

      <!DOCTYPE html>
      <html>
      <head>
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <title>Relatório de Veículos</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'>

        <style>
          ${pdfStyle}
        </style>

      </head>

      <body class="root">

        <header class='header'>

          <p class="title"> Relatório de Veículos </p>

        </header>


        <section class="content">
          <table class="table" border=1 ">

            <thead class='thead'>
              <tr class="row">
                <th>Placa</th>
                <th>Ano Doc</th>
                <th>Proprietário</th>
                <th>Opentech</th>
                <th>Buonny</th>
                <th>Ativo</th>
              </tr>
            </thead>

            <tbody>
              ${compileDocs(docs)}
            </tbody>

            <tfoot class='thead'>
              <tr class="row">
                <th>Placa</th>
                <th>Ano Doc</th>
                <th>Proprietário</th>
                <th>Opentech</th>
                <th>Buonny</th>
              <th>Ativo</th>
              </tr>
            </tfoot>
          </table>

        </section>

      </body>
      </html>

      `;

      return save_file ( await creatPDF(HTML));
  }

  return (
    <>
      <View style={report_style.Container}>

        <Header
          text="Relatório"
          config_action={() => logout(user)}
          icon={ <Image source={require('../../assets/mini2.png')}/>}
        />

        <ScrollView >

          <View style={{ marginTop: 20, marginHorizontal: 10 }}>
            <InfoField title='RELATÓRIO DE FUNCIONÁRIO'>
              <Button onClick={() => generateEmployeReport()}>Gerar</Button>
            </InfoField>
          </View>

          <View style={{ marginTop: 20, marginHorizontal: 10 , marginBottom: 20}}>
            <InfoField title='RELATÓRIO DE VEÍCULO'>
              <Button onClick={() => generateVehicleReport()}>Gerar</Button>
            </InfoField>
          </View>

        </ScrollView>

      </View>
    </>
  )
}

const mapStateToProps = state => (
  {
    user: state.User.logged_user,
    app_theme: state.app_config.app_theme
  }
)

const mapDispatchToProps = dispatch => (bindActionCreators(UserActions, dispatch))
  
export default connect(mapStateToProps, mapDispatchToProps)(ReportScreen);
