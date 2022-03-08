import { documents_action_types } from "./types/Documents";


//////////////////////////SET_ACTIONS///////////////////////////////////
export function setDriver(driver) {
  return {
    type: documents_action_types.SET.DRIVER,
    driver,
  }
}

export function setHelper(helper) {
  return {
    type: documents_action_types.SET.HELPER,
    helper,
  }
}

export function setVehicle(vehicle) {
  return {
    type: documents_action_types.SET.VEHICLE,
    vehicle,
  }
}
///////////////////////REMOVE_ACTIONS//////////////////////////////////
export function removeDriver() {
  return {
    type: documents_action_types.REMOVE.DRIVER,
  }
}

export function removeHelper() {
  return {
    type: documents_action_types.REMOVE.HELPER,
  }
}

export function removeVehicle() {
  return {
    type: documents_action_types.REMOVE.VEHICLE,
  }
}
///////////////////////////////////////////////////////////////////////////
