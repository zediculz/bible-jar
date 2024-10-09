import { useNavigate, useLocation } from "react-router-dom"
import { MdOutlineComment, MdOutlineDehaze, MdHome } from "react-icons/md"

const Footer = props => {

    const navigate = useNavigate()
    const location = useLocation()

  const handleLink = path => {
      const pn = location.pathname
      if (pn === path || pn === "/about" || pn === "/bookmark") {
          navigate("/")
      } else {
          navigate(path)
      }
    }
  
  const viewBookmark = e => {
      navigate("/bookmark")
  }


   
    return (
        <footer>
        <div>
          <p
            onClick={() => handleLink("/settings")}>
            {location.pathname === "/" ? <MdOutlineDehaze /> : <MdHome />}
          </p>
            </div>
        <div className="alert">
            <b>{props?.alert}</b>
        </div>
        <div>
          <p onClick={viewBookmark} style={{display: props?.type === "home" ? 'block' : "none"}}><MdOutlineComment /></p>
        </div>
      </footer>
    )
}

export default Footer