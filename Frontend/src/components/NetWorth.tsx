import { useUserData } from '../api/user';

const NetWorth = () => {
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useUserData();

  const renderNetWorth = () => {
    if (userLoading) {
      return <h1 className="text-3xl md:text-5xl font-bold z-2">Loading...</h1>;
    }
    if (userError) {
      return (
        <h1 className="text-3xl md:text-5xl font-bold z-2 text-red-400">
          Error!
        </h1>
      );
    }
    return (
      <h1 className="text-3xl md:text-5xl font-bold z-2">
        ${user?.netWorth?.toLocaleString() || '0'}
      </h1>
    );
  };

  return (
    <div className="relative z-2 h-1/2 flex flex-col bg-gradient-to-r from-pink-600 to-orange-600 text-white rounded-3xl p-20 w-full gap-10 shadow-none">
      <div className="absolute z-1 inset-0 rounded-3xl bg-gradient-to-r from-pink-600 to-orange-600 blur-xl opacity-50"></div>
      <p className="text-lg md:text-xl z-2">Total Net Worth</p>
      {renderNetWorth()}
    </div>
  );
};

export default NetWorth;
