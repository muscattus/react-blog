import classes from './styles.module.scss';
import { Text } from './Text';
import { LikeButton } from './LikeButton/like';
import { NavLink} from 'react-router-dom';
import { PostCommentsContainer } from './Comments/index';

export const SinglePost = (props) => {
    return <div className={classes.singlePostWrapper}>
        <div> <NavLink to={'/../../'}>&#60; </NavLink></div>
        <div className={classes.singlePost}>
            <h1>{props.data.title}</h1>
            <p>{props.data.author}</p>
            <img className={classes.postImage} src={props.data.image + '600/400'} alt="some nice pic" />
            {/* <p>{props.data.category}</p> */}
            { props.data.text ? <Text paragraphs={props.data.text} /> : null }
            
            <div>
                <LikeButton onLike={props.onLike} userId={props.userData.userId} likes={props.data.likes} postId={props.data._id} isLiked={props.isLiked} showSignup={props.showSignup} hideSignup={props.hideSignup}/>
                {/* <div>{props.data.likes.length} likes</div> */}
            </div>
            <PostCommentsContainer postId={props.data._id}/>
        </div>
    </div>
}
