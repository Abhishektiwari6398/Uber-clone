import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captainData,setCaptainData]=useState({})
    const submitHandler = (e) => {
        e.preventDefault()
        setCaptainData({
            email:email,
            password:password
        })
        setEmail('')
        setPassword('')
        
    }
    return (
        <div className='p-7 h-screen  flex flex-col justify-between '>
            <div>
                <img className='w-20 mb-3' src="https://pngimg.com/d/uber_PNG24.png" alt="" />
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
                <p className='text-center'>Register only Captain? <Link to='/captain-signup' className='text-blue-600'>Create new Account</Link></p>
            </div>
            <div>
                <Link to='/login' className='bg-[#e56a3d] flex items-center justify-center font-semibold text-white mb-5 rounded px-4 py-2 text-lg  w-full placeholder:text-base'>Sign in as User</Link>
            </div>
        </div>
    )
}

export default CaptainLogin