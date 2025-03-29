import { useBankData } from '../api/bank';
import { useUserData } from '../api/user';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useQueryClient } from '@tanstack/react-query';

const currentDate = new Date().toLocaleDateString('en-EN', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const PanelNavbar = () => {
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useUserData();
  const {
    data: bankData,
    isLoading: bankLoading,
    isError: bankError,
  } = useBankData();

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    queryClient.clear();
    navigate('/');
  };

  if (userLoading || bankLoading) {
    return <div>Loading...</div>;
  }

  if (userError || bankError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="flex justify-between items-center rounded-3xl w-full text-white">
      <div className="text-lg p-4 gap-2">
        <h2 className="text-lg lg:text-2xl">Available Balance</h2>
        <p className="text-blue-500 text-2xl lg:text-4xl">
          <span className="text-lg lg:text-3xl">$</span>
          {bankData?.balance || 0}
        </p>
      </div>
      <div className="hidden sm:flex items-center gap-2 text-sm lg:text-xl bg-[#1E2539] p-4 rounded-xl shadow-2xl shadow-black">
        <i className="fa-solid fa-calendar"></i>
        {currentDate}
      </div>
      <div className="hidden lg:flex items-center p-4 space-x-4">
        <span className="text-lg">{user?.name}</span>
        <span className="text-lg">{user?.surname}</span>
      </div>
      <Button style="!shadow-2xl" onClick={handleLogout}>
        <i className="fas fa-sign-out"></i>
        <p>Log Out</p>
      </Button>
    </div>
  );
};

export default PanelNavbar;
