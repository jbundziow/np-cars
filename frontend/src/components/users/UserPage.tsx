import CoverOne from '../../images/cover/spawacz-cover.jpg';
import UserMale from '../../images/user/unknownUserMale.jpg';
import UserFemale from '../../images/user/unknownUserFemale.jpg';
import DOMAIN_NAME from '../../utilities/domainName';
import BarChart from '../general/charts/BarChart';
import { db_User } from '../../types/db_types';
import useAuth from '../../hooks/useAuth';
import { stats_UserDistanceInYear, stats_UserDistanceInYearByCarTypes, stats_UserDistanceToPlaces, stats_UserFavouriteCar, stats_UserFavouritePlace, stats_UserTotalStats, stats_UserTotalStatsInYear, stats_oneMonthSchema, stats_oneMonthSchemaByCarTypes, stats_oneMonthSchemaToPlaces } from '../../types/user_stats';
import { Link } from 'react-router-dom';
import CardStat from '../general/CardStat';
import PieChart from '../general/charts/PieChart';
import AreaChart from '../general/charts/AreaChart';



type UserPageProps = {
  userData: db_User;

  totalData: stats_UserTotalStats;
  distanceYearData: stats_UserDistanceInYear,
  totalYearData: stats_UserTotalStatsInYear,
  distancePlacesData: stats_UserDistanceToPlaces,
  distanceCarTypesYearData: stats_UserDistanceInYearByCarTypes,
  favouriteCarInYearData: stats_UserFavouriteCar,
  favouritePlaceInYearData: stats_UserFavouritePlace,

  filterValue: number,
  setFilterValue: Function;
}

