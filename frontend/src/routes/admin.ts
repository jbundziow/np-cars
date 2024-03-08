import { lazy } from 'react';




const AddCar = lazy(() => import('../new_pages/samochody/dodaj'));
const AddPlace = lazy(() => import('../new_pages/projekty/dodaj'));
const EditPlace = lazy(() => import('../new_pages/projekty/edycja'));
const RentalsConfirm = lazy(() => import('../new_pages/potwierdzenia/wypozyczenia'));
const RefuelingsConfirm = lazy(() => import('../new_pages/potwierdzenia/tankowania'));
const FaultsConfirm = lazy(() => import('../new_pages/potwierdzenia/usterki'));
const NewUsersConfirm = lazy(() => import('../new_pages/potwierdzenia/nowi-uzytkownicy'));
const RentalsGapes = lazy(() => import('../new_pages/potwierdzenia/uzupelnianie-wypozyczen'));
const EditReservationForm = lazy(() => import('../new_pages/rezerwacje/edycja'));
const EditRefuelingForm = lazy(() => import('../new_pages/tankowania/edycja'));
const EditFaultForm = lazy(() => import('../new_pages/usterki/edycja'));




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
