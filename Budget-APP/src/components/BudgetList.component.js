/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 28/09/18.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ListView, Text, StyleSheet, Image, ImageBackground, Platform, TextInput, KeyboardAvoidingView } from 'react-native';
import StylesObj, {colors} from "../styles/index.style";
import BudgetItem from './BudgetListItem.component';

class BudgetList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    _pressData: { };
    componentDidMount() {

    }

    _renderRow(rowData, sectionId, rowId, highlightRow: (sectionId, rowId) => void) {
        const rowHash = Math.abs(hashCode(rowData));
        return (<BudgetItem
            callNotificationMethod={this.props.callNotificationMethod}
            handleTextChange={this.props.handleTextChange}
            rowData={rowData}
            rowId={rowId}
            handleLock={this.props.handleLock}
            max_percentage={this.props.max_percentage}
            max_amount={this.props.max_amount}
        />)
    }

    handleSelection() {
        const tempPressData = this._pressData;
        const tempData = [];
        Object.keys(this._pressData).forEach((val) => {
            if(tempPressData[val]) {
                tempData.push((this.props.budget_data[val]).text);
            }
        });
        this.props.saveCategorySelection(tempData)
    }
    render() {
        return(
            <View style={{flex: 1}}>
                <ListView
                    keyboardShouldPersistTaps={'never'}
                    dataSource={this.props.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    style={{ flex: 1 }}

                />
            </View>
        );
    }
}

const hashCode = function(str) {
    let hash = 15;
    for (let ii = str.length - 1; ii >= 0; ii--) {
        hash = ((hash << 5) - hash) + str.charCodeAt(ii);
    }
    return hash;
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    thumb: {
        width: 35,
        height: 35,
    },
    text: {
        flex: 1,
        paddingLeft: 10,
        fontSize: 18,
        color: colors.black
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listText: {
        color: colors.black
    },
    paddingVertical: {
        paddingVertical: 5
    },
    lockImage: {
        width: 15,
        height: 20,
    },
    percentageInput: {
        width: 30,
        paddingVertical: 0,
        textAlign: 'center'
    },
    amountInput: {
        width: 50,
        paddingVertical: 0,
        textAlign: 'center',

    },
    inputUnderLine: {
        borderBottomColor: colors.blue,
        borderBottomWidth: 1,

    }
});

BudgetList.propTypes = {
    multipleSelect: PropTypes.bool,
    saveCategorySelection: PropTypes.func.isRequired,
    auto_close: PropTypes.bool,
    selection: PropTypes.bool,
    showonly: PropTypes.bool,
    budget_data: PropTypes.array.isRequired
};
BudgetList.defaultProps = {
    multipleSelect: true,
    auto_close: false,
    selection: true,
    showonly: false
}

export default BudgetList;