import { lazy } from 'react';



const EditRefuelingForm = lazy(() => import('../new_pages/tankowania/edycja'));
const EditFaultForm = lazy(() => import('../new_pages/usterki/edycja'));




const adminRoutes = [
    //tankowania
  {
    path: '/tankowania/edycja/:refuelingid',
    title: 'Edycja tankowania',
    component: EditRefuelingForm,
  },



  //usterki
  {
    path: '/usterki/edycja/:faultid',
    title: 'Edycja usterki',
    component: EditFaultForm,
  },


];

const routes = [...adminRoutes];
export default routes;
