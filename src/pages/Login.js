import React, { useContext, useState } from 'react'
import loginicons from '../assest/signin.gif';
import {Link, useNavigate} from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const {fetchUserDetails, fetchUserAddToCart} = useContext(Context);

    const [data,setData] = useState({
        email : "",
        password : ""
    });

    const navigate = useNavigate();
   

    const handleOnChange = (e) =>{
        const { name , value } = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    };

    const handleSubmit = async(e) =>{
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url,{
            method : SummaryApi.signIn.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }

    }

  return (
    <section id='login'>
        <div className='mx-auto container px-4'>

            <div className='bg-white p-2 w-full max-w-md mx-auto'>
                <div className='w-20 h-20 mx-auto'>
                    <img src={loginicons} alt="login-icon" />
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label>Email : </label>
                        <div className='bg-slate-100 p-2'>
                            <input type="email" onChange={handleOnChange} placeholder='Enter email'  className='w-full h-full outline-none bg-transparent' name='email' value={data.email} />
                        </div>
                    </div>
                    <div>
                        <label>Password : </label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input type="password" onChange={handleOnChange} placeholder='Enter password' className='w-full h-full outline-none bg-transparent' name='password' value={data.password}/>
                        </div>
                        <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                                Forgot password ?
                            </Link>
                    </div>
                    <button  className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
                </form>
                <p className='my-5'>Don't have account ? <Link to={"/sign-up"} className=' text-red-600 hover:text-red-700 hover:underline'>Sign up</Link></p>
            </div>

        </div>
    </section>
  )
}

export default Login