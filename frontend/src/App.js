import HomeBlock from './pages/Home';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import ErrorPage from './pages/ErrorPage';
import Unauthorized from './pages/Unauthorized';
import AdminLayout from './layout/AdminLayout';
import AdminHome from './pages/admin/General/AdminHome';
import Category from './pages/admin/General/Category';

import Beat from './pages/admin/Products/Beat';
import Artwok from './pages/admin/Products/Artwok';
import Lyrics from './pages/admin/Products/Lyrics';

import PromoCodes from './pages/admin/Accounting/PromoCodes';
import History from './pages/admin/Accounting/History';
import Prediction from './pages/admin/Accounting/Prediction';

import Instagram from './pages/admin/SocialMedia/Instagram';

import Account from './pages/admin/Setting/Account';

export default function App() {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route path='/admin' element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path='Category' element={<Category />} />

              <Route path='Beat' element={<Beat />} />
              <Route path='Artwork' element={<Artwok />} />
              <Route path='Lyrics' element={<Lyrics />} />

              <Route path='Prediction' element={<Prediction />} />
              <Route path='History' element={<History />} />
              <Route path='PromoCodes' element={<PromoCodes />} />

              <Route path='Instagram' element={<Instagram />} />

              <Route path='Account' element={<Account />} />
            </Route>

            <Route path='/' element={<HomeBlock />} />
            <Route path='Unauthorized' element={<Unauthorized />} />
            <Route path='*' element={<ErrorPage />} />
          </>,
        ),
      )}
    />
  );
}
