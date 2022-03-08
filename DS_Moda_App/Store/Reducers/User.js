import UserActionTypes from "../Actions/Types/User"

const INITIAL_STATE = {

  loggedUser: {
    id: null,
    name: null,
    email: null,
    isLogged: false,
    authenticationToken: null,
    favoriteItems: [],
  }
}

export default function reduce (state = INITIAL_STATE, action) {

  console.log("")
  console.log("User Reduce Called")
  console.log("")
  console.log("Reduce State:")
  console.log("")
  console.log(state)
  console.log("")
  console.log("Reduce Action:")
  console.log("")
  console.log(action)
  console.log("")


  if (action.type === UserActionTypes.LOGIN) {

    console.log("")
    console.log("Action: || LOGIN_USER ||")
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
    console.log({...state, loggedUser: action.user})
    console.log("")

    return {
      ...state,
      loggedUser: action.user
    }
  }

  if (action.type === UserActionTypes.LOGOUT) {

    console.log("")
    console.log("Action: || LOGOUT_USER ||")
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
    console.log({ ...state, loggedUser: action.user })
    console.log("")

    return {
      ...state,
      loggedUser: action.user
    }
  }

  if (action.type === UserActionTypes.ADD_FAV) {

    console.log("")
    console.log("Action: || ADD_FAV ||")
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
    console.log({
      ...state,
      favoriteItems: [...state.loggedUser.favoriteItems, action.item_id]
    })
    console.log("")

    return {
      ...state,
      favoriteItems: [...state.loggedUser.favoriteItems, action.item_id]
    }
  }
      if (action.type === UserActionTypes.UPDATE_FAV) {

        console.log("")
        console.log("Action: || UPDATE_FAV_ITEM ||")
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
        console.log({
          ...state,
          loggedUser: {
            ...state.loggedUser,
          favoriteItems:[...action.favorites]
          }
        })
        console.log("")

        return {
          ...state,
          loggedUser: {
            ...state.loggedUser,
            favoriteItems: [...action.favorites]
          }
        }
  }

  return state
}
