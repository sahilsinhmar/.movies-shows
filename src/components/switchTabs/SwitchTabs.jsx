/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React,{useState} from 'react'
import "./style.scss"



const SwitchTabs = ({data,onTabChange}) => {

  const [selectedTab, setSelectedTab]=useState(0)
  const [left,setLeft]=useState(0)

  const activeTab=(tab, Index)=>{
    setLeft(Index* 100)
    setTimeout(()=>{
      setSelectedTab(Index)
    }, 300)
    onTabChange(tab, Index)

  }

  
  return (
    <div className='switchingTabs'>
      <div className="tabItems">
        {data.map((tab,Index)=>(
          <span 
              key={Index} 
              className={`tabItem ${selectedTab===Index ? "active":""}`}
              onClick={()=>activeTab(tab,Index)}>
                {tab} 
          </span>
        ))}
        <span className="movingBg" style={{ left }}/>
      </div>
    </div>
  )
}

export default SwitchTabs