import classes from './styles.module.scss';

export const SignupWindow = (props) => {
    return <div className={classes.popupWrap}>
        <div className={classes.popupBox}>
            <div>Sing up or log in</div>
            <button onClick={props.hideSignup}>Close</button>
        </div>
    </div>
}