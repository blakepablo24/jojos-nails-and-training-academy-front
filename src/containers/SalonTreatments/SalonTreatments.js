import React, { Component } from 'react';
import classes from './SalonTreatments.module.css';
import Snippet from '../../components/Snippet/Snippet';
import Axios from 'axios';
import CONST from '../../constants/constants';
import Aux from '../../hoc/Auxilary/Auxilary';
import Latest from '../../components/Ui/Navigation/Latest/Latest';
import GoBack from '../../components/Ui/GoBack/GoBack';
import logoImage from '../../components/Ui/Navigation/Header/Logo/logo.png';
import FUNCTIONS from '../../functions/functions';

class SalonTreatments extends Component {

    state = {
        salonTreatments: []
    }

    componentDidMount() {
        Axios.get(CONST.BASE_URL + '/api/all-salon-treatments').then(response => {
            this.setState({
                salonTreatments: response.data
            }, () => {
                FUNCTIONS.handleOldScrollPosition();
              })
        });
    };

    render(){

        let categories = this.state.salonTreatments.sort((a, b) => a.title.localeCompare(b.title));

        return(
            <Aux>
                <Latest message="Only The Best Salon Treatments" />
                <div className={classes.SalonTreatments}>
                <GoBack snippet={true} back={() => this.props.history.goBack()} />
                    {categories.map(salonTreatment =>
                        salonTreatment.single_salon_treatment.length > 0 ?
                        <Snippet
                            salonTreatment={true} 
                            title={salonTreatment.title}
                            image={salonTreatment.image != "default" ? CONST.BASE_URL + "/storage/images/salon-treatment-images/" + "small-" + salonTreatment.image : logoImage}
                            price={salonTreatment.price}
                            id={salonTreatment.id}
                            key={salonTreatment.id}
                        />
                        : ""
                    )}
                </div>
            </Aux>
        )
    }
}

export default SalonTreatments