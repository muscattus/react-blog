import { ACTION_TYPES } from "../constants/constants";
import { getPostComments, saveComment } from "../api/api";

let initState = {
    comments: [],
    isFetching: false
};

export const toggleCommentsFetching = (isFetching) => {
    return {
        type: ACTION_TYPES.toggleCommentsFetching,
        isFetching: isFetching
    }
}

export const setComments = (comments) => {

    return {type: ACTION_TYPES.setComments, comments}
}
export const addNewComment = (comment) => {

    return {type: ACTION_TYPES.addNewComment, comment}
}

export const loadCommentsThunk = (postId) => {
    return (dispatch) => {
        // dispatch(toggleCommentsFetching(true));
        getPostComments(postId).then(response => {
            dispatch(setComments(response.data));
            // dispatch(toggleCommentsFetching(false));
        })
    }
}

export const saveCommentThunk = (commentData) => {
    return (dispatch) => {
        saveComment(commentData).then(response => {
            const newComment = response.data;
            dispatch(addNewComment(newComment));
        });
    }
}

export const postComments = (state = initState, action) => {
    switch(action.type){
        case ACTION_TYPES.setComments: {
            return {...state, comments:  action.comments}
        }
        case ACTION_TYPES.addNewComment: {
            return {...state, comments:  [...state.comments, action.comment]}
        }
        case ACTION_TYPES.toggleCommentsFetching: {
            return {...state, isFetching: action.isFetching}
        }
        default: {
            return state
        }
    }
}