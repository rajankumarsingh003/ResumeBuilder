




import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authSlice'

const Navbar = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutuser = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/resumelogo2.svg"
            alt="logo"
            className="h-9 sm:h-10 w-auto"
          />
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-4 text-sm">
          
          {/* User Name (hide on mobile) */}
          <p className="hidden sm:block text-slate-700">
            Hi, <span className="font-medium">{user?.name}</span>
          </p>

          {/* Logout Button */}
          <button
            onClick={logoutuser}
            className="
              border border-gray-300
              px-4 sm:px-6
              py-1.5
              rounded-full
              text-slate-700
              hover:bg-slate-100
              active:scale-95
              transition-all
              whitespace-nowrap
            "
          >
            Logout
          </button>
        </div>

      </nav>
    </header>
  )
}

export default Navbar
