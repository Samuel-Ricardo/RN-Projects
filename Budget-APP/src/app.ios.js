/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 22/07/18.
 */

import React from 'react'; // eslint-disable-line
import { Provider } from 'react-redux';
import codepush from 'react-native-code-push';
import { Navigation } from 'react-native-navigation';
import { AsyncStorage } from 'react-native';
import { registerScreens } from './screens.navigation';
import Store from './store';
import { getWidthByPerc } from './styles/StyleUtils.style';
import { actionGetBudgetFromServer } from './actions/Budget.action';
import { checkToken } from './actions/Auth.action';
// const store = configureStore();

codepush.sync({
    updateDialog: false,
    installMode: codepush.InstallMode.IMMEDIATE,

})
registerScreens(Store, Provider);
// Store.dispatch(actionGetHomeData());
const navigatorStyle = {
    navBarTranslucent: false,
    drawUnderNavBar: false,
    navBarTextColor: 'white',
    navBarButtonColor: 'white',
    statusBarTextColorScheme: 'light',
    drawUnderTabBar: true,
    navBarHidden: true,
    drawUnderStatusBar: true,
    statusBarColor: '#FFFFFF',
    statusBarTextColorSchemeSingleScreen: 'light'

};


AsyncStorage.getItem('auth_user').then((value) => {
    // Store.dispatch(checkToken());
    if(value) {
        Store.dispatch(checkToken(value));
        Store.dispatch(actionGetBudgetFromServer());
        Navigation.startSingleScreenApp({
            screen: {
                screen: 'survey.Result',
                title: 'Result',
                navigatorStyle
            },
            animationType: 'fade'
        });
    } else {
        Navigation.startSingleScreenApp({
            screen: {
                screen: 'survey.Signup',
                title: 'Signup',
                navigatorStyle
            },
            animationType: 'fade'
        });
    }
});
