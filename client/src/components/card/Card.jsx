import React from 'react';
import './card.scss';
import { Link } from 'react-router-dom';
import { SlLocationPin } from "react-icons/sl";
import { CiSaveDown1 } from "react-icons/ci";
import { CiChat1 } from "react-icons/ci";
import { MdOutlineBedroomParent } from "react-icons/md";
import { MdOutlineBathtub } from "react-icons/md";





export default function Card({item}) {

  // console.log('item : ', item );
  return (
    <div className='card'>
      <div className="imageContainer">
        <Link to={`/${item.id}`}>
          <img src={item.images[0]} alt="" />
        </Link>
      </div>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <SlLocationPin/>
          <span>{item.address}</span>
        </p>
        <p className="price">{item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
            <MdOutlineBedroomParent />
              <span>{ item.bedroom } bedroom</span>
            </div>
            <div className="feature">
            <MdOutlineBathtub />
              <span>{ item.bathroom } bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
            <CiSaveDown1 />
            </div>
            <div className="icon">
            <CiChat1 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
