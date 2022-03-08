import action_types from '../actions/types/APP_Config';
import { DEFAULT_THEME } from '../../src/style/themes';


const INITIAL_STATE = {
  app_theme: DEFAULT_THEME,
}

export default function reduce(state = INITIAL_STATE, action) {

  return action.type === action_types.update_config
    ? { ...state, ...action.config }
    : state
  
}
