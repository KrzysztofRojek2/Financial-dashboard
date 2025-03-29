import { Link } from 'react-router-dom';
import Button from './Button';

const Demo = () => {
  return (
    <div id="demo" className="flex p-4 md:p-12 bg-[#121826] text-white py-16">
      <div className="div-primary text-center md:mx-12 xl:mx-32 p-10 gap-10">
        <h2 className="text-3xl xl:text-4xl font-bold">
          Unlock Your Financial Potential
        </h2>
        <p className="md:text-lg">
          Experience our powerful financial dashboard with a free trial or
          schedule a personalized demo today!
        </p>
        <div className="flex items-center justify-center gap-5">
          <Link to="/register">
            <Button variant="secondary">Sign Up</Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary">Log In</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Demo;
