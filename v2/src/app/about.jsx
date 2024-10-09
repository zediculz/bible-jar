import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../ctx"

import Footer from "../components/footer"
import Header from "../components/header"

const AboutLayout = () => {
  const navigate = useNavigate();

  return (
    <section className="main-wrap">
      <Header type="bar" title="About"  />
      <div className="center-wrap option-wrap">
        <p>something about the create of this little app</p>
      </div>
      <Footer />
    </section>
  )
}

export default AboutLayout