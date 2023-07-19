/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ConentWrapper from "../../../components/contentWrapper/ContentWrapper"
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from "../../../hooks/useFetch"
import { Carousel } from '../../../components/carousel/Carousel'

const Trending = () => {

  const[endpoint, setEndpoint]=useState("day")

  const {data,loading}=useFetch(`/trending/all/${endpoint}`)

  const onTabChange=(tab)=>{
    setEndpoint(tab==="Day"? 'day' : "week")
    
  }

  return (
    <div className='carouselSection'>
      <ConentWrapper>
        <span className='carouselTitle'>Trending</span>
        <SwitchTabs data={['Day',"Week"]} onTabChange={onTabChange}/>
      </ConentWrapper>
      <Carousel data={data?.results} loading={loading}/>
    </div>
    
  )
}

export default Trending