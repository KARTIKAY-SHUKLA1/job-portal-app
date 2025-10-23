import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {
    const { setSearchFilter, setIsSearched } = useContext(AppContext)
    const titleRef = useRef(null)
    const locationRef = useRef(null)

    const onSearch = () => {
        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value
        })
        setIsSearched(true)
        // Scroll to job listings
        document.getElementById('job-list')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className='container 2xl:px-20 mx-auto my-10'>
            {/* Hero Section with Gradient */}
            <div className='relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-24 px-6 text-center mx-2 rounded-3xl overflow-hidden shadow-2xl'>
                {/* Animated Background Elements */}
                <div className='absolute inset-0 overflow-hidden'>
                    <div className='absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob'></div>
                    <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>
                    <div className='absolute top-40 left-1/2 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000'></div>
                </div>
                
                <div className='relative z-10'>
                    {/* Main Heading */}
                    <div className='mb-6'>
                        <span className='inline-block bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6'>
                            ✨ Over 10,000+ Jobs Available
                        </span>
                    </div>
                    <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight'>
                        Discover Your Perfect
                        <span className='block bg-gradient-to-r from-yellow-200 to-orange-200 text-transparent bg-clip-text'>
                            Career Match
                        </span>
                    </h1>
                    <p className='mb-12 max-w-2xl mx-auto text-blue-100 text-lg font-light leading-relaxed'>
                        Connect with top companies and find opportunities that match your skills, passion, and ambitions
                    </p>
                    
                    {/* Enhanced Search Bar */}
                    <div className='bg-white rounded-2xl shadow-2xl max-w-4xl mx-auto p-3 flex flex-col sm:flex-row gap-3'> 
                        <div className='flex items-center flex-1 px-5 py-4 bg-gray-50 rounded-xl border-2 border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all'>
                            <img className='h-5 w-5 mr-3 opacity-40' src={assets.search_icon} alt="" />
                            <input 
                                type="text"
                                placeholder='Job title, keywords, or company'
                                className='bg-transparent text-gray-800 outline-none w-full font-medium placeholder:text-gray-400'
                                ref={titleRef}
                            />
                        </div>
                        <div className='flex items-center flex-1 px-5 py-4 bg-gray-50 rounded-xl border-2 border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all'>
                            <img className='h-5 w-5 mr-3 opacity-40' src={assets.location_icon} alt="" />
                            <input 
                                type="text"
                                placeholder='City, state, or remote'
                                className='bg-transparent text-gray-800 outline-none w-full font-medium placeholder:text-gray-400'
                                ref={locationRef}
                            />
                        </div>
                        <button 
                            onClick={onSearch} 
                            className='bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-10 py-4 rounded-xl text-white font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105'
                        >
                            Search Jobs
                        </button>
                    </div>

                    {/* Quick Stats */}
                    <div className='mt-12 flex flex-wrap justify-center gap-8 text-sm'>
                        <div className='flex items-center gap-2'>
                            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                            <span className='text-blue-100'>10,000+ Active Jobs</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='w-2 h-2 bg-yellow-400 rounded-full animate-pulse'></div>
                            <span className='text-blue-100'>500+ Companies Hiring</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='w-2 h-2 bg-purple-400 rounded-full animate-pulse'></div>
                            <span className='text-blue-100'>New Jobs Daily</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trusted Companies Section - Enhanced */}
            <div className='bg-white border border-gray-100 shadow-lg mx-2 mt-8 p-8 rounded-2xl'>
                <div className='flex flex-col items-center gap-6'>
                    <p className='text-gray-500 font-medium text-sm uppercase tracking-wider'>Trusted by Industry Leaders</p>
                    <div className='flex justify-center items-center gap-8 lg:gap-16 flex-wrap'>
                        <img className='h-7 grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100 cursor-pointer' src={assets.microsoft_logo} alt="Microsoft" />
                        <img className='h-7 grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100 cursor-pointer' src={assets.walmart_logo} alt="Walmart" />
                        <img className='h-7 grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100 cursor-pointer' src={assets.accenture_logo} alt="Accenture" />
                        <img className='h-7 grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100 cursor-pointer' src={assets.samsung_logo} alt="Samsung" />
                        <img className='h-7 grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100 cursor-pointer' src={assets.amazon_logo} alt="Amazon" /> 
                        <img className='h-7 grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100 cursor-pointer' src={assets.adobe_logo} alt="Adobe" /> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero