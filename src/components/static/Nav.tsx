import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../ui/button';
import UsernameMenu from './UsernameMenu';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <>
      <span className='flex space-x-2 items-center'>
        {isAuthenticated ? (
          <UsernameMenu />
        ) : (
          <div className='flex items-center gap-[30px]'>
            <Button
              variant='ghost'
              className='bg-orange-500 text-amber-50 font-bold hover:text-orange-500 hover:bg-amber-50'
              onClick={async () => await loginWithRedirect()}>
              Log in
            </Button>

            <NavLink to='/auth/sign-up'>
              <Button
                variant='ghost'
                className='bg-orange-500/70 text-amber-50 font-bold hover:text-orange-500 hover:bg-amber-50'>
                Sign up
              </Button>
            </NavLink>
          </div>
        )}
      </span>
    </>
  );
};
export default Nav;
