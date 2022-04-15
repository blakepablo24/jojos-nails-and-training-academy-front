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
import SortBy from '../../components/Ui/SortBy/SortBy';

class SalonTreatmentsSubCat extends Component {

    state = {
        salonTreatmentsSubCat: [],
        subCategoryTitle: "",
        sortByOptions: 
        {
            name: "name",
            lowHigh: "low-high",
            highLow: "high-low"
        },
        sortBy: "name"
    }

    componentDidMount() {
        FUNCTIONS.scrollToTop();
        Axios.get(CONST.BASE_URL + '/api/salon-treatments-sub-cat/' + this.props.match.params.id).then(response => {
            this.setState({
                salonTreatmentsSubCat: response.data.single_salon_treatment,
                subCategoryTitle: response.data.title
            });
        })
    };

    changeHandler = (event) => {

        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    render(){

        let treatments = this.state.salonTreatmentsSubCat.sort((a, b) => a.title.localeCompare(b.title));

        if(this.state.sortBy === this.state.sortByOptions.name){
            treatments = this.state.salonTreatmentsSubCat.sort((a, b) => a.title.localeCompare(b.title));
        } else if(this.state.sortBy === this.state.sortByOptions.lowHigh) {
            treatments = this.state.salonTreatmentsSubCat.sort((a, b) => a.price.localeCompare(b.price));
        } else {
            treatments = this.state.salonTreatmentsSubCat.sort((a, b) => b.price.localeCompare(a.price));
        }
        
        return(
            <Aux>
                <Latest message={this.state.subCategoryTitle} />
                <div className={classes.SalonTreatmentsSubCat}>
                <GoBack snippet={true} back={() => this.props.history.goBack()} />
                <SortBy options={this.state.sortByOptions} changeHandler={this.changeHandler} sortBy={this.state.sortBy} />
                    {treatments.map(salonTreatmentSubCat =>
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