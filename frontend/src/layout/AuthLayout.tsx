import { Outlet } from 'react-router-dom';
import DarkModeSwitcher from '../components/DarkModeSwitcher';
import { Helmet } from 'react-helmet';

const AuthLayout = () => {

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark min-h-screen">
      <Helmet>
      {/* prevent zoom in on mobile devices */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
      </Helmet>
      <div className='hidden'><DarkModeSwitcher /></div> {/* applying light/dark mode to auth pages, but button is hidden */}
      <div className="flex justify-center overflow-hidden">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
