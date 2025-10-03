import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateAuth0User } from '../api/AuthApi';

const Auth0CallbackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createAuth0user } = useCreateAuth0User();

  const hasCreatedUser = useRef(false);
  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createAuth0user({
        auth0Id: user.sub,
        email: user.email,
      });
      hasCreatedUser.current = true;
    }
    navigate('/');
  }, [createAuth0user, navigate, user]);

  return <>Loading...</>
};

export default Auth0CallbackPage;
