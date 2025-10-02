import { Loader2Icon } from 'lucide-react';
import { Button } from './button';

const LoadingButton = () => {
  return (
    <Button disabled>
      <Loader2Icon className='animate-spin mr-2 h-4 w-4' />
      Loading...
    </Button>
  );
}

export default LoadingButton;