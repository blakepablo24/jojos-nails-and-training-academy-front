import React, { Component } from 'react';
import classes from './SalonTreatments.module.css';
import Snippet from '../../components/Snippet/Snippet';
import Axios from 'axios';
import CONST from '../../constants/constants';
import Aux from '../../hoc/Auxilary/Auxilary';
import Latest from '../../components/Ui/Navigation/Latest/Latest';
import GoBack from '../../components/Ui/GoBack/GoBack';

class SalonTreatments extends Component {

    state = {
        salonTreatments: []
    }

    componentDidMount() {
        Axios.get(CONST.BASE_URL + '/api/all-salon-treatments').then(response => {
            this.setState({
                salonTreatments: response.data
            });
        });
    };

    render(){
        return(
            <Aux>
                <Latest message="Only The Best Salon Treatments" />
                <div className={classes.SalonTreatments}>
                <GoBack snippet={true} back={() => this.props.history.goBack()} />
                    {this.state.salonTreatments.map(salonTreatment =>
                        <Snippet
                            salonTreatment={true} 
                            title={salonTreatment.title}
                            image={CONST.BASE_URL + "/storage/images/salon-treatment-images/" + salonTreatment.image}
                            id={salonTreatment.id}
                            key={salonTreatment.id}
                        />
                    )}
                </div>
            </Aux>
        )
    }
}

export default SalonTreatments