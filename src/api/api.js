import * as axios from 'axios';
import { BASE_API } from '../constants/constants';
import { getCookie } from '../helpers/cookie';


const blogAxios = axios.create({
    baseURL: BASE_API,
    headers: {
        Authorization: `Bearer ${getCookie('token')}`
        // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmM2OWIwMTI2NGI5NDczOTM0ZTRlNCIsImlhdCI6MTY1NzE3OTQwOSwiZXhwIjoxNjU3MjY1ODA5fQ.WJiMZ3V8gZpOIteYc1xlK8PlFRGD_uKRVNs_r_rca6Y`      
    }
})

export const getPosts = (skip, limit) => {
    return blogAxios.get(`posts?skip=${skip}&limit=${limit}`);
}

export const getSinglePost = (postId) => {
    return blogAxios.get(`post/${postId}`);
}
export const getPostComments = (postId) => {
    return blogAxios.get(`comments/${postId}`);
}

export const addPostRating = (postId) => {
    return blogAxios.patch('posts', {"_id": postId });
}

export const likePost = (postId, userId) => {
    return blogAxios.post('like', {"_id": postId, user: userId });
}
export const unlikePost = (postId, userId) => {
    return blogAxios.post('unlike', {"_id": postId, user: userId });
}

export const saveComment = (commentData) => {
    return blogAxios.post('comment', commentData);
}

export const loginAPI = (loginData) => {
    const credentials = {username: loginData.login, password: loginData.password};
    return blogAxios.post('auth/signin', credentials);
}

export const authGetUser = () => {
    return blogAxios.get('auth/user');
}

// app.post(
//     "/api/auth/signin", async (req, res) => {
//         controller.signin(req, res);
//     }
// );