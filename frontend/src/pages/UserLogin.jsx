import React, { useContext, useState } from "react";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from '../context/UserContext.jsx'
import axios from "axios";

const UserLogin = () => {
  const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})

    const {user, setUser} = useContext(UserDataContext)

    const handleSumit = async (e) => {
        e.preventDefault()
        const userData = {
            email,
            password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

        if(response.status === 200){
          const data = response.data
          setUser(data.user)
          localStorage.setItem('token', data.token)
          navigate('/home')
        }

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
            New here? <Link to={'/signup'} className="text-blue-600">Create an account</Link>
          </p>
        </div>
        <div className="p-6">
          <Link to={'/captain-login'} className="bg-amber-200 inline-block text-center py-2 px-4 rounded-md w-full text-xl font-semibold">
            SignIn as Captain
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
