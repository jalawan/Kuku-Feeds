import  { useRef, useState } from "react";
import { Phone } from 'lucide-react'
import emailjs from "emailjs-com";
import twitter from '../../assets/socials/twitter.png'
import facebook from '../../assets/socials/facebook.png'

const Contact = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
  const [done, setDone] = useState(false)
   const [, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
if (!formRef.current) return;
 setLoading(true);
    emailjs.sendForm('service_fp3gptw', 'template_8oxrcbc', formRef.current, 'qO-Z1u3VkNOgGqR3F')
    
      // e.target.reset()
      .then((result) => {
        console.log(result.text);
        setDone(true);
         setLoading(false);
        formRef.current?.reset();

        // auto-hide success message after 3 seconds
        setTimeout(() => {
          setDone(false);
        }, 3000);
      })
      .catch((error) => {
        console.log(error.text);
         setLoading(false);
      });
    }
  return (
    <div id="contact">
        <div>
            <div className='justify-center items-center md:flex p-10'>
                <h1 className=' text-cyan-400 text-4xl flex font-extrabold '>Contact Us <Phone/> </h1>
            </div>
            <div className=" flex flex-col md:flex-row justify-between p-10">
                {/* Left Side */}
                <div>
                    <h3 className='text-3xl text-fuchsia-400'> Contact with me</h3>
                    
                  {/* social icons */}
                    <div className="flex mx-3">
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">
                        <img src={twitter} alt="" />
                        </a>
                        <a href="https://web.facebook.com" target="_blank" rel="noreferrer">
                        <img src={facebook} alt="" />
                        </a>
                    </div>
                </div>
                {/* Right side */}
                <div className="md:w-1/2">
                <p className="text-amber-50 text-2xl mb-6">Incase of any inquiry</p>
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <input type="text" name="user_name" placeholder="Name:" className="bg-[#F5F5F5] bg-opacity-10 py-3 px-3 md:w-3/4 w-full rounded " />
                        <input type="email" name="user_email" placeholder="Email:" className="bg-[#F5F5F5] bg-opacity-10 py-3 px-3 md:w-3/4 w-full rounded my-3" />
                        <textarea name="message" id="message" cols={54} rows={4} className="bg-[#F5F5F5] bg-opacity-10 py-3 px-3 md:w-3/4 w-full rounded mb-2 " placeholder="Message:"></textarea>
                        <button type="submit" className="btn bg-primary py-2 px-12 rounded text-black hover:bg-amber-300 hover:text-primary block hover:scale-105 transition-transform duration-500">
                        Send
                        </button>
                        {done && <p className="text-green-400 mt-4">Thank you for your message! I will get in touch soon</p>}
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Contact