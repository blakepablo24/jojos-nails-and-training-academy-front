import React from 'react';
import styles from './ConfirmDelete.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Logo from '../Navigation/Header/Header';

const confirmDelete = (props) => {

    let yes = styles.yes;
    let message = <h4>This cannot be reversed!</h4>;

    if(props.approve) {
        yes = styles.approve;
        message = <h4>Has the voucher been paid for?</h4>;
    }

    return(
        <Aux>
            <Backdrop full={true} clicked={props.clicked}/>
            <div className={styles.confirmDeleteContainer}>
                <div className={styles.ConfirmDelete}>
                    <div className={styles.Logo}>
                        <Logo/>
                    </div>
                    <h1>ARE YOU SURE?</h1>
                    {message}
                    <div className={styles.choice}>
                        <button className={'customButton ' + yes} onClick={props.delete}>Yes</button>
                        <button className={'customButton ' + styles.no} onClick={props.clicked}>No</button>
                    </div>
                </div>
            </div>
        </Aux>
    )
}

export default confirmDelete