import Home from "./pages/Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from "./pages/ErrorPage";
import Unauthorized from "./pages/Unauthorized";
import AdminLayout from "./layout/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import Category from "./pages/admin/Category";

export default function App() {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="Category" element={<Category />} />
            </Route>

            <Route path="/" element={<Home />} />
            <Route path="Unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<ErrorPage />} />
          </>
        )
      )}
    />
  );
}
