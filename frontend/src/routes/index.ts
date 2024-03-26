import { lazy } from 'react';





const FutureReservations = lazy(() => import('../pages/rezerwacje/przyszle-rezerwacje'));
const RentalsArchive = lazy(() => import('../pages/wypozyczenia/archiwum'));
const ReservationsOverview = lazy(() => import('../pages/rezerwacje/index'));
const MakeAReservation = lazy(() => import('../pages/rezerwacje/dokonaj-rezerwacji'));
const MakeAReservationForm = lazy(() => import('../pages/rezerwacje/dokonaj-rezerwacji-form'));
const MyReservations = lazy(() => import('../pages/rezerwacje/moje-rezerwacje'));
const ReservationArchive = lazy(() => import('../pages/rezerwacje/archiwum'));
const RefuelingOverview = lazy(() => import('../pages/tankowania/index'));
const ReportRefueling = lazy(() => import('../pages/tankowania/zglos-tankowanie'));
const ReportRefuelingForm = lazy(() => import('../pages/tankowania/zglos-tankowanie-form'));
const RefuelingFuelCards = lazy(() => import('../pages/tankowania/karty-paliwowe'));
const MyRefuelings = lazy(() => import('../pages/tankowania/moje-tankowania'));
const RefuelingArchive = lazy(() => import('../pages/tankowania/archiwum'));
const RepairsStatus = lazy(() => import('../pages/usterki/status-napraw'));
const RepairsStatusDetails = lazy(() => import('../pages/usterki/status-napraw-details'));
const FaultDetails = lazy(() => import('../pages/usterki/status-usterki'));
const MyFaults = lazy(() => import('../pages/usterki/moje-usterki'));
const ReportFault = lazy(() => import('../pages/usterki/zglos'));
const ReportFaultForm = lazy(() => import('../pages/usterki/zglos-form'));
const RentACar = lazy(() => import('../pages/wypozyczenia/wypozycz-samochod'));
const RentACarForm = lazy(() => import('../pages/wypozyczenia/wypozycz-samochod-form'));
const ReturnACar = lazy(() => import('../pages/wypozyczenia/oddaj-samochod'));
const ReturnACarForm = lazy(() => import('../pages/wypozyczenia/oddaj-samochod-form'));
const ActualRentals = lazy(() => import('../pages/wypozyczenia/biezace-wypozyczenia'));
const UsersList = lazy(() => import('../pages/uzytkownicy/zestawienie'));
const UserMainpage = lazy(() => import('../pages/uzytkownicy/index'));
const UserSettings = lazy(() => import('../pages/uzytkownicy/ustawienia-konta'));
const CarsList = lazy(() => import('../pages/samochody/zestawienie'));
const CarsInspections = lazy(() => import('../pages/samochody/przeglady'));
const CarsInsurances = lazy(() => import('../pages/samochody/ubezpieczenia'));
const CarMainpage = lazy(() => import('../pages/samochody'));
const PlacesList = lazy(() => import('../pages/projekty/zestawienie'));
const PlaceMainpage = lazy(() => import('../pages/projekty'));


