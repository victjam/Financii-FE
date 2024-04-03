import { Button } from "@nextui-org/react";
import TransactionList from "../components/transaction/TransactionList";
// import MenuItem from "../components/ui/MenuItem";

const Home = () => {
  // const MENU_ITEMS = [
  //   {
  //     name: "Dashboard",
  //     icon: "dashboard",
  //     link: "/",
  //   },
  //   {
  //     name: "Transactions",
  //     icon: "transactions",
  //     link: "/transactions",
  //   },
  //   {
  //     name: "Categories",
  //     icon: "categories",
  //     link: "/categories",
  //   },
  //   {
  //     name: "Reports",
  //     icon: "reports",
  //     link: "/reports",
  //   },
  //   {
  //     name: "Settings",
  //     icon: "settings",
  //     link: "/settings",
  //   },
  // ];

  return (
    <div className="h-screen w-screen  flex flex-row">
      <div className="w-2/12 light:bg-gray-50 dark:bg-blue-200 p-5">
        {/* Profile */}
        <div className="flex border-b-2 border-slate-100 pb-2">
          <div className="rounded-md bg-primaryLight h-10 w-10"></div>
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
          {/* {MENU_ITEMS.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))} */}
        </div>
      </div>
      <div className="w-10/12 p-5">
        <p className="font-semibold">Your wallet</p>
        <div className="flex flex-row space-x-5 mt-5">
          <div className="light:bg-gray-50 dark:bg-blackConfrounded-md p-5 w-1/2 flex flex-col space-y-3">
            <div>
              <p className="text-xs text-gray-500">Total Balance</p>
              <p className="text-2xl font-semibold">$ 1,000</p>
            </div>
            <Button onClick={() => {}}>Add transaction</Button>
          </div>
        </div>
        {/* Recent Transactions */}
        <div className="mt-5 light:bg-gray-50 dark:bg-blackConf p-5 rounded-md">
          <p className="font-semibold">Recent Transactions</p>
          <TransactionList transactions={[]} />
        </div>
      </div>
    </div>
  );
};

export default Home;
