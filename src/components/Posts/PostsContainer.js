import React, { Component } from 'react';
import  * as axios from 'axios';
import { PostItem } from './PostItem/PostItem';
import { Posts } from './Posts';


export class PostsAPIContainer extends Component {

    posts = this.props.posts;
    addComment = this.props.addComment;
    addRating = this.props.addRating;
    limit = this.props.pageSize;

    loadPosts = (skip, limit) => {
        axios.get(`http://localhost:3010/api/posts?skip=${skip}&limit=${limit}`).then(response => {
            this.props.setPosts(response.data.posts);
            this.props.setTotalCount(response.data.totalCount);
            this.skip = this.skip + this.limit;
        })
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

        return <div>
            <Posts 
            getPageCount= {this.getPageCount}
            currentPage={this.props.currentPage}
            onPageSwitch={this.onPageSwitch}
            posts={this.props.posts}
            addRating={this.props.addRating}
            loadPosts={this.loadPosts}
            pageSize={this.props.pageSize}
            getSkipNumber={this.getSkipNumber}
            />
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