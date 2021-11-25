import React from 'react';
import styles from './ChangePassword.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Logo from '../Navigation/Header/Logo/Logo';

const changePassword = (props) => {

    let confirm = "";

    if(props.current && props.new && props.confirmed) {
        confirm = <button className={'customButton ' + styles.yes} onClick={props.changePassword}>Confirm</button>;
    }

    return(
        <Aux>
            <Backdrop full={true} clicked={props.clicked}/>
            <div className={styles.confirmDeleteContainer}>
                <div className={styles.ConfirmDelete}>
                    <div className={styles.Logo}>
                        <Logo nonClickable={true}/>
                    </div>
                    <div className={styles.passwordInputs}>
                        <input 
                            type="password"
                            name="current"
                            placeholder="Current Password"
                            value={props.current}
                            onChange={props.changeHandler}
                        />
                        {props.currentErrorMessage}
                        <input 
                            type="password"
                            name="new"
                            placeholder="New Password"
                            value={props.new}
                            onChange={props.changeHandler}
                        />
                        <input 
                            type="password"
                            name="confirmed"
                            placeholder="Repeat New Password"
                            value={props.confirmed}
                            onChange={props.changeHandler}
                        />
                        {props.newErrorMessage}
                    </div>
                    <div className={styles.choice}>
                        {confirm}                
                        <h3 onClick={props.clicked} className="error">Cancel</h3>
                    </div>
                </div>
            </div>
        </Aux>
    )
}

export default changePassword