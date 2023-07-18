/* eslint-disable no-unused-vars */
import React from 'react'
import { HeroBanner } from './heroBanner/HeroBanner'
import "./style.scss"

export const Home = () => {
  return (
    <div className='homePage'><HeroBanner/>
    <div style={{height: 1000}}></div>
    </div>
  )
}
