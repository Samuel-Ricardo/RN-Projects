import actions from '../Actions/Types/ShoppingCart'

const INITIAL_STATE = {
  items: [],
  total_value: 0.00,

  cep_data: {
    bairro: '',
    cep: "",
    complemento: "",
    ddd: '',
    gia: '',
    ibge: '',
    localidade: "",
    logradouro: "",
    siafi: "",
    uf: "",
  },

  frete_data: {
    codigo: 4014,
    entregaDomiciliar: "S",
    entregaSabado: "N",
    erro: 0,
    msgErro: "",
    name: "",
    obsFim: "",
    prazoEntrega: 0,
    valor: 0.00,
    valorAvisoRecebimento: 0.00,
    valorMaoPropria: 0.00,
    valorSemAdicionais: 0.00,
    valorValorDeclarado: 0.00,
  },

  user:{},

  buy_date: Date.now(),
}

const RESET = {
  items: [],
  total_value: 0.00,

  cep_data: {
    bairro: '',
    cep: "",
    complemento: "",
    ddd: '',
    gia: '',
    ibge: '',
    localidade: "",
    logradouro: "",
    siafi: "",
    uf: "",
  },

  frete_data: {
    codigo: 4014,
    entregaDomiciliar: "S",
    entregaSabado: "N",
    erro: 0,
    msgErro: "",
    name: "",
    obsFim: "",
    prazoEntrega: 0,
    valor: 0.00,
    valorAvisoRecebimento: 0.00,
    valorMaoPropria: 0.00,
    valorSemAdicionais: 0.00,
    valorValorDeclarado: 0.00,
  },

  user:{},

  buy_date: Date.now(),
}

export default function reduce(state = INITIAL_STATE, action) {

  console.log("")
  console.log("Shopping Cart Reduce Called")
  console.log("")
  console.log("Reduce State:")
  console.log("")
  console.log(state)
  console.log("")
  console.log("Reduce Action:")
  console.log("")
  console.log(action)
  console.log("")

  if (action.type === actions.set_cart) {

    console.log("")
    console.log("Action: || SET_CART ||")
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
      ...action.data
    })
    console.log("")

    return {
      ...action.data
    }
  }

  if (action.type === actions.update_cart) {

    console.log("")
    console.log("Action: || UPDATE_CART ||")
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
      ...action.data
    })
    console.log("")

    return {
      ...state,
      ...action.data
    }
  }

  if (action.type === actions.clean_cart) {

    console.log("")
    console.log("Action: || CLEAN_CART ||")
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
      ...RESET,
      items: []
    })
    console.log("")

    return {
      ...RESET,

      items: []
    }
  }

  if (action.type === actions.add_item) {

    console.log("")
    console.log("Action: || ADD_ITEM ||")
    console.log("")

    const item = action.data

    const total_value = parseFloat((state.total_value + item.value).toFixed(2))

    const buy_date = Date.now()

    console.log("")
    console.log("State Changed")
    console.log("")
    console.log("Old State:")
    console.log("")
    console.log(state)
    console.log("")

    const items = state.items.push(item)

    console.log("New State:")
    console.log("")
    console.log({
      ...state,
      total_value,
      buy_date,
    })
    console.log("")

    return {
      ...state,
      total_value,
      buy_date,
    }
  }

  if (action.type === actions.remove_item) {

    console.log("")
    console.log("Action: || REMOVE_ITEM ||")
    console.log("")

    const item = action.data

    let calc = parseFloat(state.total_value.toFixed(2)) - parseFloat(item.value.toFixed(2))

    let total_value = 0

    if (calc > 0) {
      total_value = parseFloat(calc.toFixed(2))
    }

    const buy_date = Date.now()

    console.log("")
    console.log("State Changed")
    console.log("")
    console.log("Old State:")
    console.log("")
    console.log(state)
    console.log("")
    console.log("New State:")

    state.items.splice(state.items.indexOf(item), 1)

    console.log("")
    console.log({
      ...state,
      total_value,
      buy_date,
    })
    console.log("")

    return {
      ...state,
      total_value,
      buy_date,
    }
  }

  return state;
}
