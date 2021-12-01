import React from 'react';
import classes from './PrivacyPolicyModal.module.css';
import PrivacyPolicy from './PrivacyPolicy/PrivacyPolicy';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Backdrop from '../../Ui/Backdrop/Backdrop';
import { Link } from 'react-router-dom';

const privacyPolicyModal = (props) => {

    let privacyPolicy = "";

    if(props.showPrivacyPolicy){
        privacyPolicy = <PrivacyPolicy policy="PRIVACY" togglePrivacyPolicy={props.togglePrivacyPolicy}/>
    }

    return(
        <Aux>
            <Backdrop full={true} clicked={props.clicked}/>
            {privacyPolicy}
            <div className={classes.PrivacyPolicyModal}>
                <h3>Cookies Information</h3>
                <p>Cookies are used on this site to imporve your user experience. Please see our <Link to="" onClick={props.togglePrivacyPolicy}>privacy policy</Link> for mor information on how your data is used</p>
                <button className="customButton" onClick={props.togglePrivacyPolicyModal}>Accept Cookies</button>
            </div>
        </Aux>
    )
}

export default privacyPolicyModal