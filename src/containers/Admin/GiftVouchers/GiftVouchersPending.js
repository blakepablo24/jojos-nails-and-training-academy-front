import React, { Component } from 'react';
import classes from './GiftVouchersPending.module.css';
import axios from 'axios';
import CONST from '../../../constants/constants';
import GoBack from '../../../components/Ui/GoBack/GoBack';
import Loading from '../../../components/Ui/Loading/Loading';
import ConfirmDelete from '../../../components/Ui/ConfirmDelete/ConfirmDelete';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Latest from '../../../components/Ui/Navigation/Latest/Latest';

class GiftVouchersPending extends Component {

    state = {
        pending: [],
        unredeemed: [],        
        redeemed: [],
        voucherOptions: [
            {title: "pending"},
            {title: "unredeemed"},
            {title: "redeemed"}
        ],
        shownVouchers: "pending",
        shownVouchersArray: [],
        confirmDelete: "",
        open: false,
        loading: ""
    }

    componentDidMount() {
        this.load();
    }

    load = () => {
        this.setState({
            loading: <Loading />
        })
        axios.defaults.withCredentials = true;
        axios.get(CONST.BASE_URL + '/api/get-all-gift-vouchers').then(response => {
            this.setState({
                pending: response.data.pending,
                unredeemed: response.data.unredeemed,
                redeemed: response.data.redeemed,
                shownVouchersArray: response.data.pending,
                loading: "",
                confirmDelete: ""
            })
        })
    }

    headerClickHandler = (header) => {
        let showVouchersArray = [];
        this.state.pending.title === header ?
        showVouchersArray = this.state.pending :
        this.state.unredeemed.title === header ?
        showVouchersArray = this.state.unredeemed :
        showVouchersArray = this.state.redeemed
        this.setState({
            shownVouchers: header,
            shownVouchersArray: showVouchersArray
        })
    }

    removeConfirmDeleteHandler = () => {
        this.setState({
            confirmDelete: "",
            open: false
        })
    }

    confirmDeleteHandler = (id) => {
        this.setState({
            open: true,
            confirmDelete: <ConfirmDelete delete={this.deleteHandler.bind(this, id)} clicked={this.removeConfirmDeleteHandler} />
        })
    }

    deleteHandler = (id) => {
        this.setState({
            loading: <Loading />
        })
        axios.defaults.withCredentials = true;
        axios.delete(CONST.BASE_URL + '/api/delete-pending-gift-voucher/' + id).then(response => {
            this.load();
        })
    }

    confirmApproveHandler = (id) => {
        this.setState({
            open: true,
            confirmDelete: <ConfirmDelete approve={true} delete={this.approveHandler.bind(this, id)} clicked={this.removeConfirmDeleteHandler} />
        })
    }

    approveHandler = (id) => {
        this.setState({
            loading: <Loading />
        })
        axios.defaults.withCredentials = true;
        axios.post(CONST.BASE_URL + '/api/approve-pending-gift-voucher/' + id).then(response => {
            this.load();
        }).catch(function (error) {
            if (error.response) {
              // Request made and server responded
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
        
          });
    }

    render(){
        return(
            <Aux>
                <Latest message={"Gift Vouchers Pending"}/>
                <div className={classes.GiftVouchersPending}>
                    {this.state.confirmDelete}
                    {this.state.loading}
                    <GoBack back={() => this.props.history.goBack()} />
                    <div className={classes.GiftVoucherHeader}>
                    {this.state.voucherOptions.map((voucherOption, key) =>
                        <p className={voucherOption.title === this.state.shownVouchers 
                            ? classes.selectedVoucherType : classes.voucherType
                        + " selectable"} 
                        key={key}
                        onClick={this.headerClickHandler.bind(this, voucherOption.title)}
                        >
                            {voucherOption.title}
                        </p>
                    )}
                    </div>
                    <div className={classes.allVouchersContainer}>
                        {
                        this.state.shownVouchersArray.vouchers ?
                        this.state.shownVouchersArray.vouchers.map((voucher, key) =>
                            <div className={classes.customerVoucherContainer} key={key}>
                                <p className={classes.left}>Name:</p>
                                <p className={classes.right}>{voucher.name}</p>
                                <p className={classes.left}>Number:</p>
                                <p className={classes.right}>{voucher.number}</p>
                                <p className={classes.left}>Email:</p>
                                <p className={classes.right}>{voucher.email}</p>
                                <p className={classes.left}>From:</p>
                                <p className={classes.right}>{voucher.from}</p>
                                <p className={classes.left}>To:</p>
                                <p className={classes.right}>{voucher.to}</p>
                                <p className={classes.left}>Message:</p>
                                <p className={classes.right}>{voucher.message}</p>
                                <p className={classes.right}>Value:</p>
                                <p className={classes.right}>£{voucher.value}</p>
                                <p className={classes.left}>Code:</p>
                                <p className={classes.right}>{voucher.voucher_code}</p>
                                <p className={classes.left}>Date:</p>
                                <p className={classes.right}>{new Date(voucher.updated_at).toLocaleDateString()} - {new Date(voucher.updated_at).toLocaleTimeString()}</p>
                                {voucher.pending ?
                                <div className={classes.controlsContainer}>
                                    <h4 className="success selectable" onClick={this.confirmApproveHandler.bind(this, voucher.id)}>Approve</h4>
                                    <h4 className="error selectable" onClick={this.confirmDeleteHandler.bind(this, voucher.id)}>Remove</h4>
                                </div>: ""
                                }
                            </div>
                            )
                        : "No Pending Vouchers" 
                        }
                    </div>
                </div>
            </Aux>
        )
    }
}

export default GiftVouchersPending