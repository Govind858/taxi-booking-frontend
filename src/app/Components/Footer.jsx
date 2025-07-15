import { Menu, X, MapPin, Navigation, Clock, User, LogOut, Star } from 'lucide-react';


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Navigation className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">RideFlow</h2>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Your trusted ride-sharing partner. Safe, reliable, and affordable transportation at your fingertips.
            </p>
            <div className="flex space-x-4">
              <button className="w-10 h-10 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center">
                <span className="text-sm font-bold">f</span>
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center">
                <span className="text-sm font-bold">t</span>
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center">
                <span className="text-sm font-bold">in</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">How it Works</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Safety</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Ride Now</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Schedule Ride</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Corporate</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Drive with Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 RideFlow. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer