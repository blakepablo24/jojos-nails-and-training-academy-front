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

class SalonTreatmentsSubCat extends Component {

    state = {
        salonTreatmentsSubCat: [],
        subCategoryTitle: ""
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        Axios.get(CONST.BASE_URL + '/api/salon-treatments-sub-cat/' + this.props.match.params.id).then(response => {
            this.setState({
                salonTreatmentsSubCat: response.data.subCatSalonTreatments,
                subCategoryTitle: response.data.subCategoryTitle
            });
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
                            subCategoryTitle={this.state.subCategoryTitle}
                            salonTreatmentSubCat={true} 
                            title={salonTreatmentSubCat.title}
                            price={salonTreatmentSubCat.price}
                            type={CONST.ST}
                            image={salonTreatmentSubCat.image ? CONST.BASE_URL + "/storage/images/salon-treatment-images/single-salon-treatment-images/" + salonTreatmentSubCat.image : logoImage}
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