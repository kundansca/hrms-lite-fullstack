import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { THEME } from "../sidebar/theme";

export default function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
