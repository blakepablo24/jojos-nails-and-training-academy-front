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

  const Map = ({ location, zoomLevel }) => (
    <div className={classes.map}>

      <p>16 Allfoxton Road</p>
      <p>Horfield, Bristol BS7 9NJ</p>
      <p className={classes.contact}>07772 155850</p>
      <p className={classes.contact}>info@jojosnailsbeautyandtrainingacademy.co.uk</p>
  
      <div className={classes.googleMap}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAqfrZ23O7S0LRZeysy_LE3iB0gjUPbHzs' }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.address}
          />
        </GoogleMapReact>
      </div>
    </div>
  )

  export default Map