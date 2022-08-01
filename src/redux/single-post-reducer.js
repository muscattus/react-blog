import { ACTION_TYPES } from "../constants/constants";
import { likePost, getSinglePost, unlikePost, getPostComments } from '../api/api'

let initState = {
    post: {},
    isFetching: false
};

export const togglePostFetching = (isFetching) => {
    return {
        type: ACTION_TYPES.togglePostFetching,
        isFetching: isFetching
    }
}

export const setPost = (post) => {
    return {type: ACTION_TYPES.setPost, post}
}

export const loadPostThunk = (postId) => {
    return (dispatch) => {
        dispatch(togglePostFetching(true));
        getSinglePost(postId).then(response => {
            dispatch(setPost(response.data));
            dispatch(togglePostFetching(false));

        })
    }
}

export const likePostThunk = (postId, userId) => {
    return (dispatch) => {
        likePost(postId, userId).then(response => {
            if(response.data.acknowledged === true) {
                dispatch(loadPostThunk(postId));
            }
        });
    }
}
export const unlikePostThunk = (postId, userId) => {
    return (dispatch) => {
        unlikePost(postId, userId).then(response => {
            if(response.data.acknowledged === true) {
                dispatch(loadPostThunk(postId));
            }
        });
    }
}

export const singlePost = (state = initState, action) => {
    switch(action.type){
        case ACTION_TYPES.setPost: {
            return {...state, post: action.post}
        }
        case ACTION_TYPES.togglePostFetching: {
            return {...state, isFetching: action.isFetching}
        }
        default: {
            return state
        }
    }
}

