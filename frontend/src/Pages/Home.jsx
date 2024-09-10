import React from 'react'

export default function Home(){
  return (
    <div className=' flex justify-center items-center'>
        <div className='text-center'>
          <div className=' flex justify-center'>
          <img src='/HomePayTime.png' alt='Homepaytime' className='w-72 lg:w-96'/>
          </div>
          <div className='font-semibold text-lg lg:text-xl'> A faster, safer way to pay</div>
          <div className='mt-2 font-medium text-sm lg:text-base'>Manage finances, track spendings and transfer money in few clicks.</div>
        </div>
    </div>
  )
}
