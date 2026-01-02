import React from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "./sidebar.jsx";
// import UserHeader from "../components/user/UserHeader";

const UserLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <UserSidebar />
      <div className="flex flex-col flex-1">
       
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
