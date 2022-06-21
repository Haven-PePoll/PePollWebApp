import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { ThunkAction } from "redux-thunk";
import { Action } from "./ActionType";
import db from "./firebase";
import OnlineStatus from "./OnlineStatus";
import { OnlineState, OnlineStatusReducer_Types } from "./OnlineStatusReducer";
import RatingData from "./Rating";
import { RatingReducer_Types } from "./RatingReducer";
import { RootState } from "./Store";

function setOnlineStatusAction(actionType: string, payload: OnlineStatus) {
    return {
        type: actionType,
        payload: payload
    };
}

export const SetOnlineStatus = (onlineStatus: OnlineStatus): Action => (setOnlineStatusAction(OnlineStatusReducer_Types.SET_STATUS, onlineStatus))


export const GetOnlineStatus = (name: String): ThunkAction<void, RootState, null, Action> => async (dispatch, getState) => {
    const collectionRef = collection(db, "onlineStatus");

    const minutesToSubtract = -30;
    const lastExpectedDate = new Date();
    lastExpectedDate.setMinutes(new Date().getMinutes() - 20)

    const unixTimestamp = Math.floor(lastExpectedDate.getTime() / 1000);

    const q = query(collectionRef, where("location", "==", name), where("timestamp", ">", unixTimestamp), orderBy("timestamp", "desc"), limit(1));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        querySnapshot.forEach(doc => {
            dispatch(SetOnlineStatus(doc.data() as OnlineStatus))
        })
    } else {
        console.log("No such document!");
        dispatch(SetOnlineStatus({} as OnlineStatus));
    }
}
