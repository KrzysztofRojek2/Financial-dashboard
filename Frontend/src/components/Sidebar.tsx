import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faTimes,
  faHome,
  faBoxOpen,
  faUniversity,
  faMoneyBillWave,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const navLinks = [
  { to: '/dashboard', icon: faHome, label: 'Home' },
  { to: '/dashboard/assets', icon: faBoxOpen, label: 'Assets' },
  { to: '/dashboard/bank-account', icon: faUniversity, label: 'Bank Account' },
  { to: '/dashboard/expenses', icon: faMoneyBillWave, label: 'Expenses' },
  { to: '/dashboard/profile', icon: faUser, label: 'Profile' },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItemStyle =
    'flex items-center gap-2 py-5 pr-8 pl-4 hover:bg-[#0d1728] hover:text-orange-500 cursor-pointer hover:bg-opacity-80';

  return (
    <>
      <button
        className="fixed left-0 top-1/2 -translate-y-1/2 cursor-pointer z-50 bg-[#1E2539] text-white p-4 rounded-r-full shadow-black shadow-lg xl:hidden"
        onClick={() => setIsOpen(true)}
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#1E2539] text-white shadow-2xl z-50 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 xl:hidden`}
      >
        <button
          className="absolute top-5 right-5 text-white cursor-pointer text-2xl"
          onClick={() => setIsOpen(false)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <nav className="flex flex-col text-lg mt-14">
          {navLinks.map(({ to, icon, label }) => (
            <>
              <Link
                key={to}
                className={navItemStyle}
                to={to}
                onClick={() => setIsOpen(false)}
              >
                <FontAwesomeIcon icon={icon} />
                <p>{label}</p>
              </Link>
              <hr className="text-gray-700" />
            </>
          ))}
        </nav>
      </div>

      <nav className="self-start sticky top-10 hidden xl:flex flex-col text-start w-fit h-full bg-[#1E2539] rounded-2xl text-white text-lg whitespace-nowrap shadow-2xl shadow-black">
        {navLinks.map(({ to, icon, label }) => (
          <>
            <Link key={to} className={navItemStyle} to={to}>
              <FontAwesomeIcon icon={icon} />
              <p>{label}</p>
            </Link>
          </>
        ))}
      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
