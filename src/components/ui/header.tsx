import { CircleUser, Menu, Package2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from './sheet';
import { ToggleMode } from './toggleMode';

const NAVIGATIONS = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Transactions',
    path: '/transaction-list',
  },
  {
    label: 'Categories',
    path: '/categories',
  },
  // {
  //   label: "Reports",
  //   path: "/reports",
  // },
];

export const Header = () => {
  const navigae = useNavigate();
  const navigateTo = (path: string) => {
    navigae(path);
  };
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <a
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="size-6" />
          <span className="sr-only">Financii</span>
        </a>
        {NAVIGATIONS.map((nav) => (
          <a
            key={nav.label}
            href={nav.path}
            onClick={(e) => {
              e.preventDefault();
              navigateTo(nav.path);
            }}
            className="text-muted-foreground hover:text-foreground"
          >
            {nav.label}
          </a>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="size-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <a
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="size-6" />
              <span className="sr-only">Acme Inc</span>
            </a>
            {NAVIGATIONS.map((nav) => (
              <a
                key={nav.label}
                href={nav.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(nav.path);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                {nav.label}
              </a>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          {/* <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div> */}
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="size-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ToggleMode />
      </div>
    </header>
  );
};
