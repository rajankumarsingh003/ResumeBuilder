




import React from 'react';

const Banner = () => {
    return (
        <div className="w-full py-3 font-medium text-sm text-white text-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-lg animate-pulse">
            <p className="flex items-center justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white text-blue-700 font-semibold uppercase tracking-wide shadow-md">
                    New
                </span>
                 AI-Powered Features Added! Check Out The Latest Upgrades
            </p>
        </div>
    )
}

export default Banner;
