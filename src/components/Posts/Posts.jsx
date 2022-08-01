import classes from './styles.module.scss';
import { PostItem } from './PostItem/PostItem';

export const Posts = (props) => {
    return <div>
        <div className={classes.postBoard}  >
        {
            props.posts.map((post) =>    
                <PostItem
                    post={post}
                    key={post.id}
                    addRating={props.addRating}
                    loadPosts={props.loadPosts}
                    limit={props.pageSize}
                    skip={props.getSkipNumber(props.currentPage)}
                />)
        }
        </div>
    </div>
}