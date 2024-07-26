import React, { Suspense } from 'react';
import './listPage.scss';
// import { listData } from '../../lib/dummyData.js';
import Filter from '../../components/filter/Filter.jsx';
import Card from '../../components/card/Card.jsx';
import Map from '../../components/map/Map.jsx';
import { Await, useLoaderData } from 'react-router-dom';


export default function ListPage() {

    // const data = listData;
    const data = useLoaderData();

  return (
    <div className='ListPage'>
            <div className="listContainer">
                <div className="wrapper">
                    <Filter/>
                        <Suspense fallback={<p>Loading...</p>}>
                            <Await
                                resolve={data.postResponse}
                                errorElement={<p>Error loading posts!</p>}
                            >
                                {(postResponse) => (
                                    postResponse?.data.map(post => (
                                        <Card key={post.id} item={post} />
                                    ))
                                )}
                            </Await>
                        </Suspense>
                </div>
            </div>
            <div className="mapContainer">
            <Suspense fallback={<p>Loading...</p>}>
                            <Await
                                resolve={data.postResponse}
                                errorElement={<p>Error loading posts!</p>}
                            >
                                {(postResponse) => (
                                    <Map items={postResponse.data}/>
                                )}
                            </Await>
                        </Suspense>
            </div>
    </div>
  )
}
