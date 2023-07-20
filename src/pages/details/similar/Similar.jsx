/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ConentWrapper from "../../../components/contentWrapper/ContentWrapper"

import useFetch from "../../../hooks/useFetch"
import { Carousel } from '../../../components/carousel/Carousel'

const Similar = ({mediaType, id}) => {



  const {data,loading}=useFetch(`/${mediaType}/${id}/similar`)

  const title=mediaType==="tv" ? "Similar TV Shows" : "Similar Movies"
    


  return (
    
      <Carousel title={title} data={data?.results} loading={loading} endpoint={mediaType}/>
    
    
  )
}

export default Similar