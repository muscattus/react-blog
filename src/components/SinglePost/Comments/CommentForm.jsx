import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { saveCommentThunk } from '../../../redux/comments-reducer';

export const CommentForm =(props) => {
    return <form onSubmit={props.handleSubmit}>
        <div><Field name={'commentText'} component={'textarea'} /></div>
        <div><button>Save</button></div>
    </form>
}

export const ReduxCommentForm = reduxForm({form: 'comment'})(CommentForm);

export const FormContainer = (props) => {
    const onSubmit = (formData) => {
        const commentData = {
            postId: props.postId,
            author: props.userId,
            text: [formData.commentText]
        }
        props.saveCommentThunk(commentData);
    }
    return <div><ReduxCommentForm onSubmit={onSubmit}/></div>
}


let mapStateToProps = (state) =>  {
    return {
        userId: state.authentication.userId,
    }
}

let mapDispatchToProps = {
    saveCommentThunk
}


export const CommentFormContainer = connect(mapStateToProps, mapDispatchToProps)(FormContainer);