import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { loginThunk } from '../../../redux/auth-reducer';
import { connect } from 'react-redux';

const LoginForm = (props)  => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field name={'login'} component={'input'} /></div>
            <div><Field name={'password'} component={'input'} type={'password'}/></div>
            <div><button>Log in</button></div>
        </form>
    )
}

const ReduxLoginForm = reduxForm({form: 'login'})(LoginForm);

export const LoginFormContainer = (props) => {
    const onSubmit = (formData) => {
        props.loginThunk(formData);
    }
    return <div><ReduxLoginForm onSubmit={onSubmit}/></div>
}


let mapStateToProps = (state) =>  {
    return {
        userId: state.authentication.userId,
        loggedIn: state.authentication.loggedIn,
        userName: state.authentication.userName,
        fullName: state.authentication.fullName,
    }
}

let mapDispatchToProps = {
    loginThunk
}


export const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer);