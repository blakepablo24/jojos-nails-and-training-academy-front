import React, { Component } from "react";
import classes from "./GiftVouchers.module.css";
import Latest from '../../components/Ui/Navigation/Latest/Latest';
import Aux from '../../hoc/Auxilary/Auxilary';
import Logo from "../../components/Ui/Navigation/Header/Logo/Logo";

class GiftVouchers extends Component {

    state = {
        value: 50
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

    render(){
        return(
            <Aux>
                <Latest message="Vouchers from £25" />
                <div className={classes.GiftVouchers}>
                    <div className={classes.voucherWizardContainer}>
                    <p>Use the slider to select your</p>
                        <div className={classes.voucherValue}>
                            <input 
                                type="range"
                                value={this.state.value}
                                name="value" 
                                min="25"
                                max="250"
                                step="25"
                                onChange={this.onChangeHandler} 
                                className={classes.rangeSlider}
                            />
                        </div>
                        <p>£{this.state.value}</p>
                        <div className={classes.voucherName}>
                            <input placeholder="Name" />
                        </div>
                    </div>
                </div>
            </Aux>
        )
    }
}

export default GiftVouchers