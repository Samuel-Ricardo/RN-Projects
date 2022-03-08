import { AsyncStorage } from "react-native";
import user_action_types from "./types/User";

export function login(user, token) {
  const logged_user = { ...user, authenticationToken: token, isLogged: true }

  AsyncStorage.setItem('@pre-risk:logged_user', JSON.stringify(logged_user))

  return ({
    type: user_action_types.LOGIN,
    user: logged_user
  })
}
export function logout(user_data) {
  const user = { ...user_data, isLogged: false }

  AsyncStorage.removeItem('@pre-risk:logged_user');


  return ({
    type: user_action_types.LOGOUT,
    user
  })
}
