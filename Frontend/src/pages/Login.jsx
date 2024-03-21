import React, { useState } from 'react'
import Logo from '../assets/TwitterLogo.png'
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../redux/userSlice'
function Login() {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData , setFormData] = useState({})
    const [error , setError] = useState(null)

    const handleChange = (e) =>{
         setFormData({...formData , [e.target.name] : e.target.value})
         setError(null)
    }
    const handleSubmit = async (e) =>{
         e.preventDefault()
         console.log(formData)
         const res = await axios.post("http://localhost:8080/user/login" , formData , {withCredentials : true}) 
         .then((value) =>{
          //  console.log(value.data)
           toast.success(value.data.message)
            dispatch(setCurrentUser(value.data.userExist))


           navigate("/")
         })
         .catch ((error) =>{
            console.log(error)
            setError(error.response.data.message)
         })
    }

  return (
    <div className='h-screen w-full'>
        <div className=' h-[100%] flex items-center justify-center gap-28'>
             <img src={Logo} alt="Twitter logo" className='w-48'/>
          <div className='flex flex-col gap-6'>
            <h1 className='font-bold text-6xl'>Happening Now.</h1>
            <h3 className='font-bold text-2xl'>Welcome Back!</h3>
             {error &&  <span className='text-red-500  font-bold'>{error}</span> }
          <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input type="email" name='email' className='p-2 rounded-3xl px-3 w-[60%]' onChange={handleChange}  placeholder='Email...' style={{border : "1px solid black"}} />
                <input type="password" name='password' className='p-2 rounded-3xl px-3 w-[60%]'  onChange={handleChange} placeholder='Password...' style={{border : "1px solid black"}} />

                 <button type='submit' className='p-2 px-4 bg-blue-500 text-white rounded-2xl w-[60%] font-bold'> Login</button>
               
               <p> Does not have an account ? <Link to={"/register"} className='text-blue-500'>Register</Link></p>

                </form>
          </div>
        </div>
    </div>
  )
}

export default Login
