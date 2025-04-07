import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const Start = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-cover bg-center relative"
    style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1572013343866-dfdb9b416810?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
    }}>
      <div className="h-screen w-full pt-7 flex justify-between flex-col bg-cover">
        <Logo/>
        <div className="bg-white p-5 pt-2">
          <h2 className="text-3xl font-bold">Get started with us</h2>
          <Link to={'/login'} className="w-full inline-block text-center bg-black text-white rounded py-2 text-xl mt-5">Continue</Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
