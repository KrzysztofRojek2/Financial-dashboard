interface InputFieldProps {
  label?: string;
  id: string;
  type: string;
  value?: string | number;
  placeholder?: string;
  variant?: 'primary' | 'secondary';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type,
  variant = 'secondary',
  value,
  placeholder,
  onChange,
}) => {
  const variants = {
    primary: 'bg-[#1E2539]',
    secondary: 'bg-[#121826]',
  };

  return (
    <div className="flex flex-col">
      <label className="pl-2 text-sm" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        className={`p-4 rounded-xl w-full ${variants[variant]}`}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
