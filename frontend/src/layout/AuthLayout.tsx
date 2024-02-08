import { Outlet } from 'react-router-dom';

const AuthLayout = () => {

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex justify-center h-screen overflow-hidden">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
