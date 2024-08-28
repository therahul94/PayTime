import React from 'react'
import { Link } from 'react-router-dom'

export default function BottomWarning({label, buttonText, to}){
  return (
    <div className='text-sm'>
        {label} <Link to={to} className='underline py-2'>{buttonText}</Link>
    </div>
  )
}
