import { Action } from "./ActionType";
import { PollReducer_Types } from "./CurrentPollReducer";
import IPollData from "./Poll";
import { doc, updateDoc, getDocs, collection, getDoc } from "firebase/firestore";
import db from "./firebase";
import { ThunkAction } from "redux-thunk";
import { RootState } from "./Store";


function setPollAction(payload: IPollData, actionType: string) {
    return {
        type: actionType,
        payload: payload
    };
}

function setOtherPollsAction(payload: IPollData[], actionType: string) {
    return {
        type: actionType,
        payload: payload
    };
}

export const SetPoll = (poll: IPollData): Action => (setPollAction(poll, PollReducer_Types.SET_POLL));

export const SetOtherPolls = (polls: IPollData[]): Action => (setOtherPollsAction(polls, PollReducer_Types.SET_ALL_OTHER_CURRENT_POLLS))

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

export const GetCurrentPolls = (pollId: string): ThunkAction<void, RootState, null, Action> => async (dispatch, getState) => {
    const collectionRef = collection(db, "polls");

    const docsSnap = await getDocs(collectionRef);

    var tempPollArr: IPollData[] = []

    if (!docsSnap.empty) {
        docsSnap.forEach(doc => {
            if (doc.id === pollId) {
                dispatch(SetPoll(doc.data() as IPollData))
            } else {
                tempPollArr.push(doc.data() as IPollData)
            }
        })

        dispatch(SetOtherPolls(tempPollArr))
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}

export const WritePoll = (poll: IPollData, id: string): ThunkAction<void, RootState, null, Action> => async (dispatch, getState) => {
    const docRef = doc(db, "polls", id);
    await updateDoc(docRef, { Options: poll.Options, Title: poll.Title, Votes: poll.Votes });
}