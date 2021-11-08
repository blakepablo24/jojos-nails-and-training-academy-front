import React from 'react';
import Latest from '../../components/Ui/Navigation/Latest/Latest';
import Aux from '../../hoc/Auxilary/Auxilary';
import classes from './PrivacyPolicy.module.css';
import GoBack from '../../components/Ui/GoBack/GoBack';
import PrivacyPolicy from '../../components/Ui/PrivacyPolicyModal/PrivacyPolicy/PrivacyPolicy';

const privacyPolicy = (props) => (
    <Aux>
        <Latest message="Privacy Policy" />
        <div className={classes.PrivacyPolicy}>
            <GoBack back={() => props.history.goBack()} />
            <PrivacyPolicy url={true}/>
        </div>
    </Aux>
)

export default privacyPolicy