import React from 'react'

export default function SendMoney(){
  return (
    
    <div className='bg-slate-300 h-screen flex justify-center items-center'>
      <div className='w-80 md:w-128 h-max rounded-md bg-white p-5 text-center'>
        <div className='font-bold text-2xl mt-5 mb-10'>Send Money</div>
        <div className='flex justify-left items-center'>
          <div className='w-12 h-12 bg-green-500 text-white rounded-full font-semibold text-xl flex justify-center items-center'>A</div>
          <div className='font-semibold text-xl ml-3 '>Friend's Name</div>
        </div>
        <div className='mt-2'>
          <div className='font-semibold text-sm text-left my-2'>Amount(in Rs)</div>
          <div><input className='w-full p-3 border rounded text-sm' placeholder='Enter Amount'/></div>
        </div>
        <div className='my-3'>
        <button type="button" class="w-full focus:outline-none text-white bg-green-500 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-500 dark:hover:bg-green-500 dark:focus:ring-green-600">Initiate Transfer</button>
        </div>
      </div>
    </div>
  )
}
