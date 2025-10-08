import UserRegistrationForm from '../forms/auth-forms/UserRegistrationForm';
import { useSignUp } from '../api/AuthApi';



const SignUp = () => {
  const { signUp, isPending } = useSignUp();

  return <UserRegistrationForm onSubmit={signUp} isLoading={isPending} />;
};
export default SignUp;
