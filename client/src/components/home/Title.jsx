

import React from 'react';

const Title = ({ title, description }) => {
  return (
    <div className="text-center mt-8 text-slate-800 px-4 md:px-0">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent animate-fadeIn">
        {title}
      </h2>
      <p className="max-w-2xl mx-auto mt-4 text-slate-600 text-base sm:text-lg leading-relaxed animate-fadeIn">
        {description}
      </p>

      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default Title;
