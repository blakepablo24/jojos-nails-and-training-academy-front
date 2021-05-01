import React, { Component } from 'react';
import classes from './SingleSalonTreatment.module.css';
import Axios from 'axios';
import { Link, Redirect, withRouter } from 'react-router-dom';
import CONST from '../../constants/constants';
import GoBack from '../../components/Ui/GoBack/GoBack';
import GuildLogo from '../../components/Ui/GuildLogo/GuildLogo';
import { MdTimer } from "react-icons/md";
import { BiXCircle, BiEdit } from "react-icons/bi";
import FlashMessage from 'react-flash-message';
import ConfirmDelete from '../../components/Ui/ConfirmDelete/ConfirmDelete';
import Aux from '../../hoc/Auxilary/Auxilary';
import Latest from '../../components/Ui/Navigation/Latest/Latest';

class SingleSalonTreatment extends Component {

    state = {
        title: "",
        duration: "",
        image: "",
        price: "",
        description: "",
        adminButtons: "",
        redirectOnSuccess: "",
        confirmDelete: "",
        open: false,
        subCategoryTitle: ""
    }

    componentDidMount() {

        let adminButtons = "";

        if(this.props.auth){
            adminButtons = <div className="admin-buttons">
                                <BiXCircle className="delete" 
                                onClick={this.confirmDeleteHandler} 
                            /> 
                                <Link to={"/admin/edit-salon-treatment/" + this.props.match.params.id}><BiEdit className="edit" /></Link>
                            </div>;
        }
        Axios.get(CONST.BASE_URL + '/api/single-salon-treatment/' + this.props.match.params.id).then(response => {
            window.scrollTo(0, 0);
            this.setState({
                title: response.data.title,
                duration: response.data.duration,
                image: response.data.image,
                price: response.data.price,
                description: response.data.description,
                adminButtons: adminButtons,
                subCategoryTitle: response.data.category.title
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

    render(){

        let courseImage = this.state.image;

        if(this.state.image) {
            courseImage = <img src={CONST.BASE_URL + "/storage/images/salon-treatment-images/single-salon-treatment-images/" + this.state.image} alt="" className={classes.treatmentImage} />;
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

        function checkBasket(id) {
            let alreadyInBasket = false;
            let basketItems = JSON.parse(localStorage.getItem("basketItems"));
            basketItems.forEach(basketItem => {
                if (basketItem.id === id) {
                    alreadyInBasket = true;
                }
            });
            return alreadyInBasket;
        }

        let shownButton = <button onClick={this.props.addToShoppingBasket.bind(this, this.props.match.params.id, this.state.title, this.state.price, this.state.subCategoryTitle)}>Add to Basket</button>;

        if(JSON.parse(localStorage.getItem("basketItems"))){
            if(checkBasket(Number(this.props.match.params.id))){
                shownButton = <button className="customButton" onClick={this.props.addToShoppingBasket.bind(this, Number(this.props.match.params.id), this.state.title, this.state.price, this.state.subCategoryTitle)}>In Basket</button>;
            } else {
                shownButton = <button className="customButton" onClick={this.props.addToShoppingBasket.bind(this, Number(this.props.match.params.id), this.state.title, this.state.price, this.state.subCategoryTitle)}>Add to Basket</button>;
            }
        } else {
            shownButton = <button className="customButton" onClick={this.props.addToShoppingBasket.bind(this, Number(this.props.match.params.id), this.state.title, this.state.price, this.state.subCategoryTitle)}>Add to Basket</button>;
        }

        return(
            <Aux>
                <Latest message={this.state.subCategoryTitle} />
                <div className={classes.SingleSalonTreatment}>
                    {successMsg}
                    {this.state.redirectOnSuccess}
                    {this.state.confirmDelete}
                    <GoBack back={() => this.props.history.goBack()} />
                    <h3 className={classes.title}>{this.state.title}</h3>
                    {courseImage}
                    <div className={classes.statsContainer}>
                        <div className={classes.stat}>
                            <MdTimer />
                            <h3>{this.state.duration}</h3>
                        </div>
                        <div className={classes.stat}>
                            <h3>£</h3>
                            <h3>{this.state.price}</h3>
                        </div>
                    </div>
                    <h3 className={classes.description}>{this.state.description}</h3>
                    {shownButton}
                    <GuildLogo />
                    {this.state.adminButtons}
                </div>
            </Aux>
        )
    }
}

export default withRouter(SingleSalonTreatment)