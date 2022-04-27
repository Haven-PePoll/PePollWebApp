import { Action } from "./ActionType";
import { PollReducer_Types } from "./CurrentPollReducer";
import IPollData from "./Poll";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import db from "./firebase";
import { ThunkAction } from "redux-thunk";
import { RootState } from "./Store";


function setPollAction(payload: IPollData, actionType: string) {
    return {
        type: actionType,
        payload: payload
    };
}

export const SetPoll = (poll: IPollData): Action => (setPollAction(poll, PollReducer_Types.SET_POLL));

export const GetPoll = (pollId: string): ThunkAction<void, RootState, null, Action> => async (dispatch, getState) => {
    const docRef = doc(db, "polls", pollId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        dispatch(SetPoll(docSnap.data() as IPollData))
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}

export const WritePoll = (poll: IPollData, id: string): ThunkAction<void, RootState, null, Action> => async (dispatch, getState) => {
    const docRef = doc(db, "polls", id);
    await updateDoc(docRef, {Options: poll.Options, Title: poll.Title, Votes: poll.Votes});
}