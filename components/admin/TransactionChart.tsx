"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
	{
		dateName: 'Jan',
		Expense: 4000,
		Income: 2400
	},
	{
		dateName: 'Feb',
		Expense: 3000,
		Income: 1398
	},
	{
		dateName: 'Mar',
		Expense: 2000,
		Income: 9800
	},
	{
		dateName: 'Apr',
		Expense: 2780,
		Income: 3908
	},
	{
		dateName: 'May',
		Expense: 1890,
		Income: 4800
	},
	{
		dateName: 'Jun',
		Expense: 2390,
		Income: 3800
	},
	{
		dateName: 'July',
		Expense: 3490,
		Income: 4300
	},
	{
		dateName: 'Aug',
		Expense: 2000,
		Income: 9800
	},
	{
		dateName: 'Sep',
		Expense: 2780,
		Income: 3908
	},
	{
		dateName: 'Oct',
		Expense: 1890,
		Income: 4800
	},
	{
		dateName: 'Nov',
		Expense: 2390,
		Income: 3800
	},
	{
		dateName: 'Dec',
		Expense: 3490,
		Income: 4300
	}
]

export default function TransactionChart() {
	return (
		<div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
			<strong className="text-gray-700 font-medium">Transactions</strong>
			<div className="mt-3 w-full flex-1 text-xs">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 20,
							right: 10,
							left: -10,
							bottom: 0
						}}
					>
						<CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="Income" fill="#0ea5e9" />
						<Bar dataKey="Expense" fill="#ea580c" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}