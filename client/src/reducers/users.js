const initState = {
  data: [],
  isLoading: false,
  error: ''
}

export default function users(state = initState, action) {
  switch (action.type) {
    case 'SET_USERS_LOADING': {
      return {
        ...state,
        isLoading: action.payload
      }
    }
    case 'SET_USERS_ERROR': {
      return {
        ...state,
        error: ''
      }
    }
    case 'SET_USERS_DATA': {
      return {
        ...state,
        data: action.payload,
        isLoading: false
      }
    }

    default:
      return { ...state }
  }
}
