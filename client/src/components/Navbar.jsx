import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    const { openSignIn } = useClerk()
    const { user } = useUser()
    const navigate = useNavigate()
    const { setShowRecruiterLogin } = useContext(AppContext)

    return (
        <div className='bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm'> 
        <div className='px-2 md:px-6 2xl:px-12 flex justify-between items-center h-16 max-w-screen-2xl mx-auto'>
                {/* Hyrify Logo - Made Larger */}
                <img 
                    className='h-30 md:h-32 cursor-pointer hover:opacity-90 transition-opacity' 
                    onClick={() => navigate('/')} 
                    src={assets.logo} 
                    alt="Hyrify" 
                />

                {/* User Section */}
                {user ? (
                    <div className='flex items-center gap-6'>
                        <Link 
                            to='/applications'
                            className='text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm'
                        >
                            Applied Jobs
                        </Link>
                        <div className='h-6 w-px bg-gray-300'></div>
                        <p className='max-sm:hidden text-gray-700 text-sm font-medium'>
                            {user.firstName} {user.lastName}
                        </p>
                        <UserButton />
                    </div>
                ) : (
                    <div className='flex gap-3 items-center'>
                        <button 
                            className='text-gray-700 hover:text-gray-900 font-medium text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition-all'
                            onClick={() => setShowRecruiterLogin(true)}
                        >
                            Recruiter Login
                        </button>
                        <button 
                            onClick={() => openSignIn()} 
                            className='bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md'
                        >
                            Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar