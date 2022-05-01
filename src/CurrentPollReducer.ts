
import { Action } from "./ActionType"
import IPollData from "./Poll";

export enum PollReducer_Types {
  SET_POLL = "SET_POLL",
  SET_ALL_OTHER_CURRENT_POLLS = "SET_ALL_OTHER_CURRENT_POLLS"
}

export interface PollState {
  currentPoll: IPollData
  otherCurrentPolls: IPollData[]
}

const initialState: PollState = {
  currentPoll: {} as IPollData,
  otherCurrentPolls: []
}

export const PollReducer = (state: PollState = initialState, action: Action): PollState => {
  switch (action.type) {
    case PollReducer_Types.SET_POLL:
      return {
        ...state,
        currentPoll: action.payload
      }
    case PollReducer_Types.SET_ALL_OTHER_CURRENT_POLLS:
      return {
        ...state,
        otherCurrentPolls: action.payload
      }
    default:
      return state
  }
};
