/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 16/10/18.
 */
/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 16/10/18.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { colors } from '../../styles/index.style';
import Data from '../../config/data.json';
import { servieGetStates } from '../../services/Home.service';
const GOOGLE_API_KEY = 'AIzaSyB7-8qph-zszuxivIm7cwT5b37D22bm1A4';
const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1.id !== r2.id,
});
const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataSource: ds.cloneWithRows([]),
            value: '',
            data: [],
        };
        this.searchLocation = this.searchLocation.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.renderSeparator = this.renderSeparator.bind(this);
        this.onInputCleared = this.onInputCleared.bind(this);
    }
    componentWillMount() {
        servieGetStates().then((data) => {
            if(!data.error) {
                this.setState({ data: data.data });
            }
        })
    }

    async searchLocation(query) {
        this.setState({ isLoading: true, value: query });
        const tempData = this.state.data.filter((val) => {
            if(val.name.toLowerCase().indexOf(query.toLowerCase()) > -1) {
                return true;
            }
        })
        this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(tempData),
        });
    }

    renderRow(prediction) {
        return (
            <TouchableOpacity
                onPress={() => this.onListItemClicked(prediction)}
                style={styles.listItem}
            >
                <Text>{prediction.name}</Text>
            </TouchableOpacity>
        );
    }

    renderSeparator() {
        return <View style={styles.listItemSeparator} />;
    }

    onInputCleared() {
        this.setState({
            value: '',
            isLoading: false,
            dataSource: ds.cloneWithRows([]),
        });
    }

    async onListItemClicked(prediction) {
        console.log('prediction', prediction);
        this.props.onSelection(prediction.amount);
        this.setState({
            value: prediction.name,
            dataSource: ds.cloneWithRows([]),
            isLoading: true,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    ref={(r) => { this.props.inputRef && this.props.inputRef(r) }}
                    value={this.state.value}
                    style={styles.inputStyle}
                    isLoading={this.state.isLoading}
                    onChangeText={this.searchLocation}
                    onInputCleared={this.onInputCleared}
                />
                <View style={styles.listViewContainer}>
                    <ListView
                        keyboardShouldPersistTaps="always"
                        enableEmptySections
                        style={styles.listView}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                        renderSeparator={this.renderSeparator}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    progressiveInput: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    listViewContainer: {
        flex: 0,
        maxHeight: 200,
    },
    listView: {
        backgroundColor: 'white',
        // margin: 10,
    },
    listItem: {
        padding: 10,
    },
    listItemSeparator: {
        borderWidth: 0.5,
        borderColor: 'lightgrey',
    },
    inputStyle: {
        height: 40,
        borderBottomWidth: 3,
        borderBottomColor: colors.white,
        marginTop: 10,
        color: colors.white,
        fontSize: 16,
        fontFamily: 'Roboto'
    }
});