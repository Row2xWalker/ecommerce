import BuyerProfilePieChart from "@/components/admin/BuyerProfileChart"
import DashboardCard from "@/components/admin/DashboardCard"
import PopularProducts from "@/components/admin/PopularProducts"
import RecentOrders from "@/components/admin/RecentOrders"
import TransactionChart from "@/components/admin/TransactionChart"
import { DASHBOARD_CARDS_DATA } from "@/lib/constants"
const page = () => {
  return (
    <main className="flex flex-col gap-4">
      <header>
        <h1 className="text-lg font-bold">Dashboard</h1>
      </header>
        <div className="flex gap-4">
            {DASHBOARD_CARDS_DATA.map((data)=>(
               <DashboardCard key={data.key} title={data.label} icon={data.icon} bgColor={data.bgColor}/>
            ))}
        </div>
        <div className="flex gap-4 w-full">
              <TransactionChart />
              <BuyerProfilePieChart />
        </div>
        <div className="flex gap-4 w-full">
          <RecentOrders />
          <PopularProducts />
        </div>
    </main>
  )
}

export default page