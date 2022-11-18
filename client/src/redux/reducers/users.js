
import {
    USERS_LOADED,
    USERS_ERROR,
    USERS_DELETE,
} from '../actions/types';

const initialState = {
    loading: true,
    users: [],
};

export default function useres (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case USERS_LOADED:
            return {
                ...state,
                loading: false,
                users: payload,
            };
        case USERS_ERROR:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}
