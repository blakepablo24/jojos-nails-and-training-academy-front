import axios from 'axios';
import React, { Component } from 'react';
import classes from './AdminLandingPage.module.css';
import CONST from '../../../constants/constants';
import { Link } from 'react-router-dom';
import { BiPlus } from "react-icons/bi";
import FlashMessage from 'react-flash-message';

class AdminLandingPage extends Component {
    
    state = {
        salonTreatmentEnquiries: "",
        trainingCourseEnquiries: "",
        giftVoucherPurchases: "",
        trainingCourses: "",
        salonTreatments: "",
        frontPageImages: "",
        mostPopularTreatment: "",
        mostPopularCourse: "",
        mostPopularTreatmentCategory: ""
    }

    componentDidMount(){
        axios.defaults.withCredentials = true;
        axios.get(CONST.BASE_URL + '/api/admin-landing-page/').then(response => {
            this.setState({
                trainingCourses: response.data.courses,
                salonTreatments: response.data.treatments,
                frontPageImages: response.data.frontPageImages,
                salonTreatmentEnquiries: response.data.STEnquires,
                trainingCourseEnquiries: response.data.TCEnquires,
                giftVoucherPurchases: response.data.vouchers,
                mostPopularTreatmentCategory: response.data.mostPopularTreatment.category.title,
                mostPopularTreatment: response.data.mostPopularTreatment,
                mostPopularCourse: response.data.mostPopularCourse
            })
        })
    }

    render(){

        let successMsg = "";
        
        let showSuccessMsg = (message) => {
        successMsg = (
            <FlashMessage duration={5000}>
                <div className="load-msg">
                <h3 className="success">{message}</h3>
                </div>
            </FlashMessage>
        );
        };

        if (this.props.location.state !== undefined) {
            const message = this.props.location.state.fromRedirect;
            if (message) {
                showSuccessMsg(message);
            }
        }

        return(
            <div className={classes.AdminLandingPage}>
                {successMsg}
                <h3>Current Top Course</h3>
                <p>{this.state.mostPopularCourse.title} - {this.state.mostPopularCourse.enquires}</p>
                <h3>Current Top Treatment</h3>
                <p>{this.state.mostPopularTreatmentCategory} - {this.state.mostPopularTreatment.title} - {this.state.mostPopularTreatment.enquires}</p>
                <div className={classes.allStatsContainer}>
                    <div className={classes.singleStatContainer}>
                        <p>Training Course Enquiries</p>
                        <p className={classes.statNumber}>{this.state.trainingCourseEnquiries}</p>
                    </div>
                    <div className={classes.singleStatContainer}>
                        <p>Salon Treatment Enquiries</p>
                        <p className={classes.statNumber}>{this.state.salonTreatmentEnquiries}</p>
                    </div>
                    <div className={classes.singleStatContainer}>
                        <p>Gift Voucher Purchases</p>
                        <p className={classes.statNumber}>{this.state.giftVoucherPurchases}</p>
                    </div>
                    <Link to="/admin/front-landing-page" className={classes.singleStatContainer}>
                        <p>Front Page Images</p>
                        <p className={classes.statNumber}>{this.state.frontPageImages}</p>
                    </Link>
                    <Link to="/training-courses" className={classes.singleStatContainer}>
                        <p>Training Courses</p>
                        <p className={classes.statNumber}>{this.state.trainingCourses}</p>
                    </Link>
                    <Link to="/salon-treatments" className={classes.singleStatContainer}>
                        <p>Salon Treatments</p>
                        <p className={classes.statNumber}>{this.state.salonTreatments}</p>
                    </Link>
                </div>
                <div className={classes.newServicesContainer}>
                    <Link to="/admin/new-salon-treatment" className={classes.newService}>
                        <BiPlus />
                        <h4>New Salon Treatment</h4>
                    </Link>
                    <Link to="/admin/add-edit-salon-treatment" className={classes.newSubService}>
                        <BiPlus />
                        <h4>Add / Edit Salon Treatment Category</h4>
                    </Link>
                    <Link to="/admin/new-training-course" className={classes.newService}>
                        <BiPlus />
                        <h4>New Training Course</h4>
                    </Link>
                </div>
            </div>
        )
    }

}

export default AdminLandingPage