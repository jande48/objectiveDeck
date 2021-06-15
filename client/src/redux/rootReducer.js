import { combineReducers } from 'redux'
import chartsReducer from './charts/chartsReducer'
import usersReducer from './users/usersReducer'

const rootReducer = combineReducers({

  chartsFromRootReducer: chartsReducer,
  usersFromRootReducer: usersReducer,


})

export default rootReducer