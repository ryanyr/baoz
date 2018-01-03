import reducer from "../reduce/reduce";
import {createStore , applyMiddleware} from "redux";

import thunk from "redux-thunk";

var store = createStore(reducer,applyMiddleware(thunk));


export default store;
