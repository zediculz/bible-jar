import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import Footer from "../components/footer"
import Header from "../components/header"

import { setTopic, loadTopic } from "../ctx/util.js"
import { topicsData } from "../ctx/datas.js"


const SettingLayout = () => {
    const navigate = useNavigate()
    const [focus, setFocus] = useState({})
    const [topics, setTopics] = useState([])

  useEffect(() => {
      setTopics(topicsData)
      const d = loadTopic()
      setFocus(d)
  }, [])
    
    const handleChange = e => {
      const index = e.target.value
      const d = {
          topic: parseInt(index),
          last: 0,
          data: topicsData[index] 
      }

      const dd = {
        topic: index,
        focus: topicsData[index].topic
      }

      setFocus(dd)
      setTopic(d)
    }

  return (
      <section className="main-wrap" style={{ backgroundColor: "#fff" }}>
      <Header type="bar" title="Settings" />
      <div className="center-wrap option-wrap">
              <label>what's your focus today</label>
        <div>
            <select onChange={handleChange}>
            {topics?.map((t, i) => {
                return (
                  <option value={i} key={t.topic}>{t.topic}</option>
                ) 
            })}   
        </select>
        </div>
         <p>you choose {focus?.focus} focus</p>
        <b onClick={e => navigate("/about")}>About bibleshare</b>
      </div>
      <Footer />
    </section>
  )
}

export default SettingLayout






