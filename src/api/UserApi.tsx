import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from '@tanstack/react-query';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// logic to commmunicate with createUser endpoint
type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }
  };

  const {
    mutateAsync: createUser,
    isPending,
    isError,
    isSuccess,
  } = useMutation({ mutationFn: createUserRequest });

  return {
    createUser,
    isPending,
    isError,
    isSuccess,
  };
};

// logic to commmunicate with updateCurrentUser endpoint
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
    const response = await fetch(`${API_BASE_URL}/users`, {
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
    isError,
    isSuccess,
    error,
    reset,
  } = useMutation({ mutationFn: updateCurrentUserRequest });

  return {
    updateCurrentUser,
    isPending,
    isError,
    isSuccess,
    error,
    reset,
  };
};
