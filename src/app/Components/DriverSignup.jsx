'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Navigation, User, Phone, Mail, Lock, Car, Palette, Hash, Eye, EyeOff
} from 'lucide-react';
import DriverAxios from '../Axios/DriverAxios';

const DriverSignUp = ({ onSwitchToSignIn, onSwitchToUser }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    model: '',
    color: '',
    vech_number: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await DriverAxios.post('/signup', {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        mobile: formData.mobile.trim(),
        password: formData.password,
        model: formData.model.trim(),
        color: formData.color.trim(),
        vech_number: formData.vech_number.trim(),
      });

      if (response.status === 200 || response.status === 201) {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        router.push('/DriverHome');
      } else {
        setError(response.data.message || 'Signup failed.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Error occurred. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-h-screen overflow-y-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Car className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                RideFlow
              </h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Join as Driver</h2>
            <p className="text-gray-600">Start earning with RideFlow</p>
          </div>

          {error && <div className="text-center text-red-500 mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Personal Info */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <label className="block text-sm font-semibold mb-2">Full Name</label>
              <div className="relative mb-4">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none"
                  required
                />
              </div>

              <label className="block text-sm font-semibold mb-2">Email Address</label>
              <div className="relative mb-4">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your email address"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none"
                  required
                />
              </div>

              <label className="block text-sm font-semibold mb-2">Mobile Number</label>
              <div className="relative mb-4">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Your mobile number"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none"
                  required
                />
              </div>

              <label className="block text-sm font-semibold mb-2">Password</label>
              <div className="relative mb-4">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password"
                  className="w-full pl-11 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <label className="block text-sm font-semibold mb-2">Confirm Password</label>
              <div className="relative mb-4">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="w-full pl-11 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="bg-blue-50 rounded-xl p-4 mb-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Navigation className="w-5 h-5 mr-2" /> Vehicle Information
              </h3>

              <label className="block text-sm font-semibold mb-2">Car Model</label>
              <div className="relative mb-4">
                <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="Your car model"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none"
                  required
                />
              </div>

              <label className="block text-sm font-semibold mb-2">Car Color</label>
              <div className="relative mb-4">
                <Palette className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  placeholder="Your car color"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none"
                  required
                />
              </div>

              <label className="block text-sm font-semibold mb-2">Vehicle Number</label>
              <div className="relative mb-4">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="vech_number"
                  value={formData.vech_number}
                  onChange={handleInputChange}
                  placeholder="Your vehicle number"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-xl font-semibold text-lg text-white ${
                isLoading ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              }`}
            >
              {isLoading ? 'Processing...' : 'Create Driver Account'}
            </button>

            {/* Switch links */}
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={onSwitchToUser}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign up as a passenger
              </button>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={onSwitchToSignIn}
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                Already have an account? Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DriverSignUp;
