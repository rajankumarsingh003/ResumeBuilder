

import React from 'react';

const CallToAction = () => {
  return (
    <div>
      <div 
        id='cta' 
        className='w-full max-w-5xl mx-auto px-6 sm:px-16 mt-20 relative overflow-hidden rounded-4xl shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700'
      >
        {/* Decorative blur */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>

        <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-6 md:px-10 py-16 sm:py-20">
          <p className="text-2xl sm:text-2xl font-semibold max-w-md text-white">
            Build your professional resume in minutes
          </p>

          <a 
            href="/app?state=register" 
            className="flex items-center gap-3 rounded-full py-3 px-8 bg-white hover:bg-gray-100 transition-all text-blue-700 font-medium shadow-md hover:scale-105"
          >
            <span>Get Started</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default CallToAction;
