import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import { useBankData } from "../api/bank";
import { useTransactionsData } from "../api/transactions";

const BankAccount = () => {
  const transactionsQuery = useTransactionsData();
  const bankQuery = useBankData();

  if (transactionsQuery.isLoading || bankQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (transactionsQuery.isError || bankQuery.isError) {
    return <p>Error loading data</p>;
  }

  return (
    <div className="div-primary px-10 py-20 gap-10">
      <h2 className="text-xl font-bold mb-4">Your Business Bank Account</h2>
      <div className="flex items-center gap-2 bg-[#121826] p-4 rounded-lg shadow-md">
        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-xl" />
        <p>Connected to {bankQuery.data?.bankName}</p>
      </div>
      <div className="p-5 bg-[#121826] rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Current Balance:</h3>
        <p className="text-2xl font-bold text-green-400">${bankQuery.data?.balance}</p>
      </div>
      <h3 className="text-lg font-semibold">Recent Transactions</h3>
      <div className="bg-[#121826] p-5 rounded-lg shadow-md">
        {transactionsQuery.data?.map((t) => (
          <div key={t.id} className="flex justify-between border-b border-gray-700 py-2">
            <p>{t.name}</p>
            <p className={t.amount > 0 ? "text-green-400" : "text-red-500"}>${t.amount}</p>
          </div>
        ))}
      </div>
      <Button variant="secondary" onClick={() => { transactionsQuery.refetch(); bankQuery.refetch(); }}>
        <FontAwesomeIcon icon={faSyncAlt} className="mr-2" /> Refresh Transactions
      </Button>
    </div>
  );
};

export default BankAccount;
