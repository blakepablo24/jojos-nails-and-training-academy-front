import React from 'react';
import styles from './ConfirmDelete.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Logo from '../Navigation/Header/Header';

const confirmDelete = (props) => {

    return(
        <Aux>
            <Backdrop full={true} clicked={props.clicked}/>
            <div className={styles.confirmDeleteContainer}>
            <div className={styles.ConfirmDelete}>
            <div className={styles.Logo}>
                <Logo loading={true}/>
            </div>
                <h1>ARE YOU SURE?</h1>
                <h4>This cannot be reversed!</h4>
                <div className={styles.choice}>
                    <button className={'customButton ' + styles.yes} onClick={props.delete}>Yes</button>
                    <button className={'customButton ' + styles.no} onClick={props.clicked}>No</button>
                </div>
            </div>
            </div>
        </Aux>
    )
}

export default confirmDelete