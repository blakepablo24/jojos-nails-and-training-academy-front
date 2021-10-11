import axios from 'axios';
import React, { Component } from 'react';
import classes from './AdminLandingPage.module.css';
import CONST from '../../../constants/constants';
import { Link } from 'react-router-dom';
import { BiPlus } from "react-icons/bi";
import FlashMessage from 'react-flash-message';
import ChangePassword from '../../../components/Ui/ChangePassword/ChangePassword';

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
        mostPopularTreatmentCategory: "",
        changePassword: "",
        currentPassword: "",
        newPasswordOriginal: "",
        newPasswordConfirm: ""
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

    removeChangePasswordHandler = () => {
        this.setState({
            changePassword: ""
        })
    }

    changePasswordHandler = () => {
        console.log("password will be changed");
    }

    changePasswordPopUpHandler = () => {
        this.setState({
            changePassword: <ChangePassword 
                                changePassword={this.changePasswordHandler} 
                                remove={this.removeChangePasswordHandler}
                                currentPassword={this.state.currentPassword}
                                newPasswordOriginal={this.state.newPasswordOriginal}
                                newPasswordConfirm={this.state.newPasswordConfirm}
                                changeHandler={this.changeHandler}
                            />
        })
    }

    changeHandler = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value,
            // errorErrorMessage: "",
            // intentionErrorMessage: "",
            // makerErrorMessage: "",
            // contextErrorMessage: ""
        }, () => {
            console.log(this.state.currentPassword);
        });
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
                {this.state.changePassword}
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
                    <Link to="/admin/gift-vouchers-pending" className={classes.singleStatContainer}>
                        <p>Gift Vouchers Pending</p>
                        <p className={classes.statNumber}>{this.state.giftVoucherPurchases}</p>
                    </Link>
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
                    <button onClick={this.changePasswordPopUpHandler} className={classes.changePassword+" customButton"}>change password</button>
                </div>
            </div>
        )
    }
}

export default AdminLandingPage