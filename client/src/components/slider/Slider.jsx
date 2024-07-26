import React, { useEffect, useState } from 'react';
import './slider.scss';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";




export default function Slider({ images }) {

    const [ imageIndex, setImageIndex ] = useState(null);


    const changeSlide = (direction)=>{

        if(direction === "left"){
            imageIndex>0 ? setImageIndex(imageIndex-1) : setImageIndex(images.length-1);
        }
        else{
            (images.length - 1 > imageIndex ) ? setImageIndex(imageIndex + 1 ):  setImageIndex(0);
    }
}
useEffect(()=>{
    console.log(imageIndex)
})

  return (
    <div className='slider'>
        {
            imageIndex !== null &&
            <div className="fullSlider">
                <div className="arrow arrowPrev">
                <IoIosArrowBack onClick={()=> changeSlide("left") } />
                </div>
                <div className="imgContainer">
                    <img src={images[imageIndex]} alt="" />
                </div>
                <div className="arrow arrowNext">
                <IoIosArrowForward  onClick={()=> changeSlide("right") }/>
                </div>
                <div className="close" onClick={()=> setImageIndex(null)}>
                    X
                </div>
            </div>
        }

      <div className="bigImage">
        <img src={ images[0]} alt="property img" onClick={()=> setImageIndex(0) } />
      </div>
      <div className="smallImages">
        {
            images.slice(1).map((image, index) => {
               return  <img src={image} alt='' key={index}  onClick={()=> setImageIndex(index + 1) } />
            })
        }
      </div>
    </div>
  )
}
