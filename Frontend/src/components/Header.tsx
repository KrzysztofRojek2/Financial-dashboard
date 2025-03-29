import { Link } from 'react-router-dom';
import Button from './Button';

const Header = () => {
  return (
    <div className="w-full h-[600px] text-white relative flex flex-col justify-center items-center text-center gap-y-10">
      <img
        className="absolute inset-0 w-full h-full object-cover brightness-50 -z-10"
        src="bg1.jpg"
        alt="background"
      />
      <h1 className="text-3xl sm:text-3xl md:text-5xl font-bold w-2/3 lg:w-1/3">
        Empower Your Financial Journey with Insights
      </h1>
      <p className="text-lg md:text-xl w-3/4 lg:w-1/2">
        Unlock the full potential of your finances with our intuitive dashboard.
        Experience real-time insights and make informed decisions effortlessly.
      </p>
      <div className="flex justify-center items-center gap-10">
        <Link to="/register">
          <Button variant="primary">Get Started</Button>
        </Link>
        <Link to="/login">
          <Button variant="primary">Log In</Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
