const TotalBalanceCard = () => {
  return (
    <div className="border border-gray-100 px-2 py-2">
        <p>Total Balance</p>
        <h1 className="font-bold text-2xl">Php 9,000</h1>
        <div className="flex w-full mx-auto gap-2 mt-4">
            <button className="bg-blue-500 py-2 rounded px-2 text-white">Withdraw</button>
            <button className="bg-blue-500 py-2 rounded px-2 text-white">Deposit</button>
        </div>
    </div>
  )
}

export default TotalBalanceCard