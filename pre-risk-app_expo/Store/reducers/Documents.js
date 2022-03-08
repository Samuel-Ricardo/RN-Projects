import { documents_action_types } from '../actions/types/Documents'

const INITIAL_STATE = {
  driver: null,
  helper: null,
  vehicle: null
};

function actions_set(state, action) {
  if (action.type === documents_action_types.SET.DRIVER) {
    return {
      ...state,
      driver: { ...action.driver }
    }
  }

  if (action.type === documents_action_types.SET.HELPER) {
    return {
      ...state,
      helper: { ...action.helper }
    }
  }

  if (action.type === documents_action_types.SET.VEHICLE) {
    return {
      ...state,
      vehicle: { ...action.vehicle }
    }
  }

  return state
}

function actions_remove(state, action) {
  if (action.type === documents_action_types.REMOVE.DRIVER) {
    return {
      ...state,
      driver: INITIAL_STATE.driver
    }
  }

  if (action.type === documents_action_types.REMOVE.HELPER) {
    return {
      ...state,
      helper: INITIAL_STATE.helper 
    }
  }

  if (action.type === documents_action_types.REMOVE.VEHICLE) {
    return {
      ...state,
      vehicle: INITIAL_STATE.vehicle 
    }
  }

  return state;
}

export default function reduce(state = INITIAL_STATE, action) {

  let _state = state;

  _state = actions_set(_state, action);

  _state = actions_remove(_state, action);

  return _state;
}
