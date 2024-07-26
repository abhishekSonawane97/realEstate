import React, { useState } from 'react';
import './searchBar.scss';
import { CiSearch } from "react-icons/ci";
import apiRequest from '../../lib/apiRequest';
import { Link } from 'react-router-dom';

export default function SearchBar() {

    const types = [ "buy", "rent" ]

    const [ query, setQuery ] = useState({
        type : "buy",
        location : "",
        minPrice : 0,
        maxPrice : 0,
    });

    const switchType = (val)=>{
        setQuery(prev => ({...prev,type : val }))
    }

    const handleChange = async(e)=>{
      e.preventDefault();
      setQuery(prev => ({...prev, [e.target.name] : e.target.value }));

    }

  return (
    <div className='searchBar'>
      <div className="type">
        {
            types.map(type => <button key={type} onClick={ ()=> switchType(type) } className={ query.type === type? "active" : ""  } >{type}</button> )
        }        
      </div>
      <form>
        <input type="text" name='city' placeholder='City' onChange={ handleChange } />
        <input type="number" name='minPrice' min={0} max={1000000} placeholder='Min Price'  onChange={ handleChange } />
        <input type="number" name='maxPrice' min={0} max={10000000} placeholder='Max Price'  onChange={ handleChange } />
        <Link to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>
        <button>
        <CiSearch />
        </button>
        </Link>
      </form>
    </div>
  )
}
