const initialState = { items: [], offset: 0 }

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ITEMS":
      return { ...state, items: action.payload }
    case "INCREMENT_OFFSET":
      return { ...state, offset: action.payload }
    default:
      return state
  }
}

export default itemReducer
