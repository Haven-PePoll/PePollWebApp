
import { Action } from "./ActionType"
import IPollData from "./Poll";

export enum PollReducer_Types {
  SET_POLL = "SET_POLL"
}

export interface PollState {
    currentPoll:IPollData
}

const initialState: PollState = {
    currentPoll: {} as IPollData
}

export const PollReducer = (state: PollState = initialState, action: Action): PollState => {
  switch (action.type) {
    case PollReducer_Types.SET_POLL:
      return {
          currentPoll: action.payload
      }
    default:
      return state
  }
};
