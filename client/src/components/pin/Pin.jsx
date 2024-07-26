import React from 'react';
import './pin.scss';
import { Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Link } from 'react-router-dom';



export default function Pin({item}) {
  return (
    <div className='pin'>
      <Marker position={[ item.latitude, item.longitude ]}>
      <Popup>
        
        <div className="popupContainer">
            <img src={item.img} alt="property image" />
            <div className="textContainer">
                <Link to={`/${item.id}`}>{item.title}</Link>
                <span >{item.bedroom} bedroom</span>
                <b>{ item.price }</b>
            </div>
        </div>
      </Popup>
    </Marker>
    </div>
  )
}
