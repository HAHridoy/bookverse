import React from 'react'

export default function Login() {
  return (
    <div className="hero min-h-screen">
    <div className="card w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body bg-amber-50">
        <h2 className='text-3xl text-bold text-black text-center font-bold'>Please Login</h2>
        <hr />
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </div>
    </div>
</div>

  )
}
