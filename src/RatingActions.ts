import { collection, getDocs, query, where } from "firebase/firestore";
import { ThunkAction } from "redux-thunk";
import { Action } from "./ActionType";
import db from "./firebase";
import RatingData from "./Rating";
import { RatingReducer_Types } from "./RatingReducer";
import { RootState } from "./Store";

function setRatingsAction(payload: RatingData[], actionType: string) {
    return {
        type: actionType,
        payload: payload
    };
}

export const SetRatings = (polls: RatingData[]): Action => (setRatingsAction(polls, RatingReducer_Types.SET_RATINGS))


export const GetRatings = (name:String): ThunkAction<void, RootState, null, Action> => async (dispatch, getState) => {
    const collectionRef = collection(db, "pollData");

    const q = query(collectionRef, where("location", "==", name));

    const querySnapshot = await getDocs(q);

    var tempPollArr: RatingData[] = []

    if (!querySnapshot.empty) {
        querySnapshot.forEach(doc => {
            tempPollArr.push(doc.data() as RatingData)
        })

        dispatch(SetRatings(tempPollArr))
    } else {
        console.log("No such document!");
    }
}
