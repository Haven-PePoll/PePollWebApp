import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { ThunkAction } from "redux-thunk";
import { Action } from "./ActionType";
import { IFeedbackData } from "./Feedback";
import db from "./firebase";
import { RootState } from "./Store";

export const SetFeedback = (feedback: IFeedbackData): ThunkAction<void, RootState, null, Action> => async (dispatch, getState) => {
    await addDoc(collection(db, "feedbacks"), feedback);
}