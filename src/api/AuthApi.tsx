import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;




// communicate with signup endpoint
type SignUpRequest = {
  name: string;
  email: string;
  password: string;
};

export const useSignUp = () => {

    const signUpRequest = async (user: SignUpRequest) => {
        const response = await fetch(`${API_BASE_URL}/auth/sign-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error('Failed to sign up');
        }
    };

    const {
        mutateAsync: signUp,
        isPending,
        isError,
        isSuccess,
    } = useMutation({ mutationFn: signUpRequest });

    return {
        signUp,
        isPending,
        isError,
        isSuccess
    }
}

// communiacte with auth0 create user endpoint
type CreateAuth0UserRequest = {
    auth0Id: string;
    email: string;
}

export const useCreateAuth0User = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createAuth0UserRequest = async (user: CreateAuth0UserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/auth/sign-up/auth0`, {
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
        mutateAsync: createAuth0user,
        isPending,
        isError,
        isSuccess
    } = useMutation({ mutationFn: createAuth0UserRequest });

    return {
        createAuth0user,
        isPending,
        isError,
        isSuccess
    }
}



// communicate with login endpoint
type LoginUserRequest = {
  email: string;
  password: string;
};

export const useLogin = () => {

    const loginUserRequest = async (user: LoginUserRequest) => {
        
        const response = await fetch(`${API_BASE_URL}/auth/sign-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error('Failed to log in user');
        }
    };

    const {
        mutateAsync: loginUser,
        isPending,
        isError,
        isSuccess,
    } = useMutation({ mutationFn: loginUserRequest });

    return {
        loginUser,
        isPending,
        isError,
        isSuccess,
    };
}