const coreRoutes = [
  // wypozyczenia
  {
    path: '/wypozyczenia/wypozycz-samochod',
    title: 'Wypożycz samochód',
    component: RentACar,
  },
  {
    path: '/wypozyczenia/wypozycz-samochod/:carid',
    title: 'Wypożycz samochód',
    component: RentACarForm,
  },
  {
    path: '/wypozyczenia/oddaj-samochod',
    title: 'Oddaj auto',
    component: ReturnACar,
  },
  {
    path: '/wypozyczenia/oddaj-samochod/:rentalid',
    title: 'Oddaj auto',
    component: ReturnACarForm,
  },
  {
    path: '/wypozyczenia/biezace-wypozyczenia',
    title: 'Bieżące wypożyczenia',
    component: ActualRentals,
  },
  {
    path: '/wypozyczenia/archiwum',
    title: 'Archiwum wypożyczeń',
    component: RentalsArchive,
  },


  //rezerwacje
  {
    path: '/rezerwacje',
    title: 'Przegląd rezerwacji',
    component: ReservationsOverview,
  },
  {
    path: '/rezerwacje/dokonaj-rezerwacji',
    title: 'Dokonaj rezerwacji',
    component: MakeAReservation,
  },
  {
    path: '/rezerwacje/dokonaj-rezerwacji/:carid',
    title: 'Dokonaj rezerwacji',
    component: MakeAReservationForm,
  },
  {
    path: '/rezerwacje/moje-rezerwacje',
    title: 'Moje rezerwacje',
    component: MyReservations,
  },
  {
    path: '/rezerwacje/przyszle-rezerwacje',
    title: 'Zestawienie przyszłych rezerwacji',
    component: FutureReservations,
  },
  {
    path: '/rezerwacje/archiwum',
    title: 'Archiwum rezerwacji',
    component: ReservationArchive,
  },


  //tankowania
  {
    path: '/tankowania',
    title: 'Przegląd zatankowanych aut',
    component: RefuelingOverview,
  },
  {
    path: '/tankowania/zglos-tankowanie',
    title: 'Zgłoś tankowanie',
    component: ReportRefueling,
  },
  {
    path: '/tankowania/karty-paliwowe',
    title: 'Karty paliwowe',
    component: RefuelingFuelCards,
  },
  {
    path: '/tankowania/zglos-tankowanie/:carid',
    title: 'Zgłoś zatankowanie samochodu',
    component: ReportRefuelingForm,
  },
  {
    path: '/tankowania/moje-tankowania',
    title: 'Moje tankowania',
    component: MyRefuelings,
  },
  {
    path: '/tankowania/archiwum',
    title: 'Archiwum tankowań',
    component: RefuelingArchive,
  },

  //usterki
  {
    path: '/usterki/zglos',
    title: 'Zgłoś usterkę',
    component: ReportFault,
  },
  {
    path: '/usterki/zglos/:carid',
    title: 'Zgłoś usterkę',
    component: ReportFaultForm,
  },
  {
    path: '/usterki/status-napraw',
    title: 'Status napraw',
    component: RepairsStatus,
  },
  {
    path: '/usterki/status-napraw/:carid',
    title: 'Status napraw',
    component: RepairsStatusDetails,
  },
  {
    path: '/usterki/:faultid',
    title: 'Szczegóły dotyczące usterki',
    component: FaultDetails,
  },
  {
    path: 'usterki/moje-usterki',
    title: 'Usterki zgłoszone przeze mnie',
    component: MyFaults,
  },


  //uzytkownicy
  {
    path: '/uzytkownicy/zestawienie',
    title: 'Lista użytkowników',
    component: UsersList,
  },
  {
    path: '/uzytkownicy/ustawienia-konta/:userid',
    title: 'Ustawienia konta',
    component: UserSettings,
  },
  {
    path: '/uzytkownicy/:userid',
    title: 'Profil użytkownika',
    component: UserMainpage,
  },

  //samochody
  {
    path: '/samochody/zestawienie',
    title: 'Lista samochodów',
    component: CarsList,
  },
  {
    path: '/samochody/przeglady',
    title: 'Terminy przeglądów',
    component: CarsInspections,
  },
  {
    path: '/samochody/ubezpieczenia',
    title: 'Terminy OC/AC',
    component: CarsInsurances,
  },
  {
    path: '/samochody/:carid',
    title: 'Profil samochodu',
    component: CarMainpage,
  },

  //projekty
  {
    path: '/projekty/zestawienie',
    title: 'Lista projektów',
    component: PlacesList,
  },
  {
    path: '/projekty/:placeid',
    title: 'Profil projektu',
    component: PlaceMainpage,
  },

];

const routes = [...coreRoutes];
export default routes;
