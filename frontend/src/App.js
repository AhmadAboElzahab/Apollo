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
import Signup from './pages/Signup';

import ShopArtworks from './pages/Shop/Artworks/ShopArtworks';
import ShopArtwork from './pages/Shop/Artworks/ShopArtwork';
import ShopArtworksCategory from './pages/Shop/Artworks/ShopArtworksCategory';

import ShopBeats from './pages/Shop/Beats/ShopBeats';
import ShopBeat from './pages/Shop/Beats/ShopBeat';
import ShopBeatsCategory from './pages/Shop/Beats/ShopBeatsCategory';

import ShopLyrics from './pages/Shop/Lyrics/ShopLyrics';
import ShopLyric from './pages/Shop/Lyrics/ShopLyric';
import ShopLyricsCategory from './pages/Shop/Lyrics/ShopLyricsCategory';

import { useAuthContext } from './Hooks/useAuthContext';
import PurchaseHistory from './pages/Shop/PurchaseHistory';
export default function App() {
  const { user, role } = useAuthContext();
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route
              path='admin'
              element={role === 'admin' ? <AdminLayout /> : <Navigate to='/Unauthorized' />}
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
              <Route
                path='login'
                element={
                  !user ? <Login /> : <Navigate to={role === 'admin' ? '/admin' : '/shop'} />
                }
              />
              <Route
                path='signup'
                element={
                  !user ? <Signup /> : <Navigate to={role === 'admin' ? '/admin' : '/shop'} />
                }
              />
              <Route
                path='/shop'
                element={role !== 'admin' ? <ShopLayout /> : <Navigate to='/admin' />}
              >
                <Route index element={<Navigate to='artworks' replace={true} />} />

                <Route path='artworks' element={<ShopArtworks />} />
                <Route path='artworks/:category/' element={<ShopArtworksCategory />} />
                <Route path='artworks/:category/:product' element={<ShopArtwork />} />

                <Route path='beats' element={<ShopBeats />} />
                <Route path='beats/:category' element={<ShopBeatsCategory />} />
                <Route path='beats/:category/:product' element={<ShopBeat />} />

                <Route path='lyrics' element={<ShopLyrics />} />
                <Route path='lyrics/:category' element={<ShopLyricsCategory />} />
                <Route path='lyrics/:category/:product' element={<ShopLyric />} />

                <Route path='History' element={<PurchaseHistory />} />
              </Route>
            </Route>

            <Route path='Unauthorized' element={<Unauthorized />} />
            <Route path='*' element={<ErrorPage />} />
          </>,
        ),
      )}
    />
  );
}
