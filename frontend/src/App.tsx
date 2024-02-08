import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';


import Homepage from './new_pages/Homepage';
import SignIn from './new_pages/authentication/SignIn';
import SignUp from './new_pages/authentication/SignUp';
import Loader from './common/Loader';
import routes from './routes';
import RequireAuth from './components/RequireAuth';
import AuthLayout from './layout/AuthLayout';
import Unauthorized from './new_pages/authentication/Unauthorized';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const websiteTitle: string = ' | NP-CARS'

  return loading ? (
    <Loader />
  ) : (
    <>
    <Toaster position='top-right' reverseOrder={false} containerClassName='overflow-auto'/>
  
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
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

        {/* TODO: protected routes only for admins */}
        {/* <Route element={<RequireAuth allowedRoles={['admin']} />}>
        </Route> */}

      </Routes>
    </>
  );
}

export default App;
