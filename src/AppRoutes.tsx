import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import Auth0CallbackPage from './pages/Auth0CallbackPage';
import UserProfilePage from './pages/UserProfilePage';
import SignUp from './auth/SignUp';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      <Route path='/auth-callback' element={<Auth0CallbackPage />} />
      <Route
        path='/auth/sign-up'
        element={
          <Layout>
            <SignUp />
          </Layout>
        }
      />
      <Route
        path='/user-profile'
        element={
          <Layout>
            <UserProfilePage />
          </Layout>
        }
      />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};
export default AppRoutes;
