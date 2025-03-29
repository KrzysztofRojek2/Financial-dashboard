import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRegister } from '../api/auth';

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const { mutate: register, isPending: isRegisterLoading } = useRegister();

  const handleRegister = () => {
    register(
      { email, password },
      {
        onSuccess: () => {
          toast.success(
            'Rejestracja udana, zostaniesz przekierowany do strony logowania',
            {
              onClose: () => {
                navigate('/login');
              },
            }
          );
        },
        onError: () => {
          toast.error('Błąd rejestracji');
        },
      }
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url(bg3.jpg)] bg-center bg-cover">
      <div className="div-primary max-w-120 gap-5 px-10 pt-20 pb-10 relative">
        <Link to="/" className="self-baseline absolute top-10">
          <i className="fas fa-arrow-left text-3xl cursor-pointer"></i>
        </Link>
        <h1 className="self-center text-4xl font-bold">Sign Up</h1>
        <InputField
          type="email"
          id="email"
          label="E-mail"
          placeholder="Type your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          id="password"
          label="Password"
          placeholder="Type your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex flex-col justify-between">
          <hr className="text-gray-300 mb-1" />
          <div className="flex justify-end text-sm">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="cursor-pointer underline">
                Log In
              </Link>
            </p>
          </div>
        </div>

        <Button
          variant="secondary"
          onClick={handleRegister}
          disabled={isRegisterLoading}
        >
          {isRegisterLoading ? 'Rejestracja...' : 'SIGN UP'}
        </Button>

        <p className="text-center">Or Sign Up Using</p>
        <div className="flex justify-center mt-5 gap-5">
          <i className="fab fa-facebook text-4xl cursor-pointer"></i>
          <i className="fab fa-apple text-4xl cursor-pointer"></i>
          <i className="fab fa-google text-4xl cursor-pointer"></i>
        </div>
      </div>
    </div>
  );
};

export default Register;
