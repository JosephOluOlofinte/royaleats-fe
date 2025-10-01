import { CircleUserRound, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { useAuth0 } from '@auth0/auth0-react';
import MobileNavLinks from './MobileNavLinks';

export const MobileNav = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='text-orange-500' />
      </SheetTrigger>
          <SheetContent className='p-5'>
              
        <SheetTitle>
          {isAuthenticated ? (
            <span className='flex items-center font-bold gap-2'>
              <CircleUserRound className='text-orange-500' />
              {user?.email}
            </span>
          ) : (
            <span>Welcome to RotalEats!</span>
          )}
              </SheetTitle>
              
        <Separator />
        <SheetDescription className='flex flex-col gap-4'>
          {isAuthenticated ? (
            <MobileNavLinks />
          ) : (
            <Button
              variant='ghost'
              className='bg-orange-500 text-amber-50 font-bold hover:text-orange-500 hover:bg-amber-50'
              onClick={async () => await loginWithRedirect()}>
              Log in
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
