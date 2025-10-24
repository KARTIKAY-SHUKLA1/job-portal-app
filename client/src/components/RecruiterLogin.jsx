import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RecruiterLogin = () => {
  const navigate = useNavigate();
  const [state, setState] = useState('Login');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [isTextDataSubmited, setIsDataSubmited] = useState(false);

  const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // If Sign Up and haven't submitted text data yet, move to image upload step
    if (state === 'Sign Up' && !isTextDataSubmited) {
      // Validate text fields before moving to image upload
      if (!name || !email || !password) {
        toast.error('Please fill in all fields');
        return;
      }
      return setIsDataSubmited(true);
    }

    try {
      if (state === "Login") {
        const loginUrl = `${backendUrl}/api/company/login`;
        console.log('🔑 Login URL:', loginUrl);
        console.log('📧 Email:', email);
        
        const { data } = await axios.post(loginUrl, { email, password });

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem('companyToken', data.token);
          setShowRecruiterLogin(false);
          navigate('/dashboard');
          toast.success('Login successful!');
        } else {
          toast.error(data.message);
        }
      } else {
        // Sign Up - Check if image is uploaded
        if (!image) {
          toast.error('Please upload your company logo');
          return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('image', image);

        const registerUrl = `${backendUrl}/api/company/register`;
        
        console.log('=== REGISTRATION DEBUG ===');
        console.log('🌐 Backend URL from context:', backendUrl);
        console.log('🔗 Full Registration URL:', registerUrl);
        console.log('📦 FormData contents:', {
          name: formData.get('name'),
          email: formData.get('email'),
          password: formData.get('password') ? '***' : 'missing',
          image: formData.get('image') ? `${formData.get('image').name} (${formData.get('image').size} bytes)` : 'missing'
        });
        console.log('========================');

        const { data } = await axios.post(registerUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log('✅ Response received:', data);

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem('companyToken', data.token);
          setShowRecruiterLogin(false);
          navigate('/dashboard');
          toast.success('Account created successfully!');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error('=== ERROR DEBUG ===');
      console.error('❌ Error object:', error);
      console.error('❌ Error message:', error.message);
      console.error('❌ Error response:', error.response);
      console.error('❌ Error config:', error.config);
      console.error('==================');
      
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md animate-in fade-in zoom-in duration-300">
        <form
          onSubmit={onSubmitHandler}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="relative z-10">
              <h1 className="text-2xl font-bold mb-1">
                Recruiter {state}
              </h1>
              <p className="text-blue-100 text-sm">
                {state === 'Sign Up' 
                  ? 'Create your company account' 
                  : 'Welcome back! Please login'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowRecruiterLogin(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="px-8 py-8">
            {state === 'Sign Up' && isTextDataSubmited ? (
              /* Upload Logo Step */
              <div className="text-center">
                <p className="text-gray-600 mb-6">Upload your company logo</p>
                <label className="cursor-pointer inline-block" htmlFor="image">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-2xl border-4 border-dashed border-gray-300 hover:border-blue-500 transition-colors overflow-hidden bg-gray-50 flex items-center justify-center">
                    {image ? (
                      <img
                        className="w-full h-full object-cover"
                        src={URL.createObjectURL(image)}
                        alt="Company Logo"
                      />
                    ) : (
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    )}
                  </div>
                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    hidden
                    id="image"
                    accept="image/*"
                  />
                </label>
                <p className="text-sm text-gray-500">Click to upload company logo</p>
              </div>
            ) : (
              /* Form Fields */
              <div className="space-y-4">
                {state === 'Sign Up' && (
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <input
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      type="text"
                      placeholder="Company Name"
                      required
                    />
                  </div>
                )}

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="Email Address"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Password"
                    required
                  />
                </div>
              </div>
            )}

            {state === 'Login' && (
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-2"
              >
                Forgot password?
              </button>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {state === 'Login'
                ? 'Login to Dashboard'
                : isTextDataSubmited
                ? 'Create Account'
                : 'Continue'}
            </button>

            {/* Toggle State */}
            <div className="mt-6 text-center">
              {state === 'Login' ? (
                <p className="text-gray-600 text-sm">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                    onClick={() => {
                      setState('Sign Up');
                      setIsDataSubmited(false);
                    }}
                  >
                    Sign Up
                  </button>
                </p>
              ) : (
                <p className="text-gray-600 text-sm">
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                    onClick={() => {
                      setState('Login');
                      setIsDataSubmited(false);
                    }}
                  >
                    Login
                  </button>
                </p>
              )}
            </div>
          </div>

          {/* Footer Note */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              By continuing, you agree to Hyrify's Terms of Service and Privacy Policy
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecruiterLogin;