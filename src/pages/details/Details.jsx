/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import "./style.scss"
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"

export const Details = () => {
  const {mediaType,id}=useParams()
  const [data,setData]=useState();
console.log(data)
  const url=useSelector((store)=>store.home.url)

  useEffect(() => {
    //create a controller
    let controller = new AbortController();
    (async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=7b5198a25f32bd224b24c324208e2efa`,
          {
            // connect the controller with the fetch request
            signal: controller.signal,
          },
        );
        // handle success
        setData(await response.json());
        // remove the controller
        controller = null;
      } catch (e) {
        // Handle the error
        console.log(e.message)
      }
    })();
    //aborts the request when the component umounts
    return () => controller?.abort();
},[]);

 

  return (
    <div>
      <ContentWrapper>
      {data?.title}
    <img src={url.backdrop+data?.poster_path}/>
    </ContentWrapper>
    </div>
  )
  }
