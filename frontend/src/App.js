import Home from './pages/Home'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from './pages/ErrorPage'
import Unauthorized from './pages/Unauthorized'
import AdminLayout from './layout/AdminLayout'

export default function App() {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>


            <Route
              path="/admin"
              element={

                <AdminLayout />

              }
            >


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

