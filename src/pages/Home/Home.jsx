/* eslint-disable no-unused-vars */
import React from 'react'
import { HeroBanner } from './heroBanner/HeroBanner'
import "./style.scss"
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import TopRated from './toprated/TopRated'

export const Home = () => {
  return (
    <div className='homePage'>
      <HeroBanner/>
      <Trending/>
      <Popular/>
      <TopRated/>
    </div>
  )
}
