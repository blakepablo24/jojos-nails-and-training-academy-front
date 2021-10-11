import React from 'react';
import styles from './ChangePassword.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Logo from '../Navigation/Header/Header';

const changePassword = (props) => {

    let confirm = "";

    if(props.allPasswordsInput) {
        confirm = <button className={'customButton ' + styles.yes} onClick={props.changePassword}>Confirm</button>;
    }

    return(
        <Aux>
            <Backdrop full={true} clicked={props.clicked}/>
            <div className={styles.confirmDeleteContainer}>
                <div className={styles.ConfirmDelete}>
                    <div className={styles.Logo}>
                        <Logo/>
                    </div>
                    <div className={styles.passwordInputs}>
                        <input 
                            type="password"
                            name="currentPassword"
                            placeholder="Current Password"
                            value={props.currentPassword}
                            onChange={props.changeHandler}
                        />
                        <input 
                            type="password"
                            name="newPasswordOriginal"
                            placeholder="New Password"
                            value={props.newPasswordOriginal}
                            onChange={props.changeHandler}
                        />
                        <input 
                            type="password"
                            name="newPasswordConfirm"
                            placeholder="Repeat New Password"
                            value={props.newPasswordConfirm}
                            onChange={props.changeHandler}
                        />
                    </div>
                    <div className={styles.choice}>
                        {confirm}                
                        <h3 onClick={props.remove} className="error">Cancel</h3>
                    </div>
                </div>
            </div>
        </Aux>
    )
}

export default changePassword