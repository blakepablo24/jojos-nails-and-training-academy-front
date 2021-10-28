import React, { Component } from 'react';
import classes from './FindUs.module.css';
import Latest from '../../components/Ui/Navigation/Latest/Latest';
import Aux from '../../hoc/Auxilary/Auxilary';
import Map from '../../components/Map/Map';
import Reviews from '../../components/Ui/Reviews/Reviews';

const location = {
    address: 'JoJos Nails, Beauty & Training Academy',
    lat: 51.475717288163025,
    lng: -2.5717576573529892,
  }

class FindUs extends Component {
    render() {
        return(
            <Aux>
                <Latest message="Come and Visit the Salon" />
                <div className={classes.FindUs}>
                    <Map location={location} zoomLevel={17}/>
                    <Reviews />
                </div>
            </Aux>
        )
    }
}

export default FindUs