import Link from 'next/link'
import React from 'react'

import RegisterForm from './RegisterForm';

export default function Signup() {
  
  return (
    <div className="hero min-h-screen">
    <div className="card w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body bg-amber-50">
        <h2 className='text-3xl text-bold text-black text-center font-bold'>Please Sign Up</h2>
        <hr />
        <RegisterForm></RegisterForm>
        <p className='underline'>Already have an account? Please<Link href="/login" className="btn btn-link">Login</Link> </p>
        
      </div>
    </div>
</div>
  )
}
