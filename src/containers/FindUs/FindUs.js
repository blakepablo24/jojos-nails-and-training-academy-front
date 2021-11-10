import React, { Component } from 'react';
import classes from './FindUs.module.css';
import Latest from '../../components/Ui/Navigation/Latest/Latest';
import Aux from '../../hoc/Auxilary/Auxilary';
import Map from '../../components/Map/Map';
import Reviews from '../../components/Ui/Reviews/Reviews';
import Loading from '../../components/Ui/Loading/Loading';
import axios from 'axios';
import CONST from '../../constants/constants';

class FindUs extends Component {

    state = {
        loading: "",
        gm: "",        
        location: {
            address: 'JoJos Nails, Beauty & Training Academy',
            lat: 51.475717288163025,
            lng: -2.5717576573529892
        },
    }

    componentDidMount = () => {
        this.setState({
            loading: <Loading component={true} />
        })
        axios.defaults.withCredentials = true;
        axios.get(CONST.BASE_URL + "/api/get-gac").then(response => {
            this.setState({
                gm: <Map gacKey={response.data} location={this.state.location} zoomLevel={17}/>,
                loading: ""
            })
        })
    }

    render() {
        return(
            <Aux>
                <Latest message="Come and Visit the Salon" />
                <div className={classes.FindUs}>
                    {this.state.loading}
                    {this.state.gm}
                    <Reviews />
                </div>
            </Aux>
        )
    }
}

export default FindUs