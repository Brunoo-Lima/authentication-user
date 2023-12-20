import { useContext } from 'react';
import { UserContext } from '../../../UserContext';

const User = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>{user}</h1>
    </div>
  );
};

export default User;
