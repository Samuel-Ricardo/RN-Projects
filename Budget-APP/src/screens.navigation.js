/**
 * Created by charanjeetelectrovese@gmail.com on system AakritiS. on 19/07/18.
 */
/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

// import Drawer from './components/Drawer'
import HomeScreen from './screens/QuestionList.screen';//antiga
//import HomeScreen from './screens/Result.screen'
import SuccessScreen from './screens/Success.screen';
//import ResultScreen from './screens/Result.screen';
import ResultScreen from './screens/Result.screen2';
import EditScreen from './screens/Edit.screen';
import NotificationScreen from './screens/Notification.screen';
import SingupScreen from './screens/Singup.screen';
import LoginScreen from './screens/Login.screen';
import SettingScreen from './screens/Settings.screen';
// import ViewPost from './screens/ViewPost.screen';
// import CategoryPost from './screens/CategoryPosts.screen';
// import Two from './screens/Two.screen';

export function registerScreens(store, Provider) {

    Navigation.registerComponent('survey.Home', () => HomeScreen, store, Provider);
    Navigation.registerComponent('survey.Success', () => SuccessScreen, store, Provider);
    Navigation.registerComponent('survey.Result', () => ResultScreen, store, Provider);
    Navigation.registerComponent('survey.Edit', () => EditScreen, store, Provider);
    Navigation.registerComponent('survey.Notification', () => NotificationScreen);
    Navigation.registerComponent('survey.Signup', () => SingupScreen, store, Provider);
    Navigation.registerComponent('survey.Login', () => LoginScreen, store, Provider);
    Navigation.registerComponent('survey.Setting', () => SettingScreen, store, Provider);
    // Navigation.registerComponent('wp.Drawer', () => Drawer, store, Provider);
}
