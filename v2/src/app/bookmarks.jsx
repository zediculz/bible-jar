import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import Footer from "../components/footer"
import Header from "../components/header"

import { loadBookmark, removeBookmark} from "../ctx/util"

const BookmarkLayout = () => {
    const navigate = useNavigate()
    const [books, setBooks] = useState([])

  useEffect(() => {
      const bks = loadBookmark()
      setBooks(bks)
  }, [])
    
    const handleClick = e => {
        const res = removeBookmark(e)
        setBooks(res)
    }

  return (
      <section className="main-wrap" style={{ backgroundColor: "#fff" }}>
      <Header type="bar" title="Bookmarks" />
      <div className="center-wrap">
        <div className="grids-wrap books-wrap">
          {books?.flatMap((bk, i) => {
            const {book, chapter, verse, text} = bk
            return (
              <div key={i} onClick={e => handleClick(i)}>
                <h3>{book} {chapter}-{verse}</h3>
                <p>{text}</p>
              </div>
            )
          })}
        </div>
      </div>
      <Footer type="setting"/>
    </section>
  )
}

export default BookmarkLayout