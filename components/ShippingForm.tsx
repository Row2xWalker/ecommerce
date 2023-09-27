import React from 'react'

const ShippingForm = () => {
  return (
    <div>
        <h1 className="text-xl pb-4">Delivery Information</h1>
        <form className="px-8 pt-6 pb-8 mb-4">
          <div className="flex gap-2">
            <div className="mb-4">
              <label htmlFor="fullName" className="inline-block text-gray-700 font-bold mb-2">Full Name</label>
              <input
              type="text"
              id="Full Name"
              placeholder="Enter your name"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Mobile Phone</label>
              <input
              type="text"
              id="phone"
              placeholder="Enter your phone"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
              <input
              type="text"
              id="address"
              placeholder="Enter your address"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
          </div>  
          <div className="flex gap-2">
            <div className="mb-4">
              <label htmlFor="postalCode" className="inline-block text-gray-700 font-bold mb-2">Postal Code</label>
              <input
              type="text"
              id="postalCode"
              placeholder="Postal Code"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="inline-block text-gray-700 font-bold mb-2">City</label>
              <input
              type="text"
              id="city"
              placeholder="Enter your City"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="region" className="block text-gray-700 font-bold mb-2">Region</label>
            <input
            type="text"
            id="region"
            placeholder="Enter your region"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </form>
    </div>
  )
}

export default ShippingForm