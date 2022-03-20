import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import ROOT from "./reducers/index";

const Store = createStore(ROOT, {}, applyMiddleware(thunk));

export default Store;   