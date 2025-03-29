import React, { useState } from 'react'
import Logo from '../components/Logo.jsx'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
    const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [captainData, setCaptainData] = useState({})
    
        const handleSumit = (e) => {
            e.preventDefault()
            setCaptainData({
                email,
                password
            })
            setEmail('')
            setPassword('')
        }
  return (
    <div className="pt-7">
      <Logo />
      <div className="flex flex-col gap-30">
        <div className="mt-4 p-6">
          <form onSubmit={(e) => handleSumit(e)}>
            <h2 className="text-2xl mb-2 font-semibold">
              <label htmlFor="email">Email</label>
            </h2>
            <input
              className="bg-orange-50 rounded px-4 py-2 w-full text-lg placeholder:text-base mb-3"
              type="email"
              name="emial"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="email"
              required
              placeholder="email@example.com"
            />
            <h2 className="text-2xl mb-2 font-semibold">
              <label htmlFor="password">Password</label>
            </h2>
            <input
              className="bg-orange-50 rounded px-4 py-2 w-full text-lg placeholder:text-base"
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              id="password"
              placeholder="password"
            />
            <button className="bg-black text-white py-2 px-4 rounded-md w-full mt-10 text-xl font-semibold">
              Login
            </button>
          </form>
          <p className="text-lg text-center font-semibold mt-3">
            Join Us? <Link to={'/captain-signup'} className="text-blue-600">Register as a Captain</Link>
          </p>
        </div>
        <div className="p-6">
          <Link to={'/login'} className="bg-green-300 inline-block text-center py-2 px-4 rounded-md w-full text-xl font-semibold">
            SignIn as User
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CaptainLogin