import React from 'react'

const CategoryBar = () => {
  return (
    <section className="bg-white">
        <div className="w-[1440px] items-center mx-auto h-full px-4">
            <ul className="flex gap-4">
                <li>Electronics</li>
                <li>Home & Appliance</li>
                <li>Watches</li>
            </ul>
        </div>    
    </section>
  )
}

export default CategoryBar