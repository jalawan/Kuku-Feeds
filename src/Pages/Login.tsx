import React ,{useState} from 'react'
import image from '../assets/images.jpg'
import { Link ,useNavigate } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import {  toast,Toaster } from 'sonner';
import { AuthApi } from '../Features/api/AuthApi';
import { EyeClosedIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../Features/slice/authSlice';

type LoginFormValues = {
  email: string;
  password: string;
};
const Login:React.FC = () => {
    const [loginUser, { isLoading }] = AuthApi.useLoginMutation();
    const {register ,handleSubmit ,formState:{errors}}=useForm<LoginFormValues>();
    const navigate =useNavigate();
     const dispatch = useDispatch();
     const [showPassword, setShowPassword] = useState(false);
    
     const handleLoginForm: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      // Check if the user is banned
    // if (response.user.role === "banned") {
    //   toast.error("Your account has been banned. You cannot access the site.Please try contacting support.");
    //   return; // Stop login
    // }
      dispatch(setCredentials({ 
        token: response.token, 
        user: {
          ...response.user,
          role: response.user.role as 'ADMIN' | 'USER'|'BANNED',
        } 
      }));

       if (response.user.role=== "admin") {
          navigate('/admin/dashboard');
        } else if (response.user.role === "staff") {
          navigate('/staff/dashboard');
        } else {    
          navigate('/dashboard'); 
        }
    } catch (error: any) {
      toast.error(error?.data?.error || "Login failed.");
    }
  };
  return (
    <div className='justify-center items-center flex flex-col min-h-screen'>
        <Toaster position='top-right' richColors/>
        <div className='justify-center px-10  md:flex my-7 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.6)]'>
            <div className='flex '>
                {/* Left Image */}
                <div className="hidden lg:flex flex-col items-center justify-center bg-amber-50 text-white p-14">
                    <img src={image} alt="Log In Image" />
                </div>
                {/* Log in form */}
                <div className='items-center justify-center text-center p-12'>
                    <div className="w-full max-w-md">
                        <h1 className='text-4xl font-black tracking-wide'>Log In </h1>
                        <p>Welcome our esteemed customer</p>
                        {/* form */}
                        <form className='flex flex-col gap-6 p-3' onSubmit={handleSubmit(handleLoginForm)} >
                            {/* Email */}
                             <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                    <input
                      {...register('email', {
                        required: "Email is required",
                        minLength: { value: 8, message: "Invalid email address" }
                      })}
                      type="email"
                      placeholder="johndoe@gmail.com"
                      className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                    />
                    {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
                  </div>

                  {/* Password */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Password
                      </label>

                      <div className="relative">
                        <input
                          {...register('password', {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters" }
                          })}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter Password"
                          className="w-full px-5 py-3 pr-14 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                        />

                        {/* Show/Hide Button */}
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-black-600 hover:text-amber-700"
                        >
                          <EyeClosedIcon/>
                        </button>
                      </div>

                      {errors.password && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    {/* checkbox */}
                    <div>
                       <label htmlFor="">
                        <input type="checkbox"
                        {...register("password")} 
                        />
                        <span className="ml-2">
                         Remember Me
                        </span>
                        </label> 
                    </div>
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-amber-100 hover:from-amber-100 hover:to-amber-500 text-black font-bold text-lg  transition transform hover:scale-[1.02]"
                  >
                    {isLoading ? "Logging  in..." : "Log In"}
                  </button>

                  {/* Links */}
                  <div className="text-center mt-2 flex flex-col gap-2">
                      <p>New Member ? 
                    <Link to="/register" className="text-blue-600 hover:underline text-sm font-medium">
                      Sign Up
                    </Link>
                    </p>
                  </div>

                  {/* Forgot password */}
                  <div className="text-center">
                    <Link to="/forgot-password" className="text-amber-600 text-sm hover:underline font-medium">
                      Forgot your password?
                    </Link>

                  </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Login