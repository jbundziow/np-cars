import { lazy } from 'react';




const AddCar = lazy(() => import('../new_pages/samochody/dodaj'));
const EditCar = lazy(() => import('../new_pages/samochody/edycja'));
const AddPlace = lazy(() => import('../new_pages/projekty/dodaj'));
const EditPlace = lazy(() => import('../new_pages/projekty/edycja'));
const RentalsConfirm = lazy(() => import('../new_pages/potwierdzenia/wypozyczenia'));
const RefuelingsConfirm = lazy(() => import('../new_pages/potwierdzenia/tankowania'));
const RefuelingsRefund = lazy(() => import('../new_pages/potwierdzenia/tankowania-zwrot-pieniedzy'));
const FaultsConfirm = lazy(() => import('../new_pages/potwierdzenia/usterki'));
const NewUsersConfirm = lazy(() => import('../new_pages/potwierdzenia/nowi-uzytkownicy'));
const RentalsGapes = lazy(() => import('../new_pages/potwierdzenia/uzupelnianie-wypozyczen'));
const EditReservationForm = lazy(() => import('../new_pages/rezerwacje/edycja'));
const EditRefuelingForm = lazy(() => import('../new_pages/tankowania/edycja'));
const EditFaultForm = lazy(() => import('../new_pages/usterki/edycja'));
const MakeARentalAdminForm = lazy(() => import('../new_pages/wypozyczenia/wypozycz-samochod-admin-form'));
const EditRentalAdminForm = lazy(() => import('../new_pages/wypozyczenia/edycja'));




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
