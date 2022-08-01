import { connect } from 'react-redux';
import React, { Component } from 'react';
import  * as axios from 'axios';
import { Posts } from './Posts';
import { Loading } from '../../shared/preloader';
import classes from './styles.module.scss';
import { SinglePostContainer } from '../SinglePost';
import { getPosts } from '../../api/api';

// import { addCommentActionCreator, addRatingActionCreator, setPostsActionCreator, goToPageActionCreator, setTotalCountActionCreator, togglePostsFetchingActionCreator } from '../../redux/posts-reducer'
import { addComment, addRating, setPosts, goToPage, setTotalCount, togglePostsFetching, openPost, loadPostsThunk } from '../../redux/posts-reducer'


export class PostsAPIContainer extends Component {

    posts = this.props.posts;
    addComment = this.props.addComment;
    addRating = this.props.addRating;
    limit = this.props.pageSize;

    loadPosts = (skip, limit) => {
        this.props.loadPostsThunk(skip, limit);
        // this.props.togglePostsFetching(true);
        // getPosts(skip, limit).then(response => {
        //     this.props.setPosts(response.data.posts);
        //     this.props.setTotalCount(response.data.totalCount);
            this.skip = this.skip + this.limit;
        //     this.props.togglePostsFetching(false);
        // })
    }

    getSkipNumber = (page) => {
        return (page * this.limit) - this.limit
    }

    getPageCount = () => {
        return Math.ceil(this.props.totalCount / this.limit);
    }

    onPageSwitch = (page) => {
        this.props.goToPage(page);
        this.loadPosts(this.getSkipNumber(page), this.limit);
    }

    render() {
        const pages =[];
        for (let i = 1; i <= this.getPageCount(); i++) {
            pages.push(i);
        }
    return <div>
        <div>{
            pages.map((page) => {
            return <span
                className={`${classes.pageLink} ${this.props.currentPage === page ? classes.pageLinkActive : ''}`}
                onClick={() => {this.onPageSwitch(page)}}
            >{page}</span>})}
        </div>
            { this.props.isFetching ? <Loading /> :
                <Posts 
                currentPage={this.props.currentPage}
                onPageSwitch={this.onPageSwitch}
                posts={this.props.posts}
                addRating={this.props.addRating}
                loadPosts={this.loadPosts}
                pageSize={this.props.pageSize}
                getSkipNumber={this.getSkipNumber}
                openPost={this.props.openPost}
                />
            }
        </div>
    }

    componentDidMount() {
        // window.addEventListener('scroll', () => {
        //     if(this.props.posts.posts.length < this.totalCount) {
        //         this.loadPosts(this.skip, this.pageSize);
        //     }
        // });
        const skip = this.getSkipNumber(this.props.currentPage);
        this.loadPosts(skip, this.limit);
    }
}

let mapStateToProps = (state) =>  {
    return {
        posts: state.posts.posts,
        pageSize: state.posts.pageSize,
        totalCount: state.posts.totalCount,
        currentPage: state.posts.currentPage,
        isFetching: state.posts.isFetching,
        postPreview: state.posts.postPreview
    }
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         addComment: (commentText) => {
//             dispatch(addCommentActionCreator(commentText));
//         },
//         setPosts: (posts) => {
//             dispatch(setPostsActionCreator(posts))
//         },
//         addRating: (postId) => {
//             dispatch(addRatingActionCreator(postId))
//         },
//         goToPage: (page) => {
//             dispatch(goToPageActionCreator(page))
//         },
//         setTotalCount: (totalCount) => {
//             dispatch(setTotalCountActionCreator(totalCount))
//         },
//         togglePostsFetching: (isFetching) => {
//             dispatch(togglePostsFetchingActionCreator(isFetching))
//         }
//     }
// }

let mapDispatchToProps = {
    setPosts,
    addRating,
    goToPage,
    setTotalCount,
    togglePostsFetching,
    openPost,
    loadPostsThunk
}


export const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(PostsAPIContainer);