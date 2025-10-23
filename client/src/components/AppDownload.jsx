import React from 'react'

const AppDownload = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Lightning Fast",
      description: "Get instant job matches tailored to your skills and preferences in seconds"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Verified Companies",
      description: "All companies are verified and vetted to ensure legitimate opportunities"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "24/7 Support",
      description: "Our dedicated team is always ready to help you succeed in your job search"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "AI-Powered Matching",
      description: "Advanced algorithms match you with jobs that fit your career goals perfectly"
    }
  ]

  return (
    <div className='container px-4 2xl:px-20 mx-auto my-20'>
      <div className='relative bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-3xl overflow-hidden border border-blue-100 p-8 sm:p-12 lg:p-16'>
        
        {/* Header */}
        <div className='text-center mb-12 relative z-10'>
          <div className='inline-block mb-4'>
            <span className='bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold'>
              ✨ Why Choose Us
            </span>
          </div>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 leading-tight'>
            Your Success is Our Mission
          </h2>
          <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
            Join thousands of job seekers who found their dream careers through our platform
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10'>
          {features.map((feature, index) => (
            <div 
              key={index}
              className='group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100'
            >
              <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300'>
                {feature.icon}
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-2'>
                {feature.title}
              </h3>
              <p className='text-gray-600 text-sm leading-relaxed'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className='grid grid-cols-3 gap-4 mt-12 relative z-10'>
          <div className='text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl'>
            <div className='text-3xl font-bold text-blue-600 mb-1'>10K+</div>
            <div className='text-gray-600 text-sm'>Active Jobs</div>
          </div>
          <div className='text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl'>
            <div className='text-3xl font-bold text-purple-600 mb-1'>500+</div>
            <div className='text-gray-600 text-sm'>Top Companies</div>
          </div>
          <div className='text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl'>
            <div className='text-3xl font-bold text-indigo-600 mb-1'>50K+</div>
            <div className='text-gray-600 text-sm'>Happy Users</div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className='absolute top-0 right-0 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20'></div>
        <div className='absolute bottom-0 left-0 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-20'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-10'></div>
      </div>
    </div>
  )
}

export default AppDownload