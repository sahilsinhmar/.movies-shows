/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import "./style.scss"
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DetailsBanner } from './detailsBanner/DetailsBanner'
import useFetch from '../../hooks/useFetch'
import Cast from './cast/Cast'
import VideosSection from './videoSection/VideoSection'
import Similar from './similar/Similar'
import Recommendations from './recommends/Recommendations'

export const Details = () => {
  const {mediaType,id}=useParams()

  const url=useSelector((store)=>store.home.url)

  

  const {data,loading}=useFetch(`/${mediaType}/${id}/videos`);
  const {data: credits,loading: creditsLoading}=useFetch(`/${mediaType}/${id}/credits`);
 

  return (
    <div>
      <DetailsBanner video={data?.results[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideosSection data={data} loading={loading}/>
      <Similar mediaType={mediaType} id={id} />
      <Recommendations mediaType={mediaType} id={id}/>
    </div>
  )
  }
