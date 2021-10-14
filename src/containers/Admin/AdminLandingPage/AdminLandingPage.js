import axios from 'axios';
import React, { Component } from 'react';
import classes from './AdminLandingPage.module.css';
import CONST from '../../../constants/constants';
import { Link } from 'react-router-dom';
import { BiPlus } from "react-icons/bi";
import ChangePassword from '../../../components/Ui/ChangePassword/ChangePassword';
import Loading from '../../../components/Ui/Loading/Loading';
import { Redirect } from 'react-router';

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
        changePasswordModal: false,
        current: "",
        new: "",
        confirmed: "",
        currentErrorMesage: "",
        newErrorMessage: "",
        confirmedErrorMessage: "",
        successMsg: "",
        loading: "",
        redirectOnSuccess: ""
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
            changePasswordModal: false
        })
    }

    changePasswordHandler = () => {
        let newErrorMessage = "";
        
        if(this.state.new.length < 5){
            newErrorMessage = <h4 className="error">Password must longer 5 characters</h4>;
        } else if(this.state.new !== this.state.confirmed){
            newErrorMessage = <h4 className="error">Passwords do not match</h4>;
        }

        if(!this.state.newError){
        this.setState({
            loading: <Loading />
        })
        axios.defaults.withCredentials = true;
        axios.post(CONST.BASE_URL + '/api/admin-change-password',
        {
            current: this.state.current,
            new: this.state.new,
            id: JSON.parse(localStorage.getItem("user")).id
        }
        ).then(response => {
            if(response.data) {
                this.setState({
                    changePasswordModal: false,
                    current: "",
                    new: "",
                    confirmed: "",
                    currentErrorMesage: "",
                    newErrorMessage: "",
                    confirmedErrorMessage: "",
                    loading: "",
                })
                this.logoutHandler();
            } else {
                this.setState({
                    currentErrorMessage: <h4 className="error">Current Password is incorrect</h4>,
                    loading: ""
                })
            }
        })
        } else {
            this.setState({
                newErrorMessage: newErrorMessage
            })
        }
    }

    changePasswordPopUpHandler = () => {
        this.setState({
            changePasswordModal: true
        })
    }

    logoutHandler = () => {
        localStorage.clear();
        axios.defaults.withCredentials = true;
        axios.get(CONST.BASE_URL + '/api/logout');
        this.setState({
            redirectOnSuccess: <Redirect to={{
                                    pathname: "/staff-login",
                                    state: { fromRedirect: "You Password has now been changed, please login with the new password" }
                                    }}                  
                                />
        })
    }

    changeHandler = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value,
            newErrorMessage: "",
            currentErrorMessage: ""
        });
    }

    render(){

        let changePassword = "";

        if (this.state.changePasswordModal) {
            changePassword = <ChangePassword
                                clicked={this.removeChangePasswordHandler} 
                                changePassword={this.changePasswordHandler} 
                                current={this.state.current}
                                new={this.state.new}
                                confirmed={this.state.confirmed}
                                changeHandler={this.changeHandler}
                                newErrorMessage={this.state.newErrorMessage}
                                currentErrorMessage={this.state.currentErrorMessage}
                            />
        }

        return(
            <div className={classes.AdminLandingPage}>
                {changePassword}
                {this.state.loading}
                {this.state.redirectOnSuccess}
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