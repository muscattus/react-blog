import { getCookie } from "../helpers/cookie";
import { getUserThunk } from '../redux/auth-reducer';
import { connect } from 'react-redux';
import { Component } from "react";

let mapStateToProps = (state) => ({
    userId: state.authentication.userId,
    loggedIn: state.authentication.loggedIn,
    userName: state.authentication.userName,
    fullName: state.authentication.fullName,
});

let mapDispatchToProps = {
    getUserThunk
}

export const withAuth = (Component) => {
    const CheckAuthComponent = (props) => {
    // class CheckAuthComponent extends Component {
        // render() {
        //     if (!this.props.loggedIn && getCookie('token')) {
        //         this.props.getUserThunk();
        //     }
        //     return <Comp {...this.props}/>
        // }
        if (!props.loggedIn && getCookie('token')) {
            props.getUserThunk();
        }
        const userData = {loggedIn: props.loggedIn, userId: props.userId, userName: props.userName, fullName: props.fullName};
        return <Component userData={userData} {...props}/>
    }

    let connectedCheckAuthComponent = connect(mapStateToProps, mapDispatchToProps)(CheckAuthComponent)

    return connectedCheckAuthComponent;
}