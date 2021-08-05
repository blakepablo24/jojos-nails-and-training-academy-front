import Axios from 'axios';
import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import classes from './SingleTrainingCourse.module.css';
import CONST from '../../constants/constants';
import GoBack from '../../components/Ui/GoBack/GoBack';
import GuildLogo from '../../components/Ui/GuildLogo/GuildLogo';
import CurriculumItem from '../../components/CurriculumItem/CurriculumItem';
import { BiXCircle, BiEdit, BiFolderPlus } from "react-icons/bi";
import FlashMessage from 'react-flash-message';
import ConfirmDelete from '../../components/Ui/ConfirmDelete/ConfirmDelete';
import Aux from '../../hoc/Auxilary/Auxilary';
import Latest from '../../components/Ui/Navigation/Latest/Latest';
import { TiShoppingCart } from "react-icons/ti";
import FUNCTIONS from '../../functions/functions';

class SingleTrainingCourse extends Component {

    state = {
        title: "",
        duration: "",
        start_time: "",
        end_time: "",
        extras: "",
        image: "",
        price: "",
        ratio: "",
        curriculumItems: [],
        adminButtons: "",
        redirectOnSuccess: ""
    }

    componentDidMount() {

        let adminButtons = "";

        if(this.props.auth){
            adminButtons =  <div className="admin-buttons">
                                <BiXCircle className="delete" onClick={this.confirmDeleteHandler} /> 
                                <Link to={"/admin/edit-training-course/" + this.props.match.params.id}><BiEdit className="edit" /></Link>
                            </div>;
        }

        Axios.get(CONST.BASE_URL + '/api/single-training-course/' + this.props.match.params.id).then(response => {
            window.scrollTo(0, 0);
            this.setState({
                title: response.data.title,
                duration: response.data.duration,
                start_time: response.data.start_time,
                end_time: response.data.end_time,
                extras: response.data.extras,
                image: response.data.image,
                price: response.data.price,
                ratio: response.data.teacher_student_ratio,
                curriculumItems: response.data.course_curriculum,
                adminButtons: adminButtons
            });
        })
    };

    removeConfirmDeleteHandler = () => {
        this.setState({
            confirmDelete: "",
            open: false
        })
    }

    confirmDeleteHandler = () => {
        this.setState({
            open: true,
            confirmDelete: <ConfirmDelete delete={this.deleteHandler} clicked={this.removeConfirmDeleteHandler} />
        })
    }

    deleteHandler = () => {
        Axios.defaults.withCredentials = true;
        Axios.delete(CONST.BASE_URL + '/api/delete-single-salon-treatment/' + this.props.match.params.id).then(response => {
            if(response.data.message === "Treatment Successfully Deleted"){
                this.setState({
                    redirectOnSuccess: <Redirect to={{
                                            pathname: "/admin",
                                            state: { fromRedirect: response.data.message }
                                            }}                  
                                        />
                })
            }
        });
    }

    deleteHandler = () => {
        Axios.defaults.withCredentials = true;
        Axios.delete(CONST.BASE_URL + '/api/delete-single-training-course/' + this.props.match.params.id).then(response => {
            if(response.data.message === "Training Course Successfully Deleted"){
                this.setState({
                    redirectOnSuccess: <Redirect to={{
                                            pathname: "/admin",
                                            state: { fromRedirect: response.data.message }
                                            }}                  
                                        />
                })
            }
        })
    }

    render(){

        let courseImage = this.state.image;
        let curriculum = "";
        
        let extras = null;

        if(this.state.image) {
            courseImage = <img src={CONST.BASE_URL + "/storage/images/training-course-images/" + this.state.image} alt="" className={classes.courseImage} />;
        }

        if(this.state.extras) {
            extras = <div className={classes.stat}>
                        <h3>Extras:</h3>
                        <h4>{this.state.extras}</h4>
                    </div>
        }

        if(this.state.curriculumItems.length !== 0 && this.props.auth){
            curriculum = 
            <div className={classes.curriculumContainer}>
                <h3>Curriculum:</h3>
                <div className={classes.curriculum}>
                    {this.state.curriculumItems.map((curriculumItem) =>
                        <CurriculumItem
                            id={curriculumItem.id}
                            key={curriculumItem.id}
                            curriculumItem={curriculumItem.course_curriculum_item}
                        />
                    )}
                </div>
                <Link to={"/admin/add-curriculum/" + this.props.match.params.id} className={classes.noCurriculumContainer}>
                    <div><BiFolderPlus /> <h3>Edit Curriculum</h3></div>
                </Link>
            </div>
        } else if(this.props.auth) {
            curriculum =
            <Link to={"/admin/add-curriculum/" + this.props.match.params.id} className={classes.noCurriculumContainer}>
                <div><BiFolderPlus /> <h3>Add Curriculum</h3></div>
            </Link>
        } else if(this.state.curriculumItems.length !== 0) {
            curriculum = 
            <div className={classes.curriculumContainer}>
                <h3>Curriculum:</h3>
                <div className={classes.curriculum}>
                    {this.state.curriculumItems.map((curriculumItem) =>
                        <CurriculumItem
                            id={curriculumItem.id}
                            key={curriculumItem.id}
                            curriculumItem={curriculumItem.course_curriculum_item}
                        />
                    )}
                </div>
            </div>
        }

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

        let shownButton = "";

        if(JSON.parse(localStorage.getItem("basketItems"))){
            if(FUNCTIONS.checkBasket(Number(this.props.match.params.id) + CONST.TC, "id")){
                shownButton = <button className={classes.floatButton + " customButton"} onClick={this.props.toggleBasket}><TiShoppingCart />Continue to Basket</button>;
            } else {
                shownButton = <button className={classes.floatButton + " customButton"} onClick={this.props.addToShoppingBasket.bind(this, Number(this.props.match.params.id) + CONST.TC, "", "", this.state.title, this.state.price, "Training Courses", CONST.TC)}>Add to Basket</button>;
            }
        } else {
            shownButton = <button className={classes.floatButton + " customButton"} onClick={this.props.addToShoppingBasket.bind(this, Number(this.props.match.params.id) + CONST.TC, "", "", this.state.title, this.state.price, "Training Courses", CONST.TC)}>Add to Basket</button>;
        }
        
        return(
            <Aux>
                <Latest message={this.state.title}/>
                <div className={classes.SingleTrainingCourse}>
                    {successMsg}
                    {this.state.confirmDelete}
                    {this.state.redirectOnSuccess}
                    <GoBack back={() => this.props.history.goBack()} />
                    {courseImage}    
                    <div className={classes.stat}>
                        <h3>Duration:</h3>
                        <h3>{this.state.duration}</h3>
                    </div>
                    <div className={classes.stat}>
                        <h3>Times:</h3>
                        <h3>{this.state.start_time} - {this.state.end_time}</h3>
                    </div>
                    <div className={classes.stat}>
                        <h3>Ratio:</h3>
                        <h3>{this.state.ratio}</h3>
                    </div>
                    <div className={classes.stat}>
                        <h3>Price:</h3>
                        <h3>£{this.state.price}</h3>
                    </div>
                    {curriculum}
                    {extras}
                    {shownButton}
                    <GuildLogo />
                    {this.state.adminButtons}
                </div>
            </Aux>
        )
    }
}

export default withRouter(SingleTrainingCourse)