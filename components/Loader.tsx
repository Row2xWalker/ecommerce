import React from 'react'

const Loader = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="pulsating-circle bg-gray-800 h-16 w-16 rounded-full animate-pulse">
            </div>
        </div>
    )
}

export default Loader