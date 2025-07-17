'use client'

import React, { useState, useEffect } from 'react'
import {
  Menu,
  X,
  MapPin,
  Navigation,
  Clock,
  User,
  LogOut,
  Star,
  Car,
  DollarSign,
  Settings,
} from 'lucide-react'
import { useDriver } from '../useContext/DriverContext'
import { useRouter } from 'next/navigation'

const DriverHeader = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isOnline, setIsOnline] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const { driver, setDriver } = useDriver()

  // Ensure we're on the client side before accessing localStorage
  useEffect(() => {
    setIsClient(true)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline)
  }

  const logout = () => {
    if (isClient) {
      setIsLoggingOut(true)
      localStorage.removeItem('driverId')
      router.push('/DriverSignin')
    }
  }

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Navigation className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                RideFlow Driver
              </h1>
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Online/Offline Toggle */}
            <div className="flex items-center space-x-3">
              <span
                className={`text-sm font-medium ${
                  isOnline ? 'text-green-600' : 'text-gray-500'
                }`}
              >
                {isOnline ? 'Online' : 'Offline'}
              </span>
              <button
                onClick={toggleOnlineStatus}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isOnline
                    ? 'bg-green-500 focus:ring-green-500'
                    : 'bg-gray-300 focus:ring-gray-400'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${
                    isOnline ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Hamburger Menu */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-16 right-4 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{driver?.name || 'Driver'}</p>
                <p className="text-sm text-gray-500">{driver?.email || 'email@example.com'}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">4.8 Rating</span>
                </div>
              </div>
            </div>
          </div>

          <div className="py-2">
            <a
              href="#"
              className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <User className="w-5 h-5 text-gray-500 mr-3" />
              <span className="text-gray-700">Driver Profile</span>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <Car className="w-5 h-5 text-gray-500 mr-3" />
              <span className="text-gray-700">Vehicle Info</span>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <Clock className="w-5 h-5 text-gray-500 mr-3" />
              <span className="text-gray-700">Trip History</span>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <DollarSign className="w-5 h-5 text-gray-500 mr-3" />
              <span className="text-gray-700">Earnings</span>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <Star className="w-5 h-5 text-gray-500 mr-3" />
              <span className="text-gray-700">Ratings & Reviews</span>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-500 mr-3" />
              <span className="text-gray-700">Settings</span>
            </a>
            <hr className="my-2 border-gray-100" />
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-3 hover:bg-red-50 transition-colors text-red-600"
            >
              {isLoggingOut ? (
                <span className="mr-3 h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <LogOut className="w-5 h-5 mr-3" />
              )}
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default DriverHeader