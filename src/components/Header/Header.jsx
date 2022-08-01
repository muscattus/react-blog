import classes from './styles.module.scss';
import { LoginContainer } from './LoginForm/LoginForm';
import { connect } from 'react-redux';
import { logoutThunk } from '../../redux/auth-reducer';
import { withAuth } from '../../auth/withAuth';
import { compose } from 'redux';
import { NavLink } from 'react-router-dom';

const HeaderUser = (props) => {
    return <div>
        <div>{props.user}</div>
        <div><button onClick={props.logout}>Log out</button></div>
    </div>
}

export const Header = (props) => {
    return <div className={classes.headerWrapper}>
        <NavLink to={'/../../'}><div className={classes.headerLogo}>Header</div></NavLink>
        <div className={classes.userSection}>
            {props.loggedIn ?
                <HeaderUser user={props.fullName} logout={props.logoutThunk}/> :
                <LoginContainer />
            }
        </div>
    </div>
}


let mapStateToProps = (state) =>  {
    return {
        loggedIn: state.authentication.loggedIn,
        userName: state.authentication.userName,
        fullName: state.authentication.fullName,
    }
}

let mapDispatchToProps = {
    logoutThunk
}

// let CheckAuthComponent = withAuth(HeaderContainer);

// export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export const HeaderContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuth
)(Header);