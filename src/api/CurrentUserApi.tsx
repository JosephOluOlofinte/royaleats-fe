import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// commmunicate with updateCurrentUser endpoint
type UpdateCurrentuserRequestTypes = {
  name: string;
  address: string;
  city: string;
  country: string;
};

export const useUpdateCurrentUser = () => {
  // get access token from auth0
  const { getAccessTokenSilently } = useAuth0();

  const updateCurrentUserRequest = async (
    formData: UpdateCurrentuserRequestTypes
  ) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/current-user`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    return response.json();
  };

  const {
    mutateAsync: updateCurrentUser,
    isPending,
    isSuccess,
    error,
    reset,
  } = useMutation({ mutationFn: updateCurrentUserRequest });

  if (isSuccess) {
    toast.success('User profile updated')
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    updateCurrentUser,
    isPending,
  };
};


// communicate with getCurrentUser endpoint
// type GetCurrentUserRequestTypes = {
//   name: string;
// }

export const useGetCurrentUser = () => {}