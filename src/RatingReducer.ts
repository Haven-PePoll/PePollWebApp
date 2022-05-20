import { Action } from "./ActionType"
import RatingData from "./Rating";

export enum RatingReducer_Types {
    SET_RATINGS = "SET_RATINGS",
}

export interface RatingState {
    ratings: RatingData[]
}

const initialState: RatingState = {
    ratings: []
}

export const RatingReducer = (state: RatingState = initialState, action: Action): RatingState => {
    switch (action.type) {
        case RatingReducer_Types.SET_RATINGS:
            return {
                ratings: action.payload
            }
        default:
            return state
    }
};
