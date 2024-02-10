import TransactionList from "../components/transaction/TransactionList";

const Home = () => {
  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-row">
      <div className="w-2/12 bg-white p-5">
        {/* Profile */}
        <div className="flex border-b-2 border-slate-100 pb-2">
          <div className="rounded-md bg-blue-300 h-10 w-10"></div>
          <div className="ml-3">
            <div className="font-bold">John Doe</div>
            <div className="text-xs text-gray-500">John@gmail.com</div>
          </div>
        </div>
        {/* Menu */}
        <div className="mt-5 space-y-4">
          <p className="text-gray-300 text-center text-xs uppercase">
            Main Menu
          </p>
          <div>
            <div className="flex items-center space-x-2">
              <div className="rounded-md bg-blue-300 h-5 w-5"></div>
              <p className="text-xs font-semibold">Dashboard</p>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <div className="rounded-md bg-blue-300 h-5 w-5"></div>
              <p className="text-xs font-semibold">Transactions</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-10/12 p-5">
        <p className="font-semibold">Your wallet</p>
        <div className="flex flex-row space-x-5 mt-5">
          <div className="bg-white rounded-md p-5 w-1/2 flex flex-col space-y-3">
            <div>
              <p className="text-xs text-gray-500">Total Balance</p>
              <p className="text-2xl font-semibold">$ 1,000</p>
            </div>
            <button className="bg-blue-300 rounded-md px-3 py-1 text-xs w-40 h-10 text-white">
              Add Transaction
            </button>
          </div>
        </div>
        {/* Recent Transactions */}
        <div className="mt-5 bg-white p-5 rounded-md">
          <p className="font-semibold">Recent Transactions</p>
          <TransactionList transactions={[]} />
        </div>
      </div>
    </div>
  );
};

export default Home;
