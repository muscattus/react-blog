import { Component } from "react";
import * as axios from "axios";
import { SinglePost } from "./SinglePost";
import { setPost, togglePostFetching, loadPostThunk, likePostThunk, unlikePostThunk } from "../../redux/single-post-reducer";
// import { requestAuthorizationThunk } from '../../redux/auth-reducer';
import { compose } from "redux";
import { connect } from "react-redux";
import { Loading } from "../../shared/preloader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getSinglePost } from "../../api/api";
import { likePost } from "../../api/api";
import { withAuth } from '../../auth/withAuth';
import { showSignup, hideSignup } from '../../redux/signup-reducer';

export class SinglePostAPIContainer extends Component {
    
    state = {
    }

    loadPost = (postId) => {
        this.props.loadPostThunk(postId);
    }
    
    onLike = (postId, userId, likes) => {
        if (!userId) {
            this.props.requestAuthorizationThunk();
            return;
        }
        if(!this.isLiked(userId, likes)) {
            this.props.likePostThunk(postId, userId)
        } else {
            this.props.unlikePostThunk(postId, userId)
        }

    }

    render() {
        return <div>
             { this.props.isFetching ? <Loading /> :
                <SinglePost data={this.props.post} onLike={this.onLike} isLiked={this.isLiked} userData={this.props.userData} showSignup={this.props.showSignup} hideSignup={this.props.hideSignup}/>
            } 
        </div>
        
    }
    componentDidMount() {
        this.loadPost(this.props.router.params.id);
    }

    isLiked = (user, likes) =>  {
        return likes.includes(user);
    }
}


function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}


let mapStateToProps = (state) =>  {
    return {
        post: state.post.post,
        isFetching: state.post.isFetching,
        userId: state.authentication.userId,
        loggedIn: state.authentication.loggedIn,
        userName: state.authentication.userName,
        fullName: state.authentication.fullName
    }
}

let mapDispatchToProps = {
    setPost,
    togglePostFetching,
    loadPostThunk,
    likePostThunk,
    unlikePostThunk,
    showSignup,
    hideSignup
}

export const SinglePostContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuth
)(SinglePostAPIContainer)