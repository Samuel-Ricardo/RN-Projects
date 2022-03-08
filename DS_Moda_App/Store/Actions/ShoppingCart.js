import action_types from './Types/ShoppingCart'

export function updateCart(data) {

  if (data) {

    return {
      type: action_types.update_cart,
      data: data,
    }
  }

}

export function cleanCart() {

  return {
    type: action_types.clean_cart,
    data: {},
  }
}

export function setCart(data) {

  return {
    type: action_types.set_cart,
    data: data,
  }
}

export function addItem(item) {

  if (item) {

    return {
      type: action_types.add_item,
      data: item,
    }
  }

}


export function removeItem(item) {

  if (item) {

    return {
      type: action_types.remove_item,
      data: item,
    }
  }

}


