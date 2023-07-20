/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ConentWrapper from "../../../components/contentWrapper/ContentWrapper"

import useFetch from "../../../hooks/useFetch"
import { Carousel } from '../../../components/carousel/Carousel'
const Recommendations= ({mediaType, id}) => {



  const {data,loading}=useFetch(`/${mediaType}/${id}/recommendations`)

  
    


  return (
    
      <Carousel title="Recommendations" data={data?.results} loading={loading} endpoint={mediaType}/>
    
    
  )
}

export default Recommendations