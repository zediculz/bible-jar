import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import Footer from "../components/footer"
import Header from "../components/header"


import { loadAppObject, addTopics, removeTopics } from "../ctx/util.js"
import { topicsData } from "../ctx/datas.js"


const SettingLayout = () => {
    const navigate = useNavigate()
    const [focus, setFocus] = useState([])
    const [topics, setTopics] = useState([])

  useEffect(() => {
    setTopics(topicsData)
    const d = loadAppObject()
    setFocus(d?.topics)
  }, [])

  const handleClick = e => {
    const res = addTopics(e)
    
    if (res?.state) {
      setFocus(res?.focus)
    }
  }

   const handleRemove = e => {
     const res = removeTopics(e)
     setFocus(res)
  }

  return (
      <section className="main-wrap" style={{ backgroundColor: "#fff" }}>
      <Header type="bar" title="Settings" />
      <div className="center-wrap">
        <div className="grid-head-wrap"> 
          {focus.flatMap((f, i) => {
            return (
              <span key={i} onClick={e => handleRemove(f)}>{f} x</span>
           )
         })}
        </div>
        <div className="grids-wrap">
          {topics.flatMap((topic, i) => {
            return (
              <div style={{backgroundColor: topic?.color}} key={i} onClick={e => handleClick(topic?.topic)}>
                <h3>{topic?.topic}</h3>
                <p>verses {topic?.verses?.length}</p>
              </div>
            )
          })}
        </div>
      </div>
      
      <Footer type="setting"/>
    </section>
  )
}

export default SettingLayout