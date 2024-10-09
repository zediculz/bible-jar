import { useEffect, useState } from "react"

import { MdIosShare, MdCopyAll } from "react-icons/md"
import { useLocation } from "react-router-dom"

const Header = props => {
  const location = useLocation()
  const [path, setPath] = useState("/")

  useEffect(() => {
    setPath(location.pathname)
  }, [location])

  return (
    <header>
      <div>
        <p
          style={{display: path === "/" ? 'block' : 'none'}}
          onClick={props?.handleShare}>
          <MdIosShare />
        </p>
      </div>
      <div className="alert" style={{display: props?.type === "bar" ? "flex" : "none"}}>
        <b>{props?.title}</b>
      </div>
      <div>
        <p
          style={{display: path === "/" ? 'block' : 'none'}}
          onClick={props?.handleCopy}>
          <MdCopyAll />
        </p>
      </div>
    </header>
    )
}

export default Header