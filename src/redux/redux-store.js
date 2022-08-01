import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

import { posts } from './posts-reducer';
import { singlePost } from './single-post-reducer';
import { authentication } from './auth-reducer';
import { postComments } from './comments-reducer';
import { signupWindow } from './signup-reducer';


let reducers = combineReducers({
    posts: posts,
    post: singlePost,
    comments: postComments,
    form: formReducer,
    authentication: authentication,
    signupWindow: signupWindow
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));