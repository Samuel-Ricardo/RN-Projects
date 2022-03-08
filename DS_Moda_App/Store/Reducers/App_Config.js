import { DEFAULT_THEME } from '../../src/Style/Themes'

const INITIAL_STATE = {

  app_theme: DEFAULT_THEME
}

export default function reduce(state = INITIAL_STATE, action) {

  console.log("")
  console.log("App Config Reduce Called")
  console.log("")
  console.log("Reduce State:")
  console.log("")
  console.log(state)
  console.log("")
  console.log("Reduce Action:")
  console.log("")
  console.log(action)
  console.log("")

  if(action.type === "UPDATE_CONFIG") {

    console.log("")
    console.log("Action: || UPDATE_CONFIG ||")
    console.log("")
    console.log("")
    console.log("State Changed")
    console.log("")
    console.log("Old State:")
    console.log("")
    console.log(state)
    console.log("")
    console.log("New State:")
    console.log("")
    console.log(
      {
        ...state,
        ...action.new_config
      }
    )
    console.log("")

    return {
      ...state,
      ...action.new_config
    }
  }

  return state;
}
