import { lazy } from 'react';




const AddCar = lazy(() => import('../pages/samochody/dodaj'));
const EditCar = lazy(() => import('../pages/samochody/edycja'));
const AddPlace = lazy(() => import('../pages/projekty/dodaj'));
const EditPlace = lazy(() => import('../pages/projekty/edycja'));
const RentalsConfirm = lazy(() => import('../pages/potwierdzenia/wypozyczenia'));
const RefuelingsConfirm = lazy(() => import('../pages/potwierdzenia/tankowania'));
const RefuelingsRefund = lazy(() => import('../pages/potwierdzenia/tankowania-zwrot-pieniedzy'));
const FaultsConfirm = lazy(() => import('../pages/potwierdzenia/usterki'));
const NewUsersConfirm = lazy(() => import('../pages/potwierdzenia/nowi-uzytkownicy'));
const RentalsGapes = lazy(() => import('../pages/potwierdzenia/uzupelnianie-wypozyczen'));
const EditReservationForm = lazy(() => import('../pages/rezerwacje/edycja'));
const EditRefuelingForm = lazy(() => import('../pages/tankowania/edycja'));
const EditFaultForm = lazy(() => import('../pages/usterki/edycja'));
const MakeARentalAdminForm = lazy(() => import('../pages/wypozyczenia/wypozycz-samochod-admin-form'));
const EditRentalAdminForm = lazy(() => import('../pages/wypozyczenia/edycja'));




const adminRoutes = [


  

  //potwierdzenia
  {
    path: '/potwierdzenia/wypozyczenia',
    title: 'Potwierdzanie wypożyczeń',
    component: RentalsConfirm,
  },
  {
    path: '/potwierdzenia/tankowania',
    title: 'Potwierdzanie tankowań',
    component: RefuelingsConfirm,
  },
  {
    path: '/potwierdzenia/tankowania/zwrot-pieniedzy',
    title: 'Zwroty pieniędzy za tankowania',
    component: RefuelingsRefund,
  },
  {
    path: '/potwierdzenia/usterki',
    title: 'Potwierdzanie usterek',
    component: FaultsConfirm,
  },
  {
    path: '/potwierdzenia/nowi-uzytkownicy',
    title: 'Potwierdzanie nowych użytkowników',
    component: NewUsersConfirm,
  },
  {
    path: '/potwierdzenia/uzupelnianie-wypozyczen',
    title: 'Uzupełnianie wypożyczeń',
    component: RentalsGapes,
  },



  //wypozyczenia
  {
    path: '/wypozyczenia/wypozycz-samochod-admin',
    title: 'Wypożycz samochód jako admin',
    component: MakeARentalAdminForm,
  },
  {
    path: '/wypozyczenia/edycja/:rentalid',
    title: 'Edycja wypożyczenia',
    component: EditRentalAdminForm,
  },

  

  
  //rezerwacje
  {
    path: '/rezerwacje/edycja/:reservationid',
    title: 'Edycja rezerwacji',
    component: EditReservationForm,
  },


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


  //samochody
  {
    path: '/samochody/dodaj',
    title: 'Dodaj nowy samochód',
    component: AddCar,
  },
  {
    path: '/samochody/edycja/:carid',
    title: 'Edycja samochodu',
    component: EditCar,
  },



  //projekty
  {
    path: '/projekty/dodaj',
    title: 'Dodaj nowy projekt',
    component: AddPlace,
  },
  {
    path: '/projekty/edycja/:placeid',
    title: 'Edycja projektu',
    component: EditPlace,
  },

];

const routes = [...adminRoutes];
export default routes;
