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
import axios from 'axios';
import CONST from '../../constants/constants';
import EmailValidator from 'email-validator';
import FUNCTIONS from '../../functions/functions';
import FindUs from '../../containers/FindUs/FindUs';
import GiftVouchers from "../../containers/GiftVouchers/GiftVouchers";
import Loading from '../../components/Ui/Loading/Loading';
import AddEditSalonTreatmentCategories from '../../containers/Admin/AddEditSalonTreatmentCategories/AddEditSalonTreatmentCategories';
import GiftVouchersPending from '../../containers/Admin/GiftVouchers/GiftVouchersPending';
import PrivacyPolicyModal from '../../components/Ui/PrivacyPolicyModal/PrivacyPolicyModal';
import PrivacyPolicy from '../../containers/PrivacyPolicy/PrivacyPolicy';

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
        basketItemST: false,
        basketItemTC: false,
        basketItemVoucher: false,
        checkout: false,
        treatmentsStartdate: "",
        trainingCourseStartdate: "",
        bookingRequestName: "",
        bookingRequestEmail: "",
        bookingRequestNumber: "",
        bookingRequestTime: "",
        bookingRequestNameError: "",
        bookingRequestEmailError: "",
        bookingRequestNumberError: "",
        bookingRequestTimeError: "",
        treatmentsStartdateError: "",
        trainingCourseStartdateError: "",
        showPrivacyPolicyModal: false,
        showPrivacyPolicy: false,
    }

    componentDidMount = () => { 
        if(!this.getCookie("visitedBefore")) {
            this.setState({
                showPrivacyPolicyModal: true
            })
        }
    }

    sideDrawerToggleHandler = () => {
        this.setState({
            showSideDrawer: !this.state.showSideDrawer,
            menu: !this.state.menu
        })
    }

    getData = (val) => {
        if(val === "logged_in"){
            this.scrollToTop();
            this.setState({
                isAuthenticated: true
            })
        }
        if(val === "not_logged_in"){
            this.scrollToTop();
            this.setState({
                isAuthenticated: false
            })
        }
    }

    scrollToTop = () => {
        window.scrollTo(0, 0);
    }

    basketToggleHandler = () => {
        this.setState({
            showBasket: !this.state.showBasket
        })
    }

    addToShoppingBasketHandler = (id, to, from, title, price, subCategoryTitle, type) => {
        let basketItems = [];
        let storedBasketitems = JSON.parse(localStorage.getItem("basketItems"));
        let basketItem = "";

        if(id === "voucher"){
            let time = new Date()
            let hours = time.getHours();
            let minutes = time.getMinutes();
            let seconds = time.getSeconds();
            id = "voucher" + hours + minutes + seconds;
        }

        if(storedBasketitems !== null) {
            basketItems = storedBasketitems;
            basketItem = basketItems.findIndex(result => result.id === id)
            if(basketItem >= 0) {
                basketItems[basketItem].quantity = basketItems[basketItem].quantity + 1;
            } else {
                basketItems.push({
                    id: id,
                    to: to,
                    from: from,
                    title: title,
                    price: price,
                    subCategoryTitle: subCategoryTitle,
                    quantity: 1,
                    type: type
                })
            }
        } else {
            basketItems.push({
                id: id,
                to: to,
                from: from,
                title: title,
                price: price,
                subCategoryTitle: subCategoryTitle,
                quantity: 1,
                type: type
            })
        }

        localStorage.setItem('basketItems', JSON.stringify(basketItems));
        this.setState({
            itemsInBasket: basketItems,
            basketItemST: FUNCTIONS.checkBasket("ST"),
            basketItemTC: FUNCTIONS.checkBasket("TC"),
            basketItemVoucher: FUNCTIONS.checkBasket("gift_voucher")
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
                itemsInBasket: basketItems,
                basketItemST: false,
                basketItemTC: false,
                basketItemVoucher: false,
            })
        } else {
            localStorage.setItem('basketItems', JSON.stringify(basketItems));
            this.setState({
                itemsInBasket: basketItems,
                basketItemST: FUNCTIONS.checkBasket("ST"),
                basketItemTC: FUNCTIONS.checkBasket("TC"),
                basketItemVoucher: FUNCTIONS.checkBasket("gift_voucher")
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
                itemsInBasket: basketItems,
                basketItemST: FUNCTIONS.checkBasket("ST"),
                basketItemTC: FUNCTIONS.checkBasket("TC")
            })
        }
    }

    checkoutView = (view) => {
        this.setState({
            checkout: view
        })
    }

    trainingCourseStartdateChangehandler = (date) => {
        this.setState({
            trainingCourseStartdate: date,
            trainingCourseStartdateError: ""
        })
    }

    treatmentsStartdateChangehandler = (date) => {
        this.setState({
            treatmentsStartdate: date,
            treatmentsStartdateError: ""
        })
    }

    treatmentErrorCheckHandler = (event) => {
        event.preventDefault();
        let bookingRequestTimeError = "";
        let treatmentsStartdateError = "";

        if(this.state.bookingRequestTime === "select" || this.state.bookingRequestTime === ""){
            bookingRequestTimeError = <h4 className="error">Please choose your preferred time</h4>;
        }

        if(this.state.treatmentsStartdate === ""){
            treatmentsStartdateError = <h4 className="error">Please select your preferred date</h4>;
        }
        
        if(!bookingRequestTimeError && !treatmentsStartdateError){
            this.checkoutView("customer-details");
        } else {
            this.setState({
                bookingRequestTimeError: bookingRequestTimeError,
                treatmentsStartdateError: treatmentsStartdateError
            })
        }
    }

    trainingCourseErrorCheckHandler = (event) => {
        event.preventDefault();
        let trainingCourseStartdateError = "";

        if(this.state.trainingCourseStartdate === ""){
            trainingCourseStartdateError = <h4 className="error">Please select your preferred date</h4>;
        }
        
        if(!trainingCourseStartdateError){
            if(FUNCTIONS.checkBasket(CONST.ST)){
                this.checkoutView("book-salon-treatments");
            } else {
                this.checkoutView("customer-details");
            }
        } else {
            this.setState({
                trainingCourseStartdateError: trainingCourseStartdateError
            })
        }
    }

    changeHandler = (event) => {

        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value,
            [name + "Error"]: ""
        });
    }

    finishHandler = (event, totalCost) => {
        event.preventDefault();

        let bookingRequestNameError = "";
        let bookingRequestEmailError = "";
        let bookingRequestNumberError = "";

        if(this.state.bookingRequestName === ""){
            bookingRequestNameError = <h4 className="error">Please Enter your name!</h4>;
        } else if(this.state.bookingRequestName.length < 5){
            bookingRequestNameError = <h4 className="error">Name must be longer 5 characters</h4>;
        }

        if (/[^a-zA-Z -']/.test(this.state.bookingRequestName)) {
            bookingRequestNameError = <h4 className="error">Please enter a valid name!</h4>;
        }
        if(!EmailValidator.validate(this.state.bookingRequestEmail)){
            bookingRequestEmailError = <h4 className="error">Please enter a valid email address!</h4>
        }

        if (/[^0-9]/.test(this.state.bookingRequestNumber)) {
            bookingRequestNumberError = <h4 className="error">Please a valid number!</h4>;
        } else if (this.state.bookingRequestNumber.length !== 11){
            bookingRequestNumberError = <h4 className="error">Number is not correct length</h4>;
        }

        if(!bookingRequestNameError && !bookingRequestEmailError && !bookingRequestNumberError){
            this.setState({
                loading: <Loading />
            })
            axios.defaults.withCredentials = true;
            axios.post(CONST.BASE_URL + '/api/new-booking-enquiry', {
                itemsInBasket: this.state.itemsInBasket,
                treatmentsStartdate: this.state.treatmentsStartdate,
                trainingCourseStartdate: this.state.trainingCourseStartdate,
                name: this.state.bookingRequestName,
                email: this.state.bookingRequestEmail,
                number: this.state.bookingRequestNumber,
                time: this.state.bookingRequestTime,
                TC: this.state.basketItemTC,
                ST: this.state.basketItemST,
                gift_voucher: this.state.basketItemVoucher,
                totalCost: totalCost       
            }).then(response => {
                localStorage.clear();
                this.setState({
                    itemsInBasket: [],
                    treatmentsStartdate: "",
                    trainingCourseStartdate: "",
                    bookingRequestName: "",
                    bookingRequestEmail: "",
                    bookingRequestNumber: "",
                    bookingRequestTime: "",
                    loading: ""
                })
                this.checkoutView("completed");
            })
        } else {
            this.setState({
                bookingRequestNameError: bookingRequestNameError,
                bookingRequestEmailError: bookingRequestEmailError,
                bookingRequestNumberError: bookingRequestNumberError
            })
        }
    }

    showPrivacyPolicyModalToggleHandler = () => {
        this.setState({
            showPrivacyPolicyModal: !this.state.showPrivacyPolicyModal
        })

        if(!JSON.parse(localStorage.getItem("visitedBefore"))) {
            this.setCookie("visitedBefore", true, 30)
        }
    }

    showPrivacyPolicyToggleHandler = () => {
        this.setState({
            showPrivacyPolicy: !this.state.showPrivacyPolicy
        })
    }

    setCookie = (cname, cvalue, exdays) => {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    getCookie = (cname) => {
        let allCookies = document.cookie.split(';');
        let cookieExists = false;
        allCookies.forEach(cookie => {
            if(cookie === cname+"="+true){
                cookieExists = true
            }
        });
        return cookieExists;
    }

    render() {
        let isAuthenticated = this.state.isAuthenticated;
        let sideDrawer = <SideDrawer open={this.state.showSideDrawer} clicked={this.sideDrawerToggleHandler} auth={this.state.isAuthenticated} sendData={this.getData} />;
        let showPrivacyPolicyModal = "";
        
        if(JSON.parse(localStorage.getItem("user"))){
            isAuthenticated = true;
        }

        if(JSON.parse(localStorage.getItem("user"))){
            isAuthenticated = true;
        }

        // Prevent scrolling if menu open
        if(this.state.showSideDrawer || this.state.showBasket){
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }

        if(this.state.showPrivacyPolicyModal) {
            showPrivacyPolicyModal = <PrivacyPolicyModal  
            showPrivacyPolicy={this.state.showPrivacyPolicy} togglePrivacyPolicyModal={this.showPrivacyPolicyModalToggleHandler} togglePrivacyPolicy={this.showPrivacyPolicyToggleHandler} />;
        }

        return(
            <div className={classes.Layout}>
                {showPrivacyPolicyModal}
                {this.state.loading}
                <Toolbar showSideDrawer={this.state.showSideDrawer} numberOfItemsInBasket={this.state.itemsInBasket.length} toggleBasket={this.basketToggleHandler} menu={this.state.menu} clicked={this.sideDrawerToggleHandler} auth={isAuthenticated} />
                {sideDrawer}
                <Basket
                    trainingCourseStartdate={this.state.trainingCourseStartdate}
                    treatmentsStartdate={this.state.treatmentsStartdate}
                    bookingRequestName={this.state.bookingRequestName}
                    bookingRequestEmail={this.state.bookingRequestEmail}
                    bookingRequestNumber={this.state.bookingRequestNumber}
                    bookingRequestTime={this.state.bookingRequestTime}
                    bookingRequestNameError={this.state.bookingRequestNameError}
                    bookingRequestEmailError={this.state.bookingRequestEmailError}
                    bookingRequestNumberError={this.state.bookingRequestNumberError}
                    bookingRequestTimeError={this.state.bookingRequestTimeError}
                    treatmentsStartdateError={this.state.treatmentsStartdateError}
                    trainingCourseStartdateError={this.state.trainingCourseStartdateError}
                    itemsInBasket={this.state.itemsInBasket}
                    toggleBasket={this.basketToggleHandler} 
                    showBasket={this.state.showBasket}
                    remove={this.removeItemfromBasketHandler}
                    plus={this.addToShoppingBasketHandler}
                    minus={this.minusShoppingBasketHandler}
                    checkout={this.state.checkout}
                    checkoutView={this.checkoutView}
                    trainingCourseStartdateChangehandler={this.trainingCourseStartdateChangehandler}
                    treatmentsStartdateChangehandler={this.treatmentsStartdateChangehandler}
                    treatmentErrorCheckHandler={this.treatmentErrorCheckHandler}
                    trainingCourseErrorCheckHandler={this.trainingCourseErrorCheckHandler}
                    changeHandler={this.changeHandler}
                    finishHandler={this.finishHandler}
                />        
                <Header />
                <Switch>
                    <Route path="/" exact component={LandingPage} />
                    <Route path="/training-courses" exact component={TrainingCourses}/>
                    <Route path="/single-training-course/:id" exact render={(props) => <SingleTrainingCourse {...props} toggleBasket={this.basketToggleHandler} addToShoppingBasket={this.addToShoppingBasketHandler} auth={isAuthenticated} />} />
                    <Route path="/salon-treatments" exact component={SalonTreatments} />
                    <Route path="/category/:salonSubCategory/:id" exact render={(props) => <SalonTreatmentsSubCat {...props} toggleBasket={this.basketToggleHandler} addToShoppingBasket={this.addToShoppingBasketHandler} auth={isAuthenticated} />} />
                    <Route path="/treatment/:treatmentName/:id" exact render={(props) => <SingleSalonTreatment {...props} toggleBasket={this.basketToggleHandler} addToShoppingBasket={this.addToShoppingBasketHandler} auth={isAuthenticated} />}/>
                    <Route path="/find-us" exact component={FindUs}/>
                    <Route path="/gift-vouchers" exact render={(props) => <GiftVouchers {...props} addToShoppingBasket={this.addToShoppingBasketHandler} />}/>
                    <Route path="/staff-login" exact render={(props) => <Login {...props} auth={this.state.isAuthenticated} sendData={this.getData} />}/>
                    <Route path="/privacy-policy" exact component={PrivacyPolicy}/>
                    <ProtectedRoute path="/admin" exact component={AdminLandingPage} auth={isAuthenticated} />
                    <ProtectedRoute path="/admin/new-salon-treatment" exact component={NewSalonTreatment} auth={isAuthenticated} />
                    <ProtectedRoute path="/admin/add-edit-salon-treatment" exact component={AddEditSalonTreatmentCategories} auth={isAuthenticated} />
                    <ProtectedRoute path="/admin/gift-vouchers-pending" exact component={GiftVouchersPending} auth={isAuthenticated} />
                    <ProtectedRoute path="/admin/new-training-course" exact component={NewTrainingCourse} auth={isAuthenticated} />
                    <ProtectedRoute path="/admin/add-curriculum/:id" exact component={AddCurriculum} auth={isAuthenticated} />
                    <ProtectedRoute path="/admin/edit-salon-treatment/:id" exact component={EditSalonTreatment} auth={isAuthenticated} />
                    <ProtectedRoute path="/admin/edit-training-course/:id" exact component={EditTrainingCourse} auth={isAuthenticated} />
                    <ProtectedRoute path="/admin/front-landing-page" exact component={FrontLandingPage} auth={isAuthenticated} />
                </Switch>
                <Footer sendData={this.getData} scrollToTop={this.scrollToTop} />
            </div>
        )
    }
}

export default Layout