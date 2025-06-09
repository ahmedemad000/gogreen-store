import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Newsletter from './Newsletter';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        {/* This Outlet will render the current route's component */}
        <Outlet />
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}