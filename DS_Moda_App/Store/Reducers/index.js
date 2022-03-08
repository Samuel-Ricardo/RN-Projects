import {
  combineReducers
} from 'redux'

import User from "./User"
import App_Config from './App_Config'
import ShoppingCart from './ShoppingCart'

export default combineReducers({

  User,
  app_config: App_Config,
  shopping_cart: ShoppingCart,
})
