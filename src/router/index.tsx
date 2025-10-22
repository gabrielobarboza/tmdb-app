import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';

const Home = lazy(() => import('@/pages/Home').then(m => ({ default: m.Home })));
const MovieDetails = lazy(() => import('@/pages/Details').then(m => ({ default: m.Details })));
const Favorites = lazy(() => import('@/pages/Favorites').then(m => ({ default: m.Favorites })));
const Search = lazy(() => import('@/pages/Search').then(m => ({ default: m.Search })));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
    </div>
  );
}

function AppRouter() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </BrowserRouter>
  );
}

export default AppRouter;
