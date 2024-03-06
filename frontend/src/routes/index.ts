import { lazy } from 'react';



const FutureReservations = lazy(() => import('../new_pages/rezerwacje/przyszle-rezerwacje'));
const RentalsArchive = lazy(() => import('../new_pages/wypozyczenia/archiwum'));
const ReservationsOverview = lazy(() => import('../new_pages/rezerwacje/index'));
const MakeAReservation = lazy(() => import('../new_pages/rezerwacje/dokonaj-rezerwacji'));
const MakeAReservationForm = lazy(() => import('../new_pages/rezerwacje/dokonaj-rezerwacji-form'));
const MyReservations = lazy(() => import('../new_pages/rezerwacje/moje-rezerwacje'));
const ReservationArchive = lazy(() => import('../new_pages/rezerwacje/archiwum'));
const RefuelingOverview = lazy(() => import('../new_pages/tankowania/index'));
const ReportRefueling = lazy(() => import('../new_pages/tankowania/zglos-tankowanie'));
const ReportRefuelingForm = lazy(() => import('../new_pages/tankowania/zglos-tankowanie-form'));
const MyRefuelings = lazy(() => import('../new_pages/tankowania/moje-tankowania'));
const RefuelingArchive = lazy(() => import('../new_pages/tankowania/archiwum'));
const RepairsStatus = lazy(() => import('../new_pages/usterki/status-napraw'));
const RepairsStatusDetails = lazy(() => import('../new_pages/usterki/status-napraw-details'));
const FaultDetails = lazy(() => import('../new_pages/usterki/status-usterki'));
const MyFaults = lazy(() => import('../new_pages/usterki/moje-usterki'));
const ReportFault = lazy(() => import('../new_pages/usterki/zglos'));
const ReportFaultForm = lazy(() => import('../new_pages/usterki/zglos-form'));
const RentACar = lazy(() => import('../new_pages/wypozyczenia/wypozycz-samochod'));
const RentACarForm = lazy(() => import('../new_pages/wypozyczenia/wypozycz-samochod-form'));
const ReturnACar = lazy(() => import('../new_pages/wypozyczenia/oddaj-samochod'));
const ReturnACarForm = lazy(() => import('../new_pages/wypozyczenia/oddaj-samochod-form'));
const ActualRentals = lazy(() => import('../new_pages/wypozyczenia/biezace-wypozyczenia'));
const UsersList = lazy(() => import('../new_pages/uzytkownicy/zestawienie'));
const UserMainpage = lazy(() => import('../new_pages/uzytkownicy/index'));
const UserSettings = lazy(() => import('../new_pages/uzytkownicy/ustawienia-konta'));
const CarsList = lazy(() => import('../new_pages/samochody/zestawienie'));
const CarsInspections = lazy(() => import('../new_pages/samochody/przeglady'));
const CarsInsurances = lazy(() => import('../new_pages/samochody/ubezpieczenia'));
const PlacesList = lazy(() => import('../new_pages/projekty/zestawienie'));


//TODO: DELETE IT LATER
const ECommerce = lazy(() => import('../pages/Dashboard/ECommerce'));
const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));

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

  //projekty
  {
    path: '/projekty/zestawienie',
    title: 'Lista projektów',
    component: PlacesList,
  },



  //TODO: DELETE IT LATER
  // @@@ TEMPLATE TO DELETE BELOW @@@
  {
    path: '/dashboard',
    title: 'Dashboard',
    component: ECommerce,
  },
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
