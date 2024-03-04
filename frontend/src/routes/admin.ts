import { lazy } from 'react';


const EditRefuelingForm = lazy(() => import('../new_pages/tankowania/edycja'));




const adminRoutes = [
    //tankowania
  {
    path: '/tankowania/edycja/:refuelingid',
    title: 'Edycja tankowania',
    component: EditRefuelingForm,
  },
];

const routes = [...adminRoutes];
export default routes;
