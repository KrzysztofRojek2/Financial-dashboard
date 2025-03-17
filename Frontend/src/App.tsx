import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Layout from './layouts/Layout';
import Assets from './pages/Assets';
import BankAccount from './pages/BankAccount';
import Expenses from './pages/Expenses';
import Profile from './pages/Profile';
import ScrollToTop from './components/ScrollToTop';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <ScrollToTop />
      <Routes>
        <Route path="/dashboard" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/assets" element={<Assets />} />
          <Route path="/dashboard/bank-account" element={<BankAccount />} />
          <Route path="/dashboard/expenses" element={<Expenses />} />
          <Route path="/dashboard/profile" element={<Profile />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
