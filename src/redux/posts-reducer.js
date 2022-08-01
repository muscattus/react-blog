import { ACTION_TYPES } from "../constants/constants";
import { getPosts } from '../api/api';

let initialState= {"posts":[
    {
        "_id": "cBUSvno72",
        "author": "Sasha",
        "date": "Mon, 20 Jun 2021 00:00:00 GMT",
        "title": "Post number one",
        "image": "https://picsum.photos/id/606/300/400",
        "text": [
            {
                "p": "Hello Wordl!"
            },
            {
                "h2": "Important message"
            },
            {
                "p": "This is my first post"
            }
        ],
        "comments": [
            {
                "Slava": "Hi!"
            }
        ],
        "rating": 2.5,
        "likes": [
            "Slava",
            "Umka"
        ],
        "category": "Inspiration",
        "tags": [
            "Inspiration",
            "Life"
        ],
        "__v": 0
    }
    // {
    //     "_id": "pESrrT4q4",
    //     "author": "Slava",
    //     "date": "Tue, 14 Jun 2021 00:00:00 GMT",
    //     "title": "Post number two",
    //     "image": "https://picsum.photos/id/465/300/200",
    //     "text": [
    //         {
    //             "p": "Glory to Ukraine!"
    //         },
    //         {
    //             "p": "Glory to the heroes"
    //         }
    //     ],
    //     "comments": [],
    //     "rating": 4,
    //     "likes": [
    //         "Sasha",
    //         "Umka",
    //         "Emma Garcia"
    //     ],
    //     "category": "Inspiration",
    //     "tags": [
    //         "Inspiration",
    //         "War"
    //     ],
    //     "__v": 0
    // }
]};

export const addComment = (commentText) => {
    return {
        type: ACTION_TYPES.addComment,
        commentText: commentText,
    }
}

export const addRating = (postId) => {
    return {
        type: ACTION_TYPES.addRating,
        postId: postId,
    }
}

export const openPost = (postPreview) => {
    return {
        type: ACTION_TYPES.openPost,
        postId: postPreview,
    }
}

export const goToPage = (page) => {
    return {
        type: ACTION_TYPES.goToPage,
        page: page,
    }
}
export const togglePostsFetching = (isFetching) => {
    return {
        type: ACTION_TYPES.togglePostsFetching,
        isFetching: isFetching
    }
}

export const setPosts = (posts) => {
    return {type: ACTION_TYPES.setPosts, posts}
}
export const setTotalCount = (totalCount) => {
    return {type: ACTION_TYPES.setTotalCount, totalCount}
}


export const loadPostsThunk = (skip, limit) => {
    return (dispatch) => {
        dispatch(togglePostsFetching(true));
        getPosts(skip, limit).then(response => {
            dispatch(setPosts(response.data.posts));
            dispatch(setTotalCount(response.data.totalCount));
            dispatch(togglePostsFetching(false));
        })
    }
}

// export const addCommentActionCreator= (commentText) => {
//     return {
//         type: ACTION_TYPES.addComment,
//         commentText: commentText,
//     }
// }

// export const addRatingActionCreator= (postId) => {
//     return {
//         type: ACTION_TYPES.addRating,
//         postId: postId,
//     }
// }

// export const goToPageActionCreator= (page) => {
//     return {
//         type: ACTION_TYPES.goToPage,
//         page: page,
//     }
// }
// export const togglePostsFetchingActionCreator= (isFetching) => {
//     return {
//         type: ACTION_TYPES.togglePostsFetching,
//         isFetching: isFetching
//     }
// }

// export const setPostsActionCreator = (posts) => {
//     return {type: ACTION_TYPES.setPosts, posts}
// }
// export const setTotalCountActionCreator = (totalCount) => {
//     return {type: ACTION_TYPES.setTotalCount, totalCount}
// }


let initState = {
    posts: [],
    pageSize: 10,
    currentPage: 1,
    isFetching: false,
    postPreview: null
};


export const posts = (state = initState, action) => {
    switch(action.type){
        // case ACTION_TYPES.addComment: {
        //     return {
        //         ...state,
        //         posts: {
        //             newComment: '',
        //             movies: [...state.movies.movies, mov]
        //         }
        // }
        case ACTION_TYPES.addRating: {
            return {
                ...state,     
                posts: state.posts.map(post => {
                    if (post._id === action.postId) {
                        return {...post, rating: post.rating + 1 }
                    }
                    return post;
                })
            }
        }
        case ACTION_TYPES.setPosts: {
            return {...state, posts: [...action.posts]}
        }
        case ACTION_TYPES.setTotalCount: {
            return {...state, totalCount: action.totalCount}
        }
        case ACTION_TYPES.goToPage: {
            return {...state, currentPage: action.page}
        }
        case ACTION_TYPES.togglePostsFetching: {

            return {...state, isFetching: action.isFetching}
        }
        case ACTION_TYPES.openPost: {
            return {...state, postPreview: action.postPreview}
        }
        default:
            return state;
    }
}