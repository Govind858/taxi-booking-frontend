"use client"
import { useState, useEffect } from "react"
import { Menu, X, Navigation, Clock, User, LogOut, Star } from "lucide-react"
import { useRouter } from "next/navigation"

// Header Component
const Header = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side before accessing localStorage
  useEffect(() => {
    setIsClient(true)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const logout = () => {
    setIsLoggingOut(true)

    // Safe localStorage access
    if (typeof window !== "undefined") {
      localStorage.removeItem("userId")
    }

    router.push("/UserSignin")
  }

  // Don't render menu-dependent content until client-side hydration
  if (!isClient) {
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
                  RideFlow
                </h1>
              </div>
            </div>
            {/* Placeholder for menu button */}
            <div className="w-10 h-10"></div>
          </div>
        </div>
      </header>
    )
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
                RideFlow
              </h1>
            </div>
          </div>

          {/* Hamburger Menu */}
          <button onClick={toggleMenu} className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            {isMenuOpen ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
          </button>
        </div>
      </div>

      {/* Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-16 right-4 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">John Doe</p>
                <p className="text-sm text-gray-500">john.doe@email.com</p>
              </div>
            </div>
          </div>

          <div className="py-2">
            <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
              <User className="w-5 h-5 text-gray-500 mr-3" />
              <span className="text-gray-700">Profile</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
              <Clock className="w-5 h-5 text-gray-500 mr-3" />
              <span className="text-gray-700">Ride History</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
              <Star className="w-5 h-5 text-gray-500 mr-3" />
              <span className="text-gray-700">Ratings</span>
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

export default Header
