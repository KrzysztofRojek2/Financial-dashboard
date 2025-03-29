import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  style?: string;
  onClick?: () => void;
  disabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  style,
  onClick,
  disabled,
}) => {
  const variants = {
    primary: 'bg-[#1E2539]',
    secondary: 'bg-[#121826]',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center items-center gap-2 px-4 py-4 rounded-xl shadow-md shadow-gray-950 cursor-pointer hover:text-orange-500 ${variants[variant]} ${style}`}
    >
      {children}
    </button>
  );
};

export default Button;
