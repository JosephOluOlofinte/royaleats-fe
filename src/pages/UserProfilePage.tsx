import { useUpdateCurrentUser } from "../api/CurrentUserApi";
import UserProfileForm from "../forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {

  const { updateCurrentUser, isPending } = useUpdateCurrentUser();
    return (
      <UserProfileForm onSave={updateCurrentUser} isLoading={isPending} />
  )
}

export default UserProfilePage;