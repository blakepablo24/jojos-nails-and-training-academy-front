import React, { Component } from 'react';
import classes from './GiftVouchersPending.module.css';
import axios from 'axios';
import CONST from '../../../constants/constants';
import { Redirect } from 'react-router';
import GoBack from '../../../components/Ui/GoBack/GoBack';
import Loading from '../../../components/Ui/Loading/Loading';

class GiftVouchersPending extends Component {

    state = {
        pending: [],
        unRedeemed: [],
        redeemed: [],
        voucherOptions: [
            {title: "pending"},
            {title: "unredeemed"},
            {title: "redeemed"}
        ],
        shownVouchers: "pending"
    }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        axios.get(CONST.BASE_URL + '/api/get-all-gift-vouchers').then(response => {
            this.setState({
                pending: response.data.pending,
                unredeemed: response.data.unredeemed,
                redeemed: response.data.redeemed
            })
        });
    }

    headerClickHandler = (header) => {
        this.setState({
            shownVouchers: header
        })
    }

    render(){
        return(
            <div className={classes.GiftVouchersPending}>
                <div className={classes.GiftVoucherHeader}>
                {this.state.voucherOptions.map((voucherOption, key) =>
                    <p className={voucherOption.title === this.state.shownVouchers 
                        ? classes.selectedVoucherType : classes.voucherType
                    } 
                    key={key}
                    onClick={this.headerClickHandler.bind(this, voucherOption.title)}
                    >
                        {voucherOption.title}
                    </p>
                )}
                </div>
                <div>
                    {
                        this.state.shownVouchers === "pending" ?
                            this.state.pending.map((voucher, key) =>
                                <div className={classes.customerVoucherContainer} key={key}>
                                    <p>{voucher.from}</p>
                                    <p>{voucher.to}</p>
                                    <p>{voucher.value}</p>
                                    <p>{voucher.message}</p>
                                    <p>{voucher.voucher_code}</p>
                                    <p>{voucher.updated_at}</p>
                                </div>
                            )   
                        : console.log("nothing")
                    }
                </div>
            </div>
        )
    }
}

export default GiftVouchersPending