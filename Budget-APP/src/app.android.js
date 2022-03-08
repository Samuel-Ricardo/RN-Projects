/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 22/07/18.
 */

import React from 'react'; // eslint-disable-line
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { AsyncStorage } from 'react-native';
import codepush from 'react-native-code-push';
import { registerScreens } from './screens.navigation';
import Store from './store';
import { colors } from './styles/index.style';
import { getWidthByPerc } from './styles/StyleUtils.style';
import { checkToken } from './actions/Auth.action';
import { actionGetBudgetFromServer } from './actions/Budget.action';
// const store = configureStore();

registerScreens(Store, Provider);
// Store.dispatch(actionGetHomeData());

//codepush.sync({
    //updateDialog: false
    //installMode: codepush.InstallMode.IMMEDIATE,

//});
const navigatorStyle = {
    statusBarColor: 'transparent',
    statusBarTextColorScheme: 'light',
    navBarTitleTextCentered: true,
    navBarBackgroundColor: colors.headerColor,
    navBarTextColor: colors.headerFontColor,
    navBarButtonColor: colors.headerFontColor,
    drawUnderNavBar: true,
    navBarHideOnScroll: true,
    topBarElevationShadowEnabled: false,
    // tabBarHidden: true,
    navBarHidden: true,
    drawUnderStatusBar: true
};
AsyncStorage.getItem('auth_user').then((value) => {
    // Store.dispatch(checkToken());
    if(value) {
        Store.dispatch(checkToken(value));
        Store.dispatch(actionGetBudgetFromServer(value));
        //Store.dispatch(actionGetBudgetFromServer());
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



