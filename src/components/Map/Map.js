import React from 'react';
import GoogleMapReact from 'google-map-react';
import classes from './Map.module.css';
import { FaMapMarkerAlt } from "react-icons/fa";

  const LocationPin = ({ text }) => (
    <div className={classes.pin}>
      <FaMapMarkerAlt />
      <p className={classes.pinText}>{text}</p>
    </div>
  )

  const Map = (props) => (
    <div className={classes.map}>
      <p>16 Allfoxton Road</p>
      <p>Horfield, Bristol BS7 9NJ</p>
      <p className={classes.contact}>07772 155850</p>
      <p className={classes.contact}>info@jojosnailsbeautyandtrainingacademy.co.uk</p>
  
      <div className={classes.googleMap}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: props.gacKey }}
          defaultCenter={props.location}
          defaultZoom={props.zoomLevel}
        >
          <LocationPin
            lat={props.location.lat}
            lng={props.location.lng}
            text={props.location.address}
          />
        </GoogleMapReact>
      </div>
    </div>
  )

  export default Map