import React, { Component } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import classes from './SalonTreatmentsSubCat.module.css';
import CONST from '../../constants/constants';
import Snippet from '../../components/Snippet/Snippet';
import GoBack from '../../components/Ui/GoBack/GoBack';
import Aux from '../../hoc/Auxilary/Auxilary';
import Latest from '../../components/Ui/Navigation/Latest/Latest';
import logoImage from '../../components/Ui/Navigation/Header/Logo/logo.png';
import FUNCTIONS from '../../functions/functions';

class SalonTreatmentsSubCat extends Component {

    state = {
        salonTreatmentsSubCat: [],
        subCategoryTitle: ""
    }

    componentDidMount() {
        FUNCTIONS.scrollToTop();
        Axios.get(CONST.BASE_URL + '/api/salon-treatments-sub-cat/' + this.props.match.params.id).then(response => {
            this.setState({
                salonTreatmentsSubCat: response.data.single_salon_treatment,
                subCategoryTitle: response.data.title
            });
        }).catch(error => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
          })
    };

    render(){
        
        return(
            <Aux>
                <Latest message={this.state.subCategoryTitle} />
                <div className={classes.SalonTreatmentsSubCat}>
                <GoBack snippet={true} back={() => this.props.history.goBack()} />
                    {this.state.salonTreatmentsSubCat.map(salonTreatmentSubCat =>
                        <Snippet
                            toggleBasket={this.props.toggleBasket}
                            subCategoryTitle={this.state.subCategoryTitle}
                            salonTreatmentSubCat={true} 
                            title={salonTreatmentSubCat.title}
                            price={salonTreatmentSubCat.price}
                            type={CONST.ST}
                            image={salonTreatmentSubCat.image ? CONST.BASE_URL + "/storage/images/salon-treatment-images/single-salon-treatment-images/" + "small-" + salonTreatmentSubCat.image : logoImage}
                            id={salonTreatmentSubCat.id}
                            key={salonTreatmentSubCat.id}
                            addToShoppingBasket={this.props.addToShoppingBasket}
                        />
                    )}
                </div>
            </Aux>
        )
    }
}

export default withRouter(SalonTreatmentsSubCat)