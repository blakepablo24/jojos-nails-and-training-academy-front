import React from 'react';
import Latest from '../../components/Ui/Navigation/Latest/Latest';
import Aux from '../../hoc/Auxilary/Auxilary';
import classes from './CookiePolicy.module.css';
import GoBack from '../../components/Ui/GoBack/GoBack';
import PrivacyPolicy from '../../components/Ui/PrivacyPolicyModal/PrivacyPolicy/PrivacyPolicy';

const cookiePolicy = (props) => (
    <Aux>
        <Latest message="Cookie Policy" />
        <div className={classes.CookiePolicy}>
            <GoBack back={() => props.history.goBack()} />
            <PrivacyPolicy url={true} policy="COOKIE" />
        </div>
    </Aux>
)

export default cookiePolicy