import { lazy } from 'react';



const EditRefuelingForm = lazy(() => import('../new_pages/tankowania/edycja'));
const ChangeStatusOfFaultForm = lazy(() => import('../new_pages/usterki/zmien-status'));
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
  {
    path: '/usterki/zmiana-statusu/:faultid',
    title: 'Zmiana statusu usterki',
    component: ChangeStatusOfFaultForm,
  },

];

const routes = [...adminRoutes];
export default routes;
