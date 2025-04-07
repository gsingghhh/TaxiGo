import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { captainDataContext } from '../context/CaptainContext.jsx';
import axios from 'axios';

const CaptainSignup = () => {const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [color, setColor] = useState('')
    const [capacity, setCapacity] = useState(null)
    const [plate, setPlate] = useState(null)
    const [vehicleType, setVehicleType] = useState(null)

    const {setCaptain} = useContext(captainDataContext)
  
    const handleSumit = async (e) => {
      e.preventDefault();
      const captainData = {
        fullName: {
          firstName,
          lastName,
        },
        email,
        password,
        vehicle:{
          color,
          plate,
          capacity,
          vehicleType
        }
      };

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

      if(response.status === 201){
        const data = response.data
        setCaptain(data.captain)
        navigate('/captain-login')
      }

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setCapacity('')
      setColor('')
      setVehicleType('')
      setPlate('')
    };
  
    return (
      <div className="pt-7">
        <Logo />
        <div className="flex flex-col gap-30">
          <div className="mt-4 p-6">
            <form onSubmit={(e) => handleSumit(e)}>
              <h3 className="text-xl mb-2 font-semibold">
                <label htmlFor="email">Enter Full Name</label>
              </h3>
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
              <h3 className="text-xl mb-2 font-semibold">
                <label htmlFor="email">Email</label>
              </h3>
              <input
                className="bg-orange-50 rounded px-4 py-2 w-full text-lg placeholder:text-base mb-3"
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                required
                placeholder="email@example.com"
              />
              <h3 className="text-xl mb-2 font-semibold">
                <label htmlFor="password">Password</label>
              </h3>
              <input
                className="bg-orange-50 rounded px-4 py-2 w-full text-lg placeholder:text-base mb-3"
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password"
                placeholder="password should be >= 6 characters"
              />
              <h3 className="text-xl mb-2 font-semibold">
                <label>Enter Vehicle Information</label>
              </h3>
              <div className="flex gap-4">
                <input
                  className="bg-orange-50 rounded px-4 py-2 w-full text-lg placeholder:text-base mb-3"
                  type="text"
                  name="color"
                  value={color}
                  onChange={(e) => {
                    setColor(e.target.value);
                  }}
                  id="color"
                  required
                  placeholder="Color"
                />
                <input
                  className="bg-orange-50 rounded px-4 py-2 w-full text-lg placeholder:text-base mb-3"
                  type="text"
                  name="plate"
                  value={plate}
                  onChange={(e) => {
                    setPlate(e.target.value);
                  }}
                  id="plate"
                  required
                  placeholder="Registration info"
                />
              </div>
              <div className="flex gap-4">
                <input
                  className="bg-orange-50 rounded px-4 py-2 w-full text-lg placeholder:text-base mb-3"
                  type="number"
                  name="capacity"
                  value={capacity}
                  onChange={(e) => {
                    setCapacity(e.target.value);
                  }}
                  id="capacity"
                  required
                  placeholder="Capacity"
                />
                <select
                  className="bg-orange-50 rounded px-4 py-2 w-full text-base mb-3"
                  name="vehicleType"
                  value={vehicleType}
                  onChange={(e) => {
                    setVehicleType(e.target.value);
                  }}
                  id="vehicleType"
                  required
                >
                  <option selected disabled>Vehicle Type</option>
                  <option value="bike">Bike</option>
                  <option value="auto">Auto</option>
                  <option value="car">Car</option>
                </select>
              </div>
              <button className="bg-black text-white py-2 px-4 rounded-md w-full mt-10 text-xl font-semibold">
                Register as Captain
              </button>
            </form>
            <p className="text-md text-center font-semibold mt-3">
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