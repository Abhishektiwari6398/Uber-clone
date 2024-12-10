import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userData, setUserData] = useState({})
    const submitHandler = (e) => {
        e.preventDefault()
        setUserData({
            fullName:{
                firstName:firstName,
                lastName:lastName,

            },
            email:email,
            password:password
        })
        console.log(userData);
        
        setFirstName('')
        setLastName('')
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
                    <h3 className='text-base font-medium mb-2'>What's your name</h3>
                    <div className='flex gap-4 mb-6'>
                        <input
                            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg border  placeholder:text-base'
                            type="text"
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value)
                            }}
                            placeholder='First name'
                            required
                        />
                        <input
                            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg border  placeholder:text-base'
                            type="text"
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value)
                            }}
                            placeholder='Last name'
                            required
                        />
                    </div>
                    <h3 className='text-base font-medium mb-2'>What's your email</h3>
                    <input
                        className='bg-[#eeeeee] mb-6 rounded px-4 py-2 text-lg border w-full placeholder:text-base'
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        placeholder='email@example.com'
                        required
                    />
                    <h3 className='text-base font-medium mb-2'>Enter Password</h3>
                    <input
                        className='bg-[#eeeeee] mb-6 rounded px-4 py-2 text-lg border w-full placeholder:text-base'
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        placeholder='password'
                        required
                    />
                    <button className='bg-black font-semibold text-white mb-3 rounded px-4 py-2 text-lg  w-full placeholder:text-base'>Register</button>
                </form>
                <p className='text-center'>Alredy have a account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
            </div>
            <div>
                <p className='text-{10px} leading-tight'>Uber's Privacy Notice describes the information we collect, how it is used and shared, and your choices regarding this information.
                </p>
            </div>
        </div>
    )
}

export default UserSignup