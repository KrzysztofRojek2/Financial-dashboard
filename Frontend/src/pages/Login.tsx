import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogin } from '../api/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Użycie hooka useLogin
  const { mutate: login, isPending: isLoginLoading } = useLogin();

  const handleLogin = async () => {
    login(
      { email, password },
      {
        onSuccess: () => {
          toast.success('Zalogowano pomyślnie!');
          navigate('/dashboard');
        },
        onError: () => {
          toast.error('Błąd logowania. Spróbuj ponownie.');
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
        <h1 className="self-center text-4xl font-bold">Login</h1>
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
          <div className="flex justify-between text-sm">
            <p>
              No account?
              <Link to="/register" className="cursor-pointer underline">
                Register
              </Link>
            </p>
            <p className="cursor-pointer underline">Forgot password?</p>
          </div>
        </div>
        <Button
          variant="secondary"
          onClick={handleLogin}
          disabled={isLoginLoading}
        >
          {isLoginLoading ? 'Logowanie...' : 'LOGIN'}
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

export default Login;
