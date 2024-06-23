import React from "react";
import { Sidebar, SidebarItem } from "./Sidebar-layout";
import { BadgePercent, PackageSearch, CirclePlus, User } from "lucide-react";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar>
        <a className="link" href="/products">
          <SidebarItem icon={<User size={20} />} text="Profile" />
        </a>
        <a className="link" href="/products">
          <SidebarItem icon={<PackageSearch size={20} />} text="Products" />
        </a>
        <a className="link" href="/offers">
          <SidebarItem icon={<BadgePercent size={20} />} text="Offers" />
        </a>
        <a className="link" href="/add-offer">
          <SidebarItem icon={<CirclePlus size={20} />} text="Add" />
        </a>
      </Sidebar>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Layout;
