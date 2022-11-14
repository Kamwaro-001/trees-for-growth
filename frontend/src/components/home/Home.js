import React from 'react'
import { Link } from 'react-router-dom'
import "./Home.css"

const Home = () => {
  return (
    <div>
      <header class='home-page'>
        <div class='wrapper'>
          <div class='welcome-text'>
            <h1>TREE PLANTING MEETS <span>TECHNOLOGY</span></h1>
            <br />
            <br />
            <h2 class='welcome-text2'>HELP SAVE OUR PLANET</h2>
            <br />
            <Link to="#" class='welcome-link'>MAKE AN IMPACT</Link>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Home