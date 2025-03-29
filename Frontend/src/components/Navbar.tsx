import { Link } from 'react-router-dom';
import Button from './Button';

const Navbar = () => {
  const navItemClasses =
    'lg:px-5 lg:py-7 md:block cursor-pointer hover:bg-[#1E2539] hover:text-orange-500 px-2 py-5 hidden';

  return (
    <nav className="bg-[#121826] text-white flex items-center justify-between lg:px-12 md:px-6">
      <ul className="flex">
        <li className="flex items-center justify-between px-5 cursor-pointer hover:">
          <img className="h-16" src="logo.svg" alt="" />
        </li>
        <li>
          <a href="#insights" className={navItemClasses}>
            Insights
          </a>
        </li>
        <li>
          <a href="#empower" className={navItemClasses}>
            Empower
          </a>
        </li>
        <li>
          <a href="#recommendation" className={navItemClasses}>
            Recommendation
          </a>
        </li>
        <li>
          <a href="#demo" className={navItemClasses}>
            Demo
          </a>
        </li>
      </ul>
      <div className="flex items-center justify-between gap-5">
        <Link to="/register">
          <Button variant="primary">Join</Button>
        </Link>
        <Link to="/login">
          <Button variant="primary">Log In</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
