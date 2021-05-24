
import dataJso from './data.json';
const reducer = (state = {
  myList: [],
  recommendations: []
}, action) => {
  switch (action.type) {
    case 'query': {
      return {
        ...state,
        myList: dataJso['mylist'],
        recommendations: dataJso['recommendations'],
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