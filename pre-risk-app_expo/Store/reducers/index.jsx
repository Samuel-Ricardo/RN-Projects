import { combineReducers } from 'redux';

import APP_Config from './APP_Config'
import User from './User'
import Documents from './Documents'

export default combineReducers({
  app_config: APP_Config,
  User,
  Documents,
})
