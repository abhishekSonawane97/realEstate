import React, { useContext, useState } from 'react';
import './singlePage.scss';
import Slider from '../../components/slider/Slider';
// import { singlePostData, userData } from '../../lib/dummyData';
import { SlLocationPin } from "react-icons/sl";
import Map from '../../components/map/Map.jsx';
import { CiSaveDown1 } from "react-icons/ci";
import { CiChat1 } from "react-icons/ci";
import { MdMiscellaneousServices } from "react-icons/md";
import { MdOutlinePets } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiResize } from "react-icons/gi";
import { MdOutlineBedroomParent } from "react-icons/md";
import { MdOutlineBathtub } from "react-icons/md";
import { FaSchool } from "react-icons/fa6";
import { TbBusStop } from "react-icons/tb";
import { IoIosRestaurant } from "react-icons/io";
import { useLoaderData, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import apiRequest from '../../lib/apiRequest.js';
import { AuthContext } from '../../context/AuthContext.jsx';




export default function SinglePage() {

  const { currentUser } = useContext(AuthContext);
  const post = useLoaderData();
  const navigate = useNavigate();
  const [ saved, setSaved ] = useState( post.isSaved );

  const handleSave = async(e) => {
    e.preventDefault();
    // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK 
    setSaved(prev => !prev);
    if(!currentUser) return navigate('/login');
    try{
      await apiRequest.post('/user/save', { postId : post.id });
      
    }
    catch(err){
      console.log('Error : ', err);
      setSaved(prev => !prev);
    }
  }

 
  return (
    <div className='singlePage'>
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images}/>
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <SlLocationPin/>
                  <span>{post.address}</span>
                </div>
                <div className="price">
                  $ { post.price }
                </div>
              </div>
              <div className="user">
                  <img src={post.user.avatar} alt="" />
                  <span>{ post.user.username }</span>
              </div>
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.postDetail.desc)}}>
              {/* { post.postDetail.desc } */}
            </div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
            <MdMiscellaneousServices />
              <div className="featureText">
                <span>Utilities</span>
                {
                  post.postDetail.utilities === "owner" ? ( <p>Owner is responsible</p> ) : ( <p>Tenant is responsible</p> )
                }
              </div>
            </div>
            <div className="feature">
            <MdOutlinePets />
              <div className="featureText">
                <span>Pet Policy</span>
                {
                  post.postDetail.pet === "allowed" ? <p>Pets Allowed</p> : <p>Pets Not Allowed</p>
                }
              </div>
            </div>
            <div className="feature">
            <GiTakeMyMoney />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
            <GiResize /><span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
            <MdOutlineBedroomParent /><span>{post.bedroom} bed</span>
            </div>
            <div className="size">
            <MdOutlineBathtub /><span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
          <div className="feature">
            <FaSchool />
              <div className="featureText">
                <span>School</span>
                <p>{post.postDetail.school > 999 ? post.postDetail.school / 1000 + "km" : post.postDetail.school + "m"} away</p>
              </div>
            </div>
            <div className="feature">
            <TbBusStop />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus > 999 ? post.postDetail.bus / 1000 + "km" : post.postDetail.bus + "m"} away</p>
              </div>
            </div>
            <div className="feature">
            <IoIosRestaurant />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant > 999 ? post.postDetail.restaurant / 1000 + "km" : post.postDetail.restaurant + "m"} away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
          <Map items={[post]}/>
          </div>
          <div className="buttons">
            <button>
            <CiChat1 />Send a Message
            </button>
            <button onClick={ handleSave } style={{ backgroundColor : saved? '#fece51' : '#fff' }}>
            <CiSaveDown1 />{ saved ? "Place Saved" : "Save the Place"}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
