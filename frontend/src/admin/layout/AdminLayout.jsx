import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
       
        <AdminSidebar />
      <div className="flex flex-col flex-1">
       
      {/* <AdminHeader /> */}

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
