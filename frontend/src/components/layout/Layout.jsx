import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto bg-[#021624] mt-12 md:mt-0">
        <Outlet />
      </div>
    </div>
  );
}
