const initialState = {
  status: 'All',
  colors: [],
}

export default function filtersReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case 'filters/statusFilterChanged': {
      return {
        ...state,
        status: payload,
      }
    }
    case 'filters/colorFilterChanged': {
      const { color, changeType } = payload

      switch (changeType) {
        case 'added': {
          if (state.colors.includes(color)) {
            return state
          }

          return {
            ...state,
            colors: state.colors.concat(color),
          }
        }
        case 'removed': {
          return {
            ...state,
            colors: state.colors.filter(
              (existingColor) => existingColor !== color
            ),
          }
        }
        default:
          return state
      }
    }
    default:
      return state
  }
}
