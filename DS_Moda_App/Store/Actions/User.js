import UserActionTypes from "./Types/User"

export function loginUser (user) {

  const loggedUser = {...user, isLogged: true}

  return({
    type: UserActionTypes.LOGIN,
    user: loggedUser
  })

}

export function logoutUser(userData) {

  const user = {...userData, isLogged: false}

  return({
    type: UserActionTypes.LOGOUT,
    user
  })
}

export function addFavorite(itemID) {

  return({
    type: UserActionTypes.ADD_FAV,
    item_id: itemID,
  })
}

export function updateFavorites(favorite_items) {

  return({
    type:  UserActionTypes.UPDATE_FAV,
    favorites: favorite_items,
  })
}
