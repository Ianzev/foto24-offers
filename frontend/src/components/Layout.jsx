import React from 'react';
import { Sidebar, SidebarItem } from './Sidebar';
import {BadgePercent , PackageSearch } from "lucide-react";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar>
        <a href="/products">
          <SidebarItem icon={<PackageSearch  size={20}/>} text="Products" />
        </a>
        <a href="/offers">
          <SidebarItem icon={<BadgePercent  size={20}/>} text="Offers" />
        </a>
      </Sidebar>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default Layout;
