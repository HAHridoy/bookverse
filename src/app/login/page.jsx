import React from 'react'
import LoginForm from './LoginForm'

export default function Login() {
  return (
    <div className="hero min-h-screen">
    <div className="card w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body bg-amber-50">
        <h2 className='text-3xl text-bold text-black text-center font-bold'>Please Login</h2>
        <hr />
        <LoginForm />
      </div>
    </div>
</div>

  )
}
