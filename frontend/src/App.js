import Home from './pages/Home';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';

import ErrorPage from './pages/ErrorPage';
import Unauthorized from './pages/Unauthorized';

import AdminLayout from './layout/AdminLayout';
import HomeLayout from './layout/HomeLayout';
import ShopLayout from './layout/ShopLayout';

import AdminHome from './pages/admin/General/AdminHome';
import Category from './pages/admin/General/Category';

import Beat from './pages/admin/Products/Beat';
import Artwork from './pages/admin/Products/Artwork';
import Lyrics from './pages/admin/Products/Lyrics';

import PromoCodes from './pages/admin/Accounting/PromoCodes';
import History from './pages/admin/Accounting/History';
import Prediction from './pages/admin/Accounting/Prediction';

import Telegram from './pages/admin/SocialMedia/Telegram';

import Account from './pages/admin/Setting/Account';
import Login from './pages/Login';

import { useAuthContext } from './Hooks/useAuthContext';

export default function App() {
  const { user, role } = useAuthContext();
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route
              path='admin'
              element={
                role === 'admin' ? <AdminLayout /> : <Navigate to='/Unauthorized' replace={true} />
              }
            >
              <Route index element={<AdminHome />} />
              <Route path='Category' element={<Category />} />

              <Route path='Beat' element={<Beat />} />
              <Route path='Artwork' element={<Artwork />} />
              <Route path='Lyrics' element={<Lyrics />} />

              <Route path='Prediction' element={<Prediction />} />
              <Route path='History' element={<History />} />
              <Route path='PromoCodes' element={<PromoCodes />} />

              <Route path='Telegram' element={<Telegram />} />

              <Route path='Account' element={<Account />} />
            </Route>

            <Route path='/' element={<HomeLayout />}>
              <Route index element={<Home />} />
              <Route path='login' element={!user ? <Login /> : <Navigate to={`/${role}`} />} />
              <Route path='/shop' element={<ShopLayout />}></Route>
            </Route>

            <Route path='Unauthorized' element={<Unauthorized />} />
            <Route path='*' element={<ErrorPage />} />
          </>,
        ),
      )}
    />
  );
}
