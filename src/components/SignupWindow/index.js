import { compose } from "redux";
import { connect } from "react-redux";
import { withAuth } from '../../auth/withAuth';
import { Component } from "react";
import { SignupWindow } from "./SignupWindow";
import { showSignup, hideSignup } from '../../redux/signup-reducer';


export class SignupWindowPopup extends Component {
    render() {
        if (!this.props.showSignupWindow) {
            return null;
        }
        return <SignupWindow hideSignup={this.props.hideSignup}/>
        
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.authentication.userId,
        loggedIn: state.authentication.loggedIn,
        userName: state.authentication.userName,
        fullName: state.authentication.fullName,
        showSignupWindow: state.signupWindow.showSignupWindow
    }
}

const mapDispatchToProps = {
    showSignup,
    hideSignup
}

export const SignupWindowContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuth
)(SignupWindowPopup)