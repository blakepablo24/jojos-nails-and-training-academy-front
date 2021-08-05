import React, { Component } from "react";
import classes from "./GiftVouchers.module.css";
import Latest from '../../components/Ui/Navigation/Latest/Latest';
import Aux from '../../hoc/Auxilary/Auxilary';
import Logo from "../../components/Ui/Navigation/Header/Logo/Logo";
import FlashMessage from 'react-flash-message';

class GiftVouchers extends Component {

    state = {
        value: 25,
        to: "",
        from: "",
        stage: 1,
        message: false,
        giftVoucherMessage: ""
    }

    onChangeHandler = (event) => {

        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value,
            [name + "Error"]: ""
        });
    }

    changeToPreviewHandler = (stage) => {
        this.setState({
            stage: stage
        })
    }

    resetStateHandler = () => {
        this.setState({
            message: false
        })
    }

    addVoucherToBasketHandler = (id, to, from, title, price, subCategoryTitle, type) => {
        this.props.addToShoppingBasket(id, to, from, title, price, subCategoryTitle, type);
        this.setState({
            value: 25,
            to: "",
            from: "",
            giftVoucherMessage: "",
            message: true
        })
        this.changeToPreviewHandler(1);
        setTimeout(() => {this.setState({message: false})}, 5000)
    }

    render(){
        let instructions = <p className={classes.instructions}>&#129044; Use this slider to select your voucher value</p>;

        if(this.state.value !== 25){
            instructions = "";
        }

        let button = "";

        let voucherGui =    <div className={classes.voucherWizardContainer}>
                                <div className={classes.voucherValueContainer}>
                                    {instructions}
                                    <input 
                                        type="range"
                                        value={this.state.value}
                                        name="value"
                                        min="25"
                                        max="500"
                                        step="25"
                                        onChange={this.onChangeHandler} 
                                        className={classes.rangeSlider}
                                    />
                                </div>
                                <p className={classes.exampleValue}>£{this.state.value}</p>
                                <div className={classes.voucherNameInputContainer}>
                                    <input
                                        type="text"
                                        value={this.state.to}
                                        name="to" 
                                        placeholder="Enter Voucher To Name?" 
                                        onChange={this.onChangeHandler}
                                        className={classes.voucherNameInput}
                                    />
                                    <input
                                        type="text"
                                        value={this.state.from}
                                        name="from" 
                                        placeholder="Enter Voucher From Name?" 
                                        onChange={this.onChangeHandler}
                                        className={classes.voucherNameInput}
                                    />
                                    <input
                                        type="text"
                                        value={this.state.giftVoucherMessage}
                                        name="giftVoucherMessage" 
                                        placeholder="Enter Personalized Message?" 
                                        onChange={this.onChangeHandler}
                                        className={classes.voucherNameInput}
                                    />
                                </div>
                            </div>

        if(this.state.to && this.state.from) {
            button =    <div className={classes.buttonContainer}>
                            <button className="customButton" onClick={this.changeToPreviewHandler.bind(this, 2)}>Next</button>
                        </div>
        }                            

        if(this.state.stage === 2) {
            button =    <div className={classes.buttonContainer}>
                            <button className="customButton" onClick={this.changeToPreviewHandler.bind(this, 1)}>Back</button>
                            <button className="customButton" onClick={this.addVoucherToBasketHandler.bind(this, "voucher", this.state.to, this.state.from, this.state.giftVoucherMessage, this.state.value, "Gift Voucher", "gift_voucher")}>Add To Basket</button>
                        </div>
        }             

        let giftVoucherMessage = <h4>A Gift for you</h4>

        if(this.state.giftVoucherMessage){
            giftVoucherMessage = this.state.giftVoucherMessage;
        }

        if(this.state.stage === 2){
            voucherGui =   <div className={classes.voucherExample}>
                                <div className={classes.voucherImage}>
                                    <Logo />
                                </div>
                                <h2 className={classes.voucherTitle}>£{this.state.value} Gift Voucher</h2>
                                <h3>to</h3>
                                <h3 className={classes.voucherName}>{this.state.to}</h3>
                                <h3>from</h3>
                                <h3 className={classes.voucherName}>{this.state.from}</h3>
                                <h3 className={classes.voucherMessage}>{giftVoucherMessage}</h3>
                                <p className={classes.voucherCode}>Code: XXXX-XXXX-XXXX</p>
                                <p className={classes.voucherCode}>This is an example Voucher</p>
                            </div>
        }

        let successMsg = "";

        if(this.state.message){
            successMsg = (
                <FlashMessage duration={5000}>
                    <div className="load-msg">
                        <h3 className="success">Voucher added to basket. Add another?</h3>
                    </div>
                </FlashMessage>
            );
        }

        return(
            <Aux>
                <Latest message="Digital Gift Vouchers from £25" />
                <div className={classes.GiftVouchers}>
                    {voucherGui}
                    {button}
                    {successMsg}
                </div>
            </Aux>
        )
    }
}

export default GiftVouchers