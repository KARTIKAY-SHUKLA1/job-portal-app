import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='border-t border-gray-200 bg-white mt-20'>
      <div className='container px-4 2xl:px-20 mx-auto py-8'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
          {/* Hyrify Logo */}
          <img 
            className='h-12' 
            src={assets.logo} 
            alt="Hyrify" 
          />
          
          {/* Copyright */}
          <p className='text-sm text-gray-600 text-center md:text-left'>
            © 2025 Hyrify. Built by <span className='font-semibold text-gray-900'>Kartikay Shukla</span>. All rights reserved.
          </p>
          
          {/* Social Icons */}
          <div className='flex gap-3'>
            <a href="#" className='w-10 h-10 bg-gray-100 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors group'>
              <img className='w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert transition-all' src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a href="#" className='w-10 h-10 bg-gray-100 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors group'>
              <img className='w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert transition-all' src={assets.twitter_icon} alt="Twitter" />
            </a>
            <a href="#" className='w-10 h-10 bg-gray-100 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors group'>
              <img className='w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert transition-all' src={assets.instagram_icon} alt="Instagram" />
            </a>
          </div>
        </div>
        
        <div className='mt-6 pt-6 border-t border-gray-100 flex flex-wrap justify-center gap-6 text-sm text-gray-600'>
          <a href="#" className='hover:text-blue-600 transition-colors'>Privacy Policy</a>
          <a href="#" className='hover:text-blue-600 transition-colors'>Terms of Service</a>
          <a href="#" className='hover:text-blue-600 transition-colors'>Contact Us</a>
          <a href="#" className='hover:text-blue-600 transition-colors'>Help Center</a>
        </div>
      </div>
    </div>
  )
}

export default Footer