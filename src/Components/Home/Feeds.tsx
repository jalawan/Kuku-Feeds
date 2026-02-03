import React from 'react'
import kienyeji from '../../assets/Feeds/Kienyeji kuku 70kg.jpg'
import growers from'../../assets/Feeds/Kienyeji growers 10kg.jpg'
import protein from '../../assets/Feeds/Protein kuu 20kg.jpg'
import Dog from '../../assets/Feeds/Dog 10kgs.jpg'
import cat1 from '../../assets/Feeds/Cat Adult.jpg'
import cat2 from '../../assets/Feeds/Cat.jpg'
import { Link } from 'react-router'
import { FeedsApi } from '../../Features/api/FeedApi'

const Feeds:React.FC = () => {
    const feeds=[
        {
            title:"Kienyeji",
            description:"",
            image:kienyeji,
        },
         {
            title:"Growers",
            description:"",
            image:growers,
        },
         {
            title:"Protein Kuku",
            description:"",
            image:protein,
        },
    ]
     const dog=[
        {
            title:"Dog Meal",
            description:"",
            image:Dog,
        },
         {
            title:"Adult Cat Food",
            description:"",
            image:cat1,
        },
         {
            title:"Cat",
            description:"",
            image:cat2,
        },
    ]
  return (
    <div id="feeds" className=' min-h-2.5 px-7 md:px-10 my-8'>
        <div className=' md:flex justify-center items-center my-7'>
                <h1 className='text-3xl flex gap-3 font-bold'>Chicken Feeds</h1>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-y-4 my-6 items-center justify-center '>
                    {
                    feeds.map((feed,index)=>{
                        return(
                            <div
                            key={index}
                            className='flex flex-col shadow-sm md:w-85.75 bg-amber-50 p-4 rounded-3xl min-w-1'
                            >
                                <a 
                                href={feed.image}
                                target="_blank"
                                rel="noreferrer"
                                className='mb-4'
                                >
                                    <img  className="rounded-4xl  " src={feed.image} alt={feed.title} />
                                </a>
                                <h3>{feed.title}</h3>
                                <p>{feed.description}</p>
                                <Link to="/login" className='btn rounded-3xl mt-10 hover:bg-amber-300 hover:scale-105 transition-transform duration-300'>
                                    More Details
                                </Link>
                            </div>
                        )
                        })
                    }
            </div>
             <div className=' md:flex justify-center text-center'>
                <h1 className='text-3xl flex gap-3 font-bold'>Dog  $ Cat Feeds</h1>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-4 my-6 items-center justify-center  '>
                    {
                    dog.map((feed,index)=>{
                        return(
                            <div
                            key={index}
                            className='flex flex-col shadow-sm md:w-85.75 bg-amber-50 p-4 rounded-3xl'
                            >
                                <a 
                                href={feed.image}
                                target="_blank"
                                rel="noreferrer"
                                className='mb-4'
                                >
                                    <img className="rounded-4xl  " src={feed.image} alt={feed.title} />
                                </a>
                                <h3>{feed.title}</h3>
                                <p>{feed.description}</p>
                                <Link to="/feeds/${feed_id}" className='btn rounded-3xl mt-10 hover:bg-amber-300 hover:scale-105 transition-transform duration-300'>
                                    More Details</Link>
                            </div>
                        )
                        })
                    }
            </div>
        
    </div>
  )
}
export default Feeds