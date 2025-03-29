import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const CaptainSignup = () => {const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captainData, setCaptainData] = useState({});
  
    const handleSumit = (e) => {
      e.preventDefault();
      setCaptainData({
        fullName: {
          firstName,
          lastName,
        },
        email,
        password,
      });
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      navigate("/login");
    };
  
    return (
      <div className="pt-7">
        <Logo />
        <div className="flex flex-col gap-30">
          <div className="mt-4 p-6">
            <form onSubmit={(e) => handleSumit(e)}>
              <h2 className="text-2xl mb-2 font-semibold">
                <label htmlFor="email">Enter Full Name</label>
              </h2>
              <div className="flex gap-4">
                <input
                  className="bg-orange-50 rounded px-4 py-2 w-full text-lg placeholder:text-base mb-3"
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  id="firstName"
                  required
                  placeholder="First Name*"
                />
                <input
                  className="bg-orange-50 rounded px-4 py-2 w-full text-lg placeholder:text-base mb-3"
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  id="lastName"
                  placeholder="Last Name"
                />
              </div>
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
                SignUp
              </button>
            </form>
            <p className="text-lg text-center font-semibold mt-3">
              Already a Captain?{" "}
              <Link to={"/captain-login"} className="text-blue-600">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
}

export default CaptainSignup