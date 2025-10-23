import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8 relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce">
            <span className="text-white font-bold text-3xl">H</span>
          </div>
          {/* Spinning ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        </div>
        
        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading</h2>
        <p className="text-gray-600">Please wait while we fetch the data...</p>
        
        {/* Loading Dots */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;