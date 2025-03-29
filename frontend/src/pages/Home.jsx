import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const Home = () => {
  return (
    <div>
      <div className="h-screen w-full pt-7 flex justify-between flex-col bg-cover bg-[url('backgroundImage1.png')]">
        <Logo/>
        <div className="bg-white p-5 pt-2">
          <h2 className="text-3xl font-bold">Get started with us</h2>
          <Link to={'/login'} className="w-full inline-block text-center bg-black text-white rounded py-2 text-xl mt-5">Continue</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
