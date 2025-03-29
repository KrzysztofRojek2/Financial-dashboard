import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../components/Button';
import InputField from '../components/InputField';
import {
  useUserData,
  useUpdateUserEmail,
  useUpdateUserNameSurname,
} from '../api/user';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const { data: user, isLoading, isError, refetch } = useUserData();
  const { mutate: updateUserNameSurname } = useUpdateUserNameSurname();
  const { mutate: updateUserEmail } = useUpdateUserEmail();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setSurname(user.surname || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const showSuccessToast = (message: string) => {
    toast.success(message);
  };

  const handleSaveNameSurname = () => {
    updateUserNameSurname(
      { name, surname },
      {
        onSuccess: () => {
          showSuccessToast('Name and surname updated successfully!');
          refetch();
        },
      }
    );
  };

  const handleSaveEmail = () => {
    updateUserEmail(email, {
      onSuccess: () => {
        showSuccessToast('Email updated successfully!');
        refetch();
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !user) return <div>Error fetching user data</div>;

  return (
    <div className="div-primary items-center p-4 py-10 md:p-10 gap-5 text-lg">
      <div className="flex gap-2 sm:gap-5 items-center">
        <InputField
          label="Name"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          label="Surname"
          id="surname"
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <Button
          variant="secondary"
          style="mt-4 hover:text-green-500"
          onClick={handleSaveNameSurname}
        >
          <FontAwesomeIcon icon={faSave} />
        </Button>
      </div>

      <div className="flex gap-5 items-center">
        <InputField
          label="E-mail"
          id="e-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          variant="secondary"
          style="mt-4 !hover:text-green-500"
          onClick={handleSaveEmail}
        >
          <FontAwesomeIcon icon={faSave} />
        </Button>
      </div>

      <Button variant="secondary" style="hover:text-blue-500">
        Change Password
      </Button>

      <div className="flex gap-5 items-center">
        <p>You are with us for:</p>
        <p className="text-2xl font-semibold text-orange-500">54 Days</p>
      </div>
    </div>
  );
};

export default Profile;
