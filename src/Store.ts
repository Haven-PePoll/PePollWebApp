import { createStore, applyMiddleware, combineReducers } from "redux"; 
import { PollReducer } from "./CurrentPollReducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers({
    pollState:PollReducer
});

const Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default Store

export type RootState = ReturnType<typeof rootReducer>