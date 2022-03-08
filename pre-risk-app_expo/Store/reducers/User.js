import user_action_types from "../actions/types/User";

const INITIAL_STATE = {
  logged_user: {
    _id: null,
    cnpj: null,
    name: null,
    email: null,
    password: null,
    isLogged: false,
    authenticationToken: null,
  }
}

export default function reduce(state = INITIAL_STATE, action){
  if (action.type === user_action_types.LOGIN) {
    return {
      ...state,
      logged_user: action.user
    }
  }

  if (action.type === user_action_types.LOGOUT) {
    return {
      ...state,
      logged_user: {...action.user}
    }
  }

  return state;
}
