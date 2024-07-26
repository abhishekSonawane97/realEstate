import React from 'react'
import { listData } from '../../lib/dummyData'
import Card from '../card/Card';
import './list.scss';


export default function List({ posts }) {
  return (
    <div className='list'>
      {
        posts.map(item => (
            <Card key={item.id} item={item}  />
        ))
      }
    </div>
  )
}
