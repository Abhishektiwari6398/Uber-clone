import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData,setUserData]=useState({})
    const submitHandler = (e) => {
        e.preventDefault()
        setUserData({
            email:email,
            password:password
        })
        setEmail('')
        setPassword('')
        
    }
    return (
        <div className='p-7 h-screen  flex flex-col justify-between '>
            <div>
                <img className='w-20 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
                <form onSubmit={(e) => {
                    submitHandler(e)
                }}>
                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 text-lg border w-full placeholder:text-base'
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        placeholder='email@example.com'
                        required
                    />
                    <h3 className='text-lg font-medium'>Enter Password</h3>
                    <input
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 text-lg border w-full placeholder:text-base'
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        placeholder='password'
                        required
                    />
                    <button className='bg-black font-semibold text-white mb-3 rounded px-4 py-2 text-lg  w-full placeholder:text-base'>Login</button>
                </form>
                <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
            </div>
            <div>
                <Link to='/captain-login' className='bg-[#10b461] flex items-center justify-center font-semibold text-white mb-5 rounded px-4 py-2 text-lg  w-full placeholder:text-base'>Sign in as Captain</Link>
            </div>
        </div>
    )
}

export default UserLogin