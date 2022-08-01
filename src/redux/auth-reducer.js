import { ACTION_TYPES } from "../constants/constants";
import { loginAPI, authGetUser } from '../api/api';
import { getCookie, setCookie } from "../helpers/cookie";

export const setUser = (userName, userId, fullName, loggedIn) => {
    return {
        type: ACTION_TYPES.setUser,
        userName: userName,
        userId: userId,
        fullName: fullName,
        loggedIn: loggedIn
    }
}

export const logout = () => {
    return {
        type: ACTION_TYPES.logout,
        userName: null,
        userId: null,
        fullName: null,
        loggedIn: false
    }
}

let initState = {
    userId: '',
    userName: '',
    fullName: '',
    loggedIn: false
};

export const authentication = (state = initState, action) => {
    switch(action.type){
        case ACTION_TYPES.setUser: {
            return {...state, userName: action.userName, userId: action.userId, fullName: action.fullName, loggedIn: action.loggedIn}
        }
        case ACTION_TYPES.logout: {
            return {...state, userName: action.userName, userId: action.userId, fullName: action.fullName, loggedIn: action.loggedIn}
        }
        default: {
            return state
        }
    }
}

export const loginThunk = (loginData) => {
    return (dispatch) => {
        loginAPI(loginData).then(response => {
            const userData = response.data;
            setCookie({'token': response.data.accessToken});
            dispatch(setUser(userData.username, userData.id, userData.fullname, true));
        });
    }
}

export const logoutThunk = () => {
    return (dispatch) => {
            const emptyCookie = {
              token: '',
              refreshToken: '',
            };
            setCookie(emptyCookie);
        dispatch(logout());
    }
}

export const getUserThunk = () => {
    return (dispatch) => {
        authGetUser().then(response => {
            const userData = response.data;
            dispatch(setUser(userData.username, userData.id, userData.fullname, true));
        })

    }
}


// export function getCookie(name) {
//     // eslint-disable-next-line no-useless-escape
//     const matches = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`));
  
//     return matches ? decodeURIComponent(matches[1]) : undefined;
//   }
  
//   export function setCookie(cookies) {
//     Object.keys(cookies).forEach(key => {
//       document.cookie = `${key}=${cookies[key]};path=/`;
//     });
//   }
  
//   export function isTokenValid() {
//     return getCookie('token');
//   }