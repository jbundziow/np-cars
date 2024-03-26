import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';


import Homepage from './pages/Homepage';
import SignIn from './pages/authentication/SignIn';
import SignUp from './pages/authentication/SignUp';
import Loader from './common/Loader/Loader';
import routes from './routes/index';
import adminRoutes from './routes/admin';
import RequireAuth from './components/RequireAuth';
import AuthLayout from './layout/AuthLayout';
import Unauthorized from './pages/authentication/Unauthorized';
import PasswordResetPage from './pages/authentication/PasswordResetPage';
import PasswordResetRequestPage from './pages/authentication/PasswordResetRequestPage';
import EmailChangePage from './pages/authentication/EmailChangePage';

import useAuth from './hooks/useAuth';
import Cookies from "js-cookie";
import NotFoundPage from './pages/404Page';




const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 300);
  }, []);

  const websiteTitle: string = ' | NP-CARS'

  //set auth if JWT token is not expired
  const { auth, setAuth } = useAuth();
  if(Cookies.get('userID') && Cookies.get('userRole') && !auth.userID && !auth.userRole) {
    setAuth({userID: Cookies.get('userID'), userRole: Cookies.get('userRole')})
  }
  

  return loading ? (
    <Loader />
  ) : (
    <>
    <Toaster position='top-right' reverseOrder={false} containerClassName='overflow-auto'/>
  
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
        <Route path="/auth/reset_password" element={<PasswordResetPage />} />
        <Route path="/auth/forgot_password" element={<PasswordResetRequestPage />} />
        <Route path="/auth/change_email" element={<EmailChangePage />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/unauthorized" element={<Unauthorized/>} />
        </Route>
        

        {/* protected routes for all users (normal user + admin) */}
        <Route element={<RequireAuth allowedRoles={['user','admin']} />}>
          <Route element={<DefaultLayout />}>
            <Route index element={<Homepage documentTitle={'Strona główna' + websiteTitle} />} />
            {routes.map(({ path, component: Component, title }) => (
              <Route
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component documentTitle={title + websiteTitle}/>
                  </Suspense>
                }
              />
            ))}
          </Route>
        </Route>

        {/* protected routes only for admins */}
        <Route element={<RequireAuth allowedRoles={['admin']} />}>
          <Route element={<DefaultLayout />}>
            <Route index element={<Homepage documentTitle={'Strona główna' + websiteTitle} />} />
            {adminRoutes.map(({ path, component: Component, title }) => (
              <Route
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component documentTitle={title + websiteTitle}/>
                  </Suspense>
                }
              />
            ))}
          </Route>
        </Route>

        {/* 404 page */}
        <Route path="*" element={<NotFoundPage />} />


      </Routes>
    </>
  );
}

export default App;
