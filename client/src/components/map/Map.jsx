import React from 'react';
import './map.scss';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import Pin from '../pin/Pin';

export default function Map({items}) {

  return (
        
  <MapContainer center={items.length === 1? [items[0].latitude, items[0].longitude] : [ 12.97194000  , 77.59369000 ] } zoom={7} scrollWheelZoom={false} className='map'>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {
        items.map(item => <Pin item={item} key={item.id}/> )
      }
  </MapContainer>

  )
}
