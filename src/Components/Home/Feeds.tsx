import React from 'react'
import kienyeji from '../../assets/chicks.jpg'
import { Link } from 'react-router'


const Feeds:React.FC = () => {
    const feeds=[
        {
            title:"Kienyeji",
            description:"",
            image:kienyeji,
        },
         {
            title:"Kienyeji",
            description:"",
            image:kienyeji,
        },
         {
            title:"Kienyeji",
            description:"",
            image:kienyeji,
        },
    ]
     const dog=[
        {
            title:"Kienyeji",
            description:"",
            image:kienyeji,
        },
         {
            title:"Kienyeji",
            description:"",
            image:kienyeji,
        },
         {
            title:"Kienyeji",
            description:"",
            image:kienyeji,
        },
    ]
  return (
    <div id="feeds" className=' min-h-screen px-7 md:px-10 my-8'>
        <div className=' md:flex justify-center items-center my-7'>
                <h1 className='text-3xl flex gap-3 font-bold'>Chicken Feeds</h1>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-y-4 my-6 items-center justify-center '>
                    {
                    feeds.map((feed,index)=>{
                        return(
                            <div
                            key={index}
                            className='flex flex-col shadow-sm md:w-85.75 bg-amber-100 p-4 rounded-3xl'
                            >
                                <a 
                                href={feed.image}
                                target="_blank"
                                rel="noreferrer"
                                className='mb-4'
                                >
                                    <img src={feed.image} alt={feed.title} />
                                </a>
                                <h3>{feed.title}</h3>
                                <p>{feed.description}</p>
                                <Link to="/login" className='btn rounded-3xl mt-10 hover: bg-amber-400'>
                                    Book
                                </Link>
                            </div>
                        )
                        })
                    }
            </div>
             <div className=' md:flex justify-center text-center'>
                <h1 className='text-3xl flex gap-3 font-bold'>Dog Feeds</h1>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-4 my-6 items-center justify-center '>
                    {
                    dog.map((feed,index)=>{
                        return(
                            <div
                            key={index}
                            className='flex flex-col shadow-sm md:w-85.75 bg-amber-100 p-4 rounded-3xl'
                            >
                                <a 
                                href={feed.image}
                                target="_blank"
                                rel="noreferrer"
                                className='mb-4'
                                >
                                    <img src={feed.image} alt={feed.title} />
                                </a>
                                <h3>{feed.title}</h3>
                                <p>{feed.description}</p>
                                <Link to="/login" className='btn rounded-3xl mt-10 hover: bg-amber-400'>
                                    Book</Link>
                            </div>
                        )
                        })
                    }
            </div>
        
    </div>
  )
}
export default Feeds