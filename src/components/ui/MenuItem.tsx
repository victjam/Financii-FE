interface MenuItemProps {
  item: {
    icon: string;
    name: string;
  };
}

const MenuItem = ({ item }: MenuItemProps) => {
  return (
    <div>
      <div className="flex items-center space-x-2 cursor-pointer hover:bg-blue-100 p-2 rounded transition-all">
        <p className="text-xs font-semibold">{item.name}</p>
      </div>
    </div>
  );
};

export default MenuItem;
