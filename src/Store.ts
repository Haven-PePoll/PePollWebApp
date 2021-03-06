import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { RatingReducer } from "./RatingReducer";
import { OnlineStatusReducer } from "./OnlineStatusReducer";

const rootReducer = combineReducers({
    ratingState: RatingReducer,
    onlineState: OnlineStatusReducer
});

const Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default Store

export type RootState = ReturnType<typeof rootReducer>