import { Outlet } from "react-router-dom";
import AdminNavbar from "../Components/AdminNavbar";
export default function AdminLayout() {
  return (
    <div className="bg-gray-1100 h-screen overflow-y-scroll bg_grid pb-36">
      <AdminNavbar />
      <div className="p-2 lg:pl-72 ">
        <div className="mx-auto max-w-8xl space-y-8 px-2 pt-20 lg:px-8 lg:py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
