import { useEffect, useState } from "react"
import {
  handleAppObject, addToBookmark, handleCopy, handleShare
} from "../ctx/util"


import Footer from "../components/footer"
import Header from "../components/header"
import { useLocation } from "react-router-dom"

const HomeLayout = () => {
  const location = useLocation()
  const [appData, setAppData] = useState({})
  const [verse, setVerse] = useState({})
  const [index, setIndex] = useState(0)
  const [alert, setAlert] = useState("")

  useEffect(() => {
    const aD = handleAppObject()
    setAppData(aD)

    let first = aD.data[index]
    setVerse(first)
  }, [])

    
  const handleAlert = (msg, time=4000) => {
      setAlert(msg)
      const T = setTimeout(() => {
          setAlert("")
      }, time);
  }

  

  const handleAddBookMark = e => {
    const res = addToBookmark(verse)
    if (res) {
      handleAlert("added to bookmark")
    } else {
      handleAlert("already bookmarked")
    }
  }

  const handleLikeVerse = e => {
    handleAlert("liked")
    console.log(verse)
  }

  const handleNext = e => {
    console.log("next")

    if (index !== appData?.limit) {

      let i = index + 1
      let nextVerse = appData?.data[index]
      setVerse(nextVerse)
      setIndex(i)

    } else if (index === appData?.limit) {
      console.log("equal")
      setIndex(0)
    }
  }

  return (
    <section className="main-wrap">
      <Header handleCopy={e => handleCopy(verse?.text)} handleShare={e => handleShare(verse)} />
      <aside className="center-wrap">
        <p>{verse?.book} {verse?.chapter}-{verse?.verse} <span>{appData?.topic}</span></p>
        <h1>{verse?.text}</h1>
        <b>
          <span style={{color: "#222"}} onClick={handleAddBookMark}>bookmark</span>
        </b>
      </aside>
      <div className="btn-wrap">
        <button onClick={handleNext}>more</button>
      </div>
      <Footer alert={alert}  type="home" />
    </section>
  )
}


export default HomeLayout
