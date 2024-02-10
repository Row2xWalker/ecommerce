import React from 'react'
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'

const DashboardCard = ({title, bgColor, icon}) => {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      <div className={`rounded-full h-12 w-12 flex items-center justify-center ${bgColor}`}>
					{icon}
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">{title}</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">$54232</strong>
						<span className="text-sm text-green-500 pl-2">+343</span>
					</div>
				</div>
    </div>
  )
}

export default DashboardCard