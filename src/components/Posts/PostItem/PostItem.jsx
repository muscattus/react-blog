import classes from './styles.module.scss';
import * as axios from 'axios';
import { NavLink } from 'react-router-dom';
import { addPostRating, getPosts } from '../../../api/api';

export const PostItem = (props) => {
    const onAddRating = (postId) => {
        addPostRating(postId).then(response => {
           if(response.data.acknowledged === true) {
               props.loadPosts(props.skip, props.limit);
           }
        });

    }
    return (   
        <NavLink to={'../../../post/'+props.post._id} className={classes.postItem}>
            <article className={classes.postArticle}
            onClick={() => onAddRating(props.post._id)}>
                <div>
                    <img src={props.post.image+'300/400'} alt="bfd" className={classes.postImage}/>
                    <div className={classes.postHead}>
                        <p>{props.post?.author}</p>
                        <p>{props.post.rating}</p> 
                    </div>
                    {props.post.title
                    ?<div className={classes.postTitle}>
                        <h3>{props.post.title}</h3>
                        {/* <p>{props.post.text[0].p}</p> */}
                    </div>
                    : null}
                </div>
                <div>
                   {props.post.text ? props.post.text[0] : null}
                </div>
                {/* <span>
                    <input type="text" ref={comment } ></input>
                    <button onClick={onCommentAdd}>Comment</button>
                </span> */}
            </article>
        </NavLink>
    )
}