import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import LoadingButton from '../../components/ui/loading-button';
import { Button } from '../../components/ui/button';
import { NavLink } from 'react-router-dom';

const registerSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.email().min(5, 'Invalid email format'),
    password: z.string().min(6, 'Password is too weak'),
    confirmPassword: z.string().min(6, 'Password is too weak'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegistrationFormData = z.infer<typeof registerSchema>;

type Props = {
  onSubmit: (userData: RegistrationFormData) => void;
  isLoading: boolean;
};

const UserRegistrationForm = ({ onSubmit, isLoading }: Props) => {
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 bg-gray-50 rounded-lg md:p-10'>
        <div>
          <h2 className='text-2xl font-bold'>Open an account</h2>
          <FormDescription>It's quick, free, and easy</FormDescription>
        </div>

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className='bg-white' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} className='bg-white' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} className='bg-white' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input {...field} className='bg-white' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type='submit' className='bg-orange-500'>
            Open my account
          </Button>
        )}
        <div>
          <p>Already have an account? <NavLink to='/auth/sign-in' className='text-blue-800 font-semibold'>Sign in</NavLink></p>
        </div>
      </form>
    </Form>
  );
};

export default UserRegistrationForm;
