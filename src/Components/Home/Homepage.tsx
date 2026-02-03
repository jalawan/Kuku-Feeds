import React from 'react'
import feedinghens  from '../../assets/feeding hens.webp'
import chicks  from '../../assets/chicks.jpg'
import layerhens  from '../../assets/Layer-Hens.jpg'
import { ArrowBigUp } from 'lucide-react'


const Homepage:React.FC = () => {
  return (
    <div className='Homepage min-h-screen' id ="home">
        <div className='items-center justify-center'>
            <div className=' text-orange-700 p-10 text-center'>
                <h1 className='text-7xl font-extrabold p-5'>Trinity Animal Feeds</h1>
                <h2 className='text-4xl font-bold p-2'>ALL RAW MATERIALS</h2>
                <p className=' font-medium  text-2xl  p-2'>Pellets, Hens, Chicks and Omena </p>
                <h3 className='font-extrabold text-4xl p-2'>WHOLESALE $ RETAIL</h3>
            </div>
        </div>
        <div className="mt-10 flex gap-6 justify-center flex-wrap">
        <div className="w-80 h-64">
          <img
            src={feedinghens}
            alt="homepage image"
            className="w-full h-full object-cover rounded-3xl hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="w-80 h-64">
          <img
            src={chicks}
            alt="chicks image"
            className="w-full h-full object-cover rounded-3xl hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="w-80 h-64">
          <img
            src={layerhens}
            alt="hens image"
            className="w-full h-full object-cover rounded-3xl hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      <div className='fab'>
        <button className='btn btn-circle hover:bg-amber-300 hover:scale-105 transition-transform duration-500'><a href="#home"><ArrowBigUp/></a></button>
      </div>
    </div>
  )
}
export default Homepage