import { Action } from "./ActionType"
import OnlineStatus from "./OnlineStatus";

export enum OnlineStatusReducer_Types {
    SET_STATUS = "SET_STATUS",
}

export interface OnlineState {
    online : OnlineStatus
}

const initialState: OnlineState = {
    online: {} as OnlineStatus
}

export const OnlineStatusReducer = (state: OnlineState = initialState, action: Action): OnlineState => {
    switch (action.type) {
        case OnlineStatusReducer_Types.SET_STATUS:
            return {
                online: action.payload
            }
        default:
            return state
    }
};
