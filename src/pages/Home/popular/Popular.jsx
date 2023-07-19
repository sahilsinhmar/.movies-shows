/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ConentWrapper from "../../../components/contentWrapper/ContentWrapper"
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from "../../../hooks/useFetch"
import { Carousel } from '../../../components/carousel/Carousel'

const Popular = () => {

  const[endpoint, setEndpoint]=useState("movie")

  const {data,loading}=useFetch(`/${endpoint}/popular`)

  const onTabChange=(tab)=>{
    setEndpoint(tab==="Movie"? 'movie' : "tv")
    
  }

  return (
    <div className='carouselSection'>
      <ConentWrapper>
        <span className='carouselTitle'>What&apos;s Popular</span>
        <SwitchTabs data={['Movie',"Tv"]} onTabChange={onTabChange}/>
      </ConentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
    
  )
}

export default Popular