"use client"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Loader2, Navigation, Menu, User } from "lucide-react"

// Loading skeleton components
const HeaderSkeleton = () => (
  <div className="h-16 bg-white shadow-lg border-b border-gray-200 animate-pulse">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Navigation className="w-6 h-6 text-white" />
          </div>
          <div className="w-24 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RideFlow
            </span>
          </div>
        </div>
        <Menu className="w-6 h-6 text-gray-600" />
      </div>
    </div>
  </div>
)

const MainContentSkeleton = () => (
  <div className="flex-1 bg-gray-50 min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-8"></div>
          <div className="space-y-6">
            <div className="h-20 bg-gray-300 rounded-xl"></div>
            <div className="h-20 bg-gray-300 rounded-xl"></div>
            <div className="h-12 bg-gray-300 rounded-xl"></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-xl h-[500px] animate-pulse">
          <div className="w-full h-full bg-gray-300 rounded-2xl flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  </div>
)

const FooterSkeleton = () => (
  <div className="bg-gray-900 h-64 animate-pulse">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="h-6 bg-gray-700 rounded mb-4 w-32"></div>
          <div className="h-4 bg-gray-700 rounded mb-2 w-full"></div>
          <div className="h-4 bg-gray-700 rounded mb-6 w-3/4"></div>
        </div>
        <div>
          <div className="h-6 bg-gray-700 rounded mb-4 w-24"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded w-20"></div>
            <div className="h-4 bg-gray-700 rounded w-24"></div>
            <div className="h-4 bg-gray-700 rounded w-16"></div>
          </div>
        </div>
        <div>
          <div className="h-6 bg-gray-700 rounded mb-4 w-20"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded w-24"></div>
            <div className="h-4 bg-gray-700 rounded w-28"></div>
            <div className="h-4 bg-gray-700 rounded w-20"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// Dynamically import components with SSR disabled
const Header = dynamic(() => import("../Components/Header"), {
  ssr: false,
  loading: () => <HeaderSkeleton />,
})

const MainContent = dynamic(() => import("../Components/MainContent"), {
  ssr: false,
  loading: () => <MainContentSkeleton />,
})

const Footer = dynamic(() => import("../Components/Footer"), {
  ssr: false,
  loading: () => <FooterSkeleton />,
})

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Always render the skeleton components during SSR and hydration
  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen">
        <HeaderSkeleton />
        <MainContentSkeleton />
        <FooterSkeleton />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <MainContent />
      <Footer />
    </div>
  )
}