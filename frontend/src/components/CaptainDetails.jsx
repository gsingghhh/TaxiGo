import React from 'react'

const CaptainDetails = () => {
  return (
    <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-4">
            <img className="h-15 w-15 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBDIPutLvCtbiZENUNyzJpBqC_2XBe4ZdhmA&s" alt="" />
            <h3 className="text-lg font-medium">Gyanendra Singh</h3>
          </div>
          <div>
            <h4 className="text-xl font-semibold">₹ 420.42</h4>
            <p className="text-sm text-gray-600">Earned</p>
          </div>
        </div>
        <div className="flex bg-gray-200 p-4 rounded-3xl mt-8 justify-center gap-5 items-start">
          <div className="text-center">
            <i className="text-2xl font-thin ri-time-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600 -mt-1">hours online </p>
          </div>
          <div className="text-center">
            <i className="text-2xl font-thin ri-speed-up-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600 -mt-1">hours online </p>
          </div>
          <div className="text-center">
            <i className="text-2xl font-thin ri-book-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600 -mt-1">hours online </p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails