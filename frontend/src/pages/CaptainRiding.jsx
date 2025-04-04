import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../components/Logo'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import FinishRide from '../components/FinishRide.jsx'
import LiveTracking from '../components/LiveTracking.jsx'

const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride

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
    <div className="relative h-screen w-full overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-20 pt-7 flex items-center justify-between w-full">
        <Logo />
      </div>
      <div className="absolute z-2 top-0 left-0 w-full h-full">
        <LiveTracking/>
      </div>
      <div  className="fixed h-[15%] bottom-0 left-0 right-0 z-30 px-8 flex items-center justify-between bg-yellow-300 shadow-lg">
        <h4 className='text-xl font-semibold'>4 KM away</h4>
        <button onClick={() => {
        setFinishRidePanel(true)
      }} className="bg-green-500 text-white font-semibold px-8 py-3 rounded-xl shadow-md">End Ride</button>
      </div>
      <div ref={finishRidePanelRef} className="fixed bottom-0 left-0 h-full w-full z-40 bg-white px-3 py-10 translate-y-full">
        <FinishRide
        ride={rideData}
        setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  )
}

export default CaptainRiding