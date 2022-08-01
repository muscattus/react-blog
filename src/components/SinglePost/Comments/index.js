import { Component } from "react";

import { loadCommentsThunk, setComments, toggleCommentsFetching } from '../../../redux/comments-reducer';
import { compose } from "redux";
import { connect } from "react-redux";
import { Loading } from '../../../shared/preloader';
import { Comments } from "./Comments";
import { CommentForm } from "./CommentForm";
import { withAuth } from '../../../auth/withAuth';
import { ReduxCommentForm, CommentFormContainer } from "./CommentForm";

export class CommentsContainer extends Component {
    loadComments = (postId) => {
        this.props.loadCommentsThunk(postId);
    }

    render() {
        return <div>
             { this.props.isFetching ? <Loading /> :
                <Comments data={this.props} />
            }
            { this.props.loggedIn ?
                <CommentFormContainer postId={this.props.postId}/> :
                <div>Sign up or log in to leave a comment</div>
            }
        </div>
        
    }
    componentDidMount() {
        this.loadComments(this.props.postId);
    }
}

let mapStateToProps = (state) =>  {
    return {
        comments: state.comments,
        isFetching: state.post.isFetching,
        userId: state.authentication.userId,
        loggedIn: state.authentication.loggedIn,
        userName: state.authentication.userName,
        fullName: state.authentication.fullName
    }
}

let mapDispatchToProps = {
    setComments,
    toggleCommentsFetching,
    loadCommentsThunk
}

export const PostCommentsContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuth
)(CommentsContainer)