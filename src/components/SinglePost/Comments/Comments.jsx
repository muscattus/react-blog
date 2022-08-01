import { Text } from '../Text/index';
import classes from './styles.module.scss';

export const Comments = (props) => {
    const comments = props.data.comments.comments;

    return <div>
        <div>Comments</div>
        { !comments || comments.length < 1 ? null :
            <div className={classes.commentsWrapper}>
                <div className={classes.commentsTrack}>
                    <div className={classes.commentsTrackPoint}></div>
                    <div className={classes.commentsTrackLine}></div>
                    <div className={classes.commentsTrackPoint}></div>
                </div>
                <div className={classes.comments}>
                    {comments.map((com) => {
                        return <div key={com._id} className={classes.comment}>
                            <div className={classes.commentAuthorPic}><img src={com.authorDetails.userpic} alt="user pic" /></div>
                            <div className={classes.commentBody}>
                                <h3>{com.authorDetails.username}</h3>
                                <Text paragraphs={com.text} />
                            </div>
                        </div>
                    })}
                </div>
            </div>
        }
    </div>

}