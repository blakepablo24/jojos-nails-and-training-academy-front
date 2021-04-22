import React, { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Ui/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Ui/Navigation/Toolbar/Navigation/SideDrawer/SideDrawer';
import Header from '../../components/Ui/Navigation/Header/Header';
import LandingPage from '../../containers/LandingPage/LandingPage';
import TrainingCourses from '../../containers/TrainingCourses/TrainingCourses';
import SingleTrainingCourse from '../../containers/SingleTrainingCourse/SingleTrainingCourse';
import Footer from '../../components/Ui/Navigation/Footer/Footer';
import { Route, Switch } from 'react-router-dom';
import SalonTreatments from '../../containers/SalonTreatments/SalonTreatments';
import SalonTreatmentsSubCat from '../../containers/SalonTreatmentsSubCat/SalonTreatmentsSubCat';
import SingleSalonTreatment from '../../containers/SingleSalonTreatment/SingleSalonTreatment';
import Login from '../../components/authentication/Login/Login';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import AdminLandingPage from '../../containers/Admin/AdminLandingPage/AdminLandingPage';
import NewSalonTreatment from '../../containers/Admin/NewSalonTreatment/NewSalonTreatment';
import NewTrainingCourse from '../../containers/Admin/NewTrainingCourse/NewTrainingCourse';
import AddCurriculum from '../../containers/Admin/AddCurriculum/AddCurriculum';
import EditSalonTreatment from '../../containers/Admin/EditSalonTreatment/EditSalonTreatment';
import EditTrainingCourse from '../../containers/Admin/EditTrainingCourse/EditTrainingCourse';
import FrontLandingPage from '../../containers/Admin/FrontLandingPage/FrontLandingPage';
import Basket from '../../components/Ui/Basket/Basket';

let initialBasket = [];
if(JSON.parse(localStorage.getItem("basketItems"))) {
    initialBasket = JSON.parse(localStorage.getItem("basketItems"))
}

class Layout extends Component {

    state = {
        showSideDrawer: false,
        menu: true,
        isAuthenticated: false,
        showBasket: false,
        itemsInBasket: initialBasket,
        checkout: false
    }

    sideDrawerToggleHandler = () => {
        this.setState({
            showSideDrawer: !this.state.showSideDrawer,
            menu: !this.state.menu
        })
    }

    getData = (val) => {
        if(val === "logged_in"){
            this.setState({
                isAuthenticated: true
            })
        }
        if(val === "not_logged_in"){
            this.setState({
                isAuthenticated: false
            })
        }
    }

    basketToggleHandler = () => {
        if(this.state.checkout){
            this.toggleCheckout();
        }

        this.setState({
            showBasket: !this.state.showBasket
        })
    }

    addToShoppingBasketHandler = (id, title, price) => {
        let basketItems = [];
        let storedBasketitems = JSON.parse(localStorage.getItem("basketItems"));
        let basketItem = "";
        if(storedBasketitems !== null) {
            basketItems = storedBasketitems;
            basketItem = basketItems.findIndex(result => result.id === id)
            if(basketItem >= 0) {
                basketItems[basketItem].quantity = basketItems[basketItem].quantity + 1;
            } else {
                basketItems.push({
                    id: id,
                    title: title,
                    price: price,
                    quantity: 1
                })
            }
        } else {
            basketItems.push({
                id: id,
                title: title,
                price: price,
                quantity: 1
            })
        }
        localStorage.setItem('basketItems', JSON.stringify(basketItems));
        this.setState({
            itemsInBasket: basketItems
        })
    }

    removeItemfromBasketHandler = (id) => {
        let basketItems = JSON.parse(localStorage.getItem("basketItems"));
        let basketItem = basketItems.findIndex(result => result.id === id);
        basketItems.splice(basketItem, 1);
        localStorage.setItem('basketItems', JSON.stringify(basketItems));
        if(basketItems.length < 1){
            localStorage.clear();
            this.setState({
                itemsInBasket: basketItems
            })
        } else {
            localStorage.setItem('basketItems', JSON.stringify(basketItems));
            this.setState({
                itemsInBasket: basketItems
            })
        }
    }

    minusShoppingBasketHandler = (id) => {
        let basketItems = JSON.parse(localStorage.getItem("basketItems"));
        let basketItem = basketItems.findIndex(result => result.id === id);
        if(basketItems[basketItem].quantity === 1) {
            this.removeItemfromBasketHandler(id);
        } else {
            basketItems[basketItem].quantity = basketItems[basketItem].quantity - 1;
            localStorage.setItem('basketItems', JSON.stringify(basketItems));
            this.setState({
                itemsInBasket: basketItems
            })
        }
    }

    toggleCheckout = () => {
        this.setState({
            checkout: !this.state.checkout
        })
    }

    render() {
        let isAuthenticated = this.state.isAuthenticated;
        let sideDrawer = <SideDrawer open={this.state.showSideDrawer} clicked={this.sideDrawerToggleHandler} auth={this.state.isAuthenticated} sendData={this.getData} />;

        if(JSON.parse(localStorage.getItem("user"))){
            isAuthenticated = true;
        }

        // Prevent scrolling if menu open
        if(this.state.showSideDrawer){
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }

        return(
            <div className={classes.Layout}>
                <Toolbar numberOfItemsInBasket={this.state.itemsInBasket.length} toggleBasket={this.basketToggleHandler} menu={this.state.menu} clicked={this.sideDrawerToggleHandler} auth={isAuthenticated} />
                {sideDrawer}
                <Basket
                    itemsInBasket={this.state.itemsInBasket}
                    toggleBasket={this.basketToggleHandler} 
                    showBasket={this.state.showBasket}
                    remove={this.removeItemfromBasketHandler}
                    plus={this.addToShoppingBasketHandler}
                    minus={this.minusShoppingBasketHandler}
                    checkout={this.state.checkout}
                    toggleCheckout={this.toggleCheckout}
                />        
                <Header />
                <Switch>
                    <Route path="/" exact component={LandingPage} />
                    <Route path="/training-courses" exact component={TrainingCourses}/>
                    <Route path="/single-training-course/:id" exact render={(props) => <SingleTrainingCourse {...props} auth={isAuthenticated} />} />
                    <Route path="/salon-treatments" exact component={SalonTreatments} />
                    <Route path="/category/:salonSubCategory/:id" exact render={(props) => <SalonTreatmentsSubCat {...props} addToShoppingBasket={this.addToShoppingBasketHandler} auth={isAuthenticated} />} />
                    <Route path="/treatment/:treatmentName/:id" exact render={(props) => <SingleSalonTreatment {...props} addToShoppingBasket={this.addToShoppingBasketHandler} auth={isAuthenticated} />}/>
                    <Route path="/staff-login" exact render={(props) => <Login {...props} auth={this.state.isAuthenticated} sendData={this.getData} />}/>
                    <ProtectedRoute path="/admin" exact component={AdminLandingPage} auth={isAuthenticated} />
                    <ProtectedRoute path="/admin/new-salon-treatment" exact component={NewSalonTreatment} auth={isAuthenticated} />
                    <ProtectedRoute path="/admin/new-training-course" exact component={NewTrainingCourse} auth={isAuthenticated} />
                    <ProtectedRoute path="/admin/add-curriculum/:id" exact component={AddCurriculum} auth={isAuthenticated} />
                    <ProtectedRoute path="/admin/edit-salon-treatment/:id" exact component={EditSalonTreatment} auth={isAuthenticated} />
                    <ProtectedRoute path="/admin/edit-training-course/:id" exact component={EditTrainingCourse} auth={isAuthenticated} />
                    <ProtectedRoute path="/admin/front-landing-page" exact component={FrontLandingPage} auth={isAuthenticated} />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default Layout