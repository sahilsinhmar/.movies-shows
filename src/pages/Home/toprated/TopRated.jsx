/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ConentWrapper from "../../../components/contentWrapper/ContentWrapper"
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from "../../../hooks/useFetch"
import { Carousel } from '../../../components/carousel/Carousel'

const TopRated = () => {

  const[endpoint, setEndpoint]=useState("movie")

  const {data,loading}=useFetch(`/${endpoint}/top_rated`)

  const onTabChange=(tab)=>{
    setEndpoint(tab==="Movie"? 'movie' : "tv")
    
  }

  return (
    <div className='carouselSection'>
      <ConentWrapper>
        <span className='carouselTitle'>Top-Rated</span>
        <SwitchTabs data={['Movie',"Tv"]} onTabChange={onTabChange}/>
      </ConentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
    
  )
}

export default TopRated