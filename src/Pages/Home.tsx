import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Homepage from '../Components/Home/Homepage'
import About from '../Components/Home/About'
import Contact from '../Components/Home/Contact'
import Feeds from '../Components/Home/Feeds'

const Home:React.FC = () => {
  return (
    <div>
        <Navbar/>
        <div>
            <Homepage/>
            <About/>
            <Feeds/>
            <Contact/>
        </div>
        <Footer/>
    </div>
    
  )
}
export default Home