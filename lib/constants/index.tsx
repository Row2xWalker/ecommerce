import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/admin',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'products',
		label: 'Products',
		path: '/admin/products',
		icon: <HiOutlineCube />
	},
	{
		key: 'orders',
		label: 'Orders',
		path: '/admin/orders',
		icon: <HiOutlineShoppingCart />
	},
	// {
	// 	key: 'customers',
	// 	label: 'Customers',
	// 	path: '/customers',
	// 	icon: <HiOutlineUsers />
	// },
	{
		key: 'transactions',
		label: 'Transactions',
		path: '/transactions',
		icon: <HiOutlineDocumentText />
	},
	// {
	// 	key: 'messages',
	// 	label: 'Messages',
	// 	path: '/messages',
	// 	icon: <HiOutlineAnnotation />
	// }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]

export const DASHBOARD_CARDS_DATA = [
	{
		key: 'revenue',
		label: 'Total Revenue',
		icon: <IoPieChart className="text-2xl text-white" />,
		bgColor: 'bg-sky-500'
	},
	{
		key: 'orders',
		label: 'Total Orders',
		icon: <IoBagHandle className="text-2xl text-white" />,
		bgColor: 'bg-orange-500'
	},
	{
		key: 'products',
		label: 'Total Products',
		icon: <IoCart className="text-2xl text-white" />,
		bgColor: 'bg-yellow-500'
	},
	{
		key: 'visitor',
		label: 'Total Visitors',
		icon: <IoPeople className="text-2xl text-white" />,
		bgColor: 'bg-green-500'
	},
]