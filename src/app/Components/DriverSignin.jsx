"use client"
import React, { useState } from 'react';
import { Navigation, User, Phone, Mail, Lock, Car, Palette, Hash, Eye, EyeOff } from 'lucide-react';
import DriverAxios from '../Axios/DriverAxios';
import { useRouter } from 'next/navigation';
import { useDriver } from '../useContext/DriverContext';

const DriverSignin = ({ onSwitchToSignUp, onSwitchToUser }) => {
  const router = useRouter();
  const { setDriver } = useDriver()
  const { driver } = useDriver()



  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await DriverAxios.post('/signin', {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });
      console.log(response,"response data")
      localStorage.setItem('driverId',response.data.result.id)
      setDriver({
        id:response.data.result.id,
        token:response.data.result.token,
        name:response.data.result.name,
        email:response.data.result.email,
        mobile:response.data.result.mobile,
      })
     console.log("driver data in signin page:",driver)

      if (response.status === 200) {
        if (response.data.result.token) {
          console.log(response)
          localStorage.setItem('token', response.data.token); // save auth token
        }
        // Redirect to driver dashboard
        router.push('/DriverHome');
      } else {
        setError(response.data.message || 'Sign-in failed.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Car className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                RideFlow
              </h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Driver Portal</h2>
            <p className="text-gray-600">Sign in to start driving</p>
          </div>

          {error && <div className="text-center text-red-500 mb-4">{error}</div>}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="#" className="text-sm text-green-600 hover:text-green-800 font-medium">Forgot Password?</a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In as Driver'
              )}
            </button>
          </form>

          {/* Switch Options */}
          <div className="mt-8 space-y-4">
            <div className="text-center">
              <p className="text-gray-600">
                Don't have a driver account?{' '}
                <button
                  onClick={onSwitchToSignUp}
                  className="text-green-600 hover:text-green-800 font-semibold"
                >
                  Sign Up as Driver
                </button>
              </p>
            </div>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600 mb-3">Looking for a ride?</p>
              <button
                onClick={onSwitchToUser}
                className="w-full bg-blue-50 text-blue-700 py-3 px-6 rounded-xl font-semibold hover:bg-blue-100 transition-colors border border-blue-200"
              >
                User Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverSignin;
