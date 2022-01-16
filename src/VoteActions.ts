import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { ThunkAction } from "redux-thunk";
import { Action } from "./ActionType";
import db from "./firebase";
import { RootState } from "./Store";
import { IVoteData } from "./Vote";

export const SetVote = (vote: IVoteData): ThunkAction<void, RootState, null, Action> => async (dispatch, getState) => {
    await addDoc(collection(db, "votes"), vote);
}