const UserPage = (props: UserPageProps) => {

  const { auth } = useAuth();

  return (
  
      
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div>
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />

        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img className="bg-cover bg-top-center rounded-[50%]" src={props.userData.avatarPath !== null ? `${DOMAIN_NAME}${props.userData.avatarPath}` : props.userData.gender === 'female' ? UserFemale : UserMale} alt="Avatar użytkownika"/>

              {Number(auth.userID) === props.userData.id || auth.userRole === 'admin' ?
              <Link
                to={`/uzytkownicy/ustawienia-konta/${props.userData.id}`}
                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
              >
                <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                    fill=""
                  />
                </svg>
              </Link>
              :
              <></>
              }

            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {`${props.userData.name} ${props.userData.surname}`}
            </h3>
            <p className="font-medium">{props.userData.employedAs}</p>
            {props.userData.role === 'admin' ? <p className="inline-block rounded-full bg-success bg-opacity-10 py-1 px-3 mt-2 font-bold text-success cursor-default">Admin</p> : ''}
            {props.userData.role === 'banned' ? <p className="inline-block rounded-full bg-danger bg-opacity-10 py-1 px-3 mt-2 font-bold text-danger cursor-default">Użytkownik zbanowany</p> : ''}
            {props.userData.role === 'unconfirmed' ? <p className="inline-block rounded-full bg-gray bg-opacity-10 py-1 px-3 mt-2 font-bold text-white cursor-default">Użytkownik niepotwierdzony</p> : ''}
            
            {auth.userRole === 'admin' && Number(auth.userID) !== props.userData.id &&
            <div className="flex justify-center my-6">
            <Link
              to={`/uzytkownicy/ustawienia-konta/${props.userData.id}`}
              className=" rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70"
            >
              Edytuj dane użytkownika
            </Link>
            </div>
            }
            
            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-[90%] grid-cols-2 xl:grid-cols-4 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row py-5">
                <span className="font-semibold text-black dark:text-white">
                {props.totalData.total_rentals}
                </span>
                <span className="text-sm">Wypożyczeń samochodów</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row py-5">
                <span className="font-semibold text-black dark:text-white">
                {props.totalData.total_reservations}
                </span>
                <span className="text-sm">Złożonych rezerwacji</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row py-5">
                <span className="font-semibold text-black dark:text-white">
                {props.totalData.total_faults}
                </span>
                <span className="text-sm">Zgłoszonych usterek</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row py-5">
                <span className="font-semibold text-black dark:text-white">
                {props.totalData.total_refuelings}
                </span>
                <span className="text-sm">Tankowań samochodów</span>
              </div>
            </div>

          <div className="my-5 md:my-10 md:mx-2">

         
          <BarChart title={'Przejechany dystans ogólnie'} data={props.distanceYearData.distance.map((obj: stats_oneMonthSchema) => obj.total_distance)} categories={['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']} filterBy={'year'} filterValue={props.filterValue} setFilterValue={(value: number) => {props.setFilterValue(value)}}/>
          </div>


          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            <CardStat
            svg={
            <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 640 512"><path d="M171.3 96H224v96H111.3l30.4-75.9C146.5 104 158.2 96 171.3 96zM272 192V96h81.2c9.7 0 18.9 4.4 25 12l67.2 84H272zm256.2 1L428.2 68c-18.2-22.8-45.8-36-75-36H171.3c-39.3 0-74.6 23.9-89.1 60.3L40.6 196.4C16.8 205.8 0 228.9 0 256V368c0 17.7 14.3 32 32 32H65.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H385.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H608c17.7 0 32-14.3 32-32V320c0-65.2-48.8-119-111.8-127zM434.7 368a48 48 0 1 1 90.5 32 48 48 0 1 1 -90.5-32zM160 336a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
            }
            value={`${props.totalYearData.data.total_distance.currentYear} km`}
            title={`Przejechany dystans w roku ${props.totalYearData.year}`}
            showProgress={true}
            progressValue={`${props.totalYearData.data.total_distance.currentYear - props.totalYearData.data.total_distance.previousYear} km`}
            isProgressPositive={props.totalYearData.data.total_distance.currentYear - props.totalYearData.data.total_distance.previousYear >= 0}

            />

            <CardStat
            svg={
              <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 512 512"><path d="M176 56V96H336V56c0-4.4-3.6-8-8-8H184c-4.4 0-8 3.6-8 8zM128 96V56c0-30.9 25.1-56 56-56H328c30.9 0 56 25.1 56 56V96v32V480H128V128 96zM64 96H96V480H64c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64zM448 480H416V96h32c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64z"/></svg>
            }
            value={`${props.totalYearData.data.total_rentals.currentYear}`}
            title={`Podróży w roku ${props.totalYearData.year}`}
            showProgress={props.totalYearData.data.total_rentals.previousYear !== 0}
            progressValue={`${((props.totalYearData.data.total_rentals.currentYear - props.totalYearData.data.total_rentals.previousYear) / props.totalYearData.data.total_rentals.previousYear * 100).toFixed(2)}%`}
            isProgressPositive={((props.totalYearData.data.total_rentals.currentYear - props.totalYearData.data.total_rentals.previousYear) / props.totalYearData.data.total_rentals.previousYear * 100) >= 0}

            />

            <CardStat
            svg={
              <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 512 512"><path d="M32 64C32 28.7 60.7 0 96 0H256c35.3 0 64 28.7 64 64V256h8c48.6 0 88 39.4 88 88v32c0 13.3 10.7 24 24 24s24-10.7 24-24V222c-27.6-7.1-48-32.2-48-62V96L384 64c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l77.3 77.3c12 12 18.7 28.3 18.7 45.3V168v24 32V376c0 39.8-32.2 72-72 72s-72-32.2-72-72V344c0-22.1-17.9-40-40-40h-8V448c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32V64zM96 80v96c0 8.8 7.2 16 16 16H240c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16H112c-8.8 0-16 7.2-16 16z"/></svg>
            }
            value={`${props.totalYearData.data.total_number_of_refueled_liters.currentYear}`}
            title={`Zatankowane litry paliwa w roku ${props.totalYearData.year}`}
            showProgress={props.totalYearData.data.total_number_of_refueled_liters.previousYear !== 0}
            progressValue={`${((props.totalYearData.data.total_number_of_refueled_liters.currentYear - props.totalYearData.data.total_number_of_refueled_liters.previousYear) / props.totalYearData.data.total_number_of_refueled_liters.previousYear * 100).toFixed(2)}%`}
            isProgressPositive={((props.totalYearData.data.total_number_of_refueled_liters.currentYear - props.totalYearData.data.total_number_of_refueled_liters.previousYear) / props.totalYearData.data.total_number_of_refueled_liters.previousYear * 100) >= 0}
            

            />


          <CardStat
            svg={
              <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 512 512"><path d="M96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zM208 288h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H144c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zM496 192c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V336z"/></svg>
            }
            value={`${props.totalYearData.data.total_reservations.currentYear}`}
            title={`Rezerwacji w roku ${props.totalYearData.year}`}
            showProgress={props.totalYearData.data.total_reservations.previousYear !== 0}
            progressValue={`${((props.totalYearData.data.total_reservations.currentYear - props.totalYearData.data.total_reservations.previousYear) / props.totalYearData.data.total_reservations.previousYear * 100).toFixed(2)}%`}
            isProgressPositive={((props.totalYearData.data.total_reservations.currentYear - props.totalYearData.data.total_reservations.previousYear) / props.totalYearData.data.total_reservations.previousYear * 100) >= 0}

            />
            

          </div>


          <div className="my-5 md:my-10 md:mx-2 grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
          <div className='col-span-12 xl:col-span-5'>
            <PieChart
            title={'Top 10 projektów według przejechanego dystansu'}
            data = {props.distancePlacesData.response
              .filter((obj: stats_oneMonthSchemaToPlaces) => obj.total_distance > 0)
              .map((obj: stats_oneMonthSchemaToPlaces) => ({name: obj.placeData.projectCode, value: obj.total_distance, color: obj.random_color}))
              .slice(0, 10) //limit to the first 6 elements
            }
            />
          </div>
            <div className='col-span-12 xl:col-span-7'>

            <AreaChart
            title={`Najczęściej wykorzystywane typy samochodów w ${props.distanceCarTypesYearData.year} roku`}
            categories={['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru']}
            data_passengerCar={props.distanceCarTypesYearData.distance.map((obj: stats_oneMonthSchemaByCarTypes) => obj.total_distance_passengerCar)}
            data_bus={props.distanceCarTypesYearData.distance.map((obj: stats_oneMonthSchemaByCarTypes) => obj.total_distance_bus_and_truck)}
            
            />
            </div>
          </div>



          </div>
        </div>
      </div>
      </div>
  );
};

export default UserPage;
