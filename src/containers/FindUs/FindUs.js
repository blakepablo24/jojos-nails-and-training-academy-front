import React, { Component } from 'react';
import classes from './FindUs.module.css';
import Latest from '../../components/Ui/Navigation/Latest/Latest';
import Aux from '../../hoc/Auxilary/Auxilary';
import Map from '../../components/Map/Map';

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
                    <div className="elfsight-app-46f51913-5254-4ec0-b0c4-7ecafd184bf2"></div>
                </div>
            </Aux>
        )
    }
}

export default FindUs