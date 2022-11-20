const baseUrl = "https://dummyjson.com"

export const fetchItems = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_IS_LOADING",
      payload: true,
    })

    const offset = getState().itemReducer.offset
    const url = `${baseUrl}/products?limit=10&skip=${offset}`

    const currentItems = getState().itemReducer.items

    fetch(url)
      .then(async (res) => {
        const data = await res.json()

        if (!res.ok) {
          const error = (data && data.message) || res.statusText
          return Promise.reject(error)
        }
        return data
      })
      .then((result) => {
        const finalItems = currentItems.concat(result.products)

        dispatch({
          type: "SET_IS_LOADING",
          payload: false,
        })
        dispatch({
          type: "FETCH_ITEMS",
          payload: finalItems,
        })
        dispatch({
          type: "INCREMENT_OFFSET",
          payload: offset + 10,
        })
      })
      .catch((err) => {
        console.log(err)
      })

    //     setPage(page + limit)
    //     setItems((prevItems) => [...prevItems, ...res.data.products])
    //     setTempItems((prevItems) => [...prevItems, ...res.data.products])
  }
}

export const addItem = (payload) => {
  return () => {
    const url = `${baseUrl}/products/add`
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
  }
}

export const updateItem = (id, payload) => {
  return () => {
    const url = `${baseUrl}/products/${id}`
    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
  }
}

export const deleteItem = (id) => {
  return () => {
    const url = `${baseUrl}/products/${id}`
    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
  }
}

export const fetchNextPage = (id) => {
  return (dispatch, getState) => {
    getState
  }
}
