import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { RootState, useDispatch } from '../../services/store';
import { loginUser } from '../../services/slices/userSlice';
import { useSelector } from 'react-redux';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const errorText = useSelector((state: RootState) => state.user.error);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
