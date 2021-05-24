
const reducer = (state = {
  myList: [],
  recommendations: []
}, action) => {
  switch (action.type) {
    case 'setData': {
      return {
        ...state,
        myList: action['payload']['myList'],
        recommendations: action['payload']['recommendations'],
      }
    }
    case 'add': {
      const data = action.payload;
      const { id } = data;
      return {
        ...state,
        myList: [...state.myList, data],
        recommendations: state.recommendations.filter((da) => {
          return da['id'] != id;
        })
      }
    }
    case 'delete': {
      const data = action.payload;
      const { id } = data;
      return {
        ...state,
        myList: state.myList.filter((da) => {
          return da['id'] != id;
        }),
        recommendations: [...state.recommendations, data],
      };
    }
    default: 
      return state
  }
}

export default reducer;