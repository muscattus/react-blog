import { ACTION_TYPES } from "../constants/constants";

let initState = {
    showSignupWindow: false
};

export const showSignup = () => {
    return {type: ACTION_TYPES.showSignup}
}
export const hideSignup = () => {
    return {type: ACTION_TYPES.hideSignup}
}


export const signupWindow = (state = initState, action) => {
    switch(action.type){
        case ACTION_TYPES.showSignup: {
            return {...state, showSignupWindow: true}
        }
        case ACTION_TYPES.hideSignup: {
            return {...state, showSignupWindow: false}
        }
        default: {
            return state
        }
    }
}