import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import FinishRide from '../components/FinishRide'

const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)

    useGSAP(() => {
        if(finishRidePanel){
          gsap.to(finishRidePanelRef.current,{
            transform: 'translateY(0)'
          })
        }else{
          gsap.to(finishRidePanelRef.current, {
            transform: 'translateY(100%)'
          })
        }
      }, [finishRidePanel])
    

  return (
    <div className="h-screen">
      <div className="fixed pt-7 flex items-center justify-between w-full">
        <Logo />
        <Link
          to={"/captain-home"}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white mr-7"
        >
          <i className="ri-logout-box-line"></i>
        </Link>
      </div>
      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="tempImage.png"
          alt=""
        />
      </div>
      <div onClick={() => {
        setFinishRidePanel(true)
      }} className="h-1/5 px-8 flex items-center justify-between bg-yellow-300">
        <h4 className='text-xl font-semibold'>4 KM away</h4>
        <button className="bg-green-400 text-white font-semibold px-8 py-3 rounded-xl">End Ride</button>
      </div>
      <div ref={finishRidePanelRef} className="fixed bottom-0 h-full w-full z-10 bg-white px-3 py-10 translate-y-full">
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  )
}

export default CaptainRiding