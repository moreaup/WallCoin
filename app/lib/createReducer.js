import { AsyncStorage } from 'react-native';

export default function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      const stateReturned = handlers[action.type](state, action)
      
      if (stateReturned && stateReturned && (stateReturned.list.length > 0 || stateReturned.listFav.length > 0)) {
        AsyncStorage.setItem('@store:state', JSON.stringify({ "cryptoCurencies": stateReturned }))
          .then(resp => {
            console.log("resp :", resp);
          })
          .catch(error => {
            console.error("error :", error);
          });
      }

      return stateReturned;
    } else {
      return state;
    }
  }
}
