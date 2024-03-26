import CoverOne from '../../images/cover/road-cover.jpg';
import DOMAIN_NAME from '../../utilities/domainName';
import BarChart from '../general/charts/BarChart';
import { db_Car } from '../../types/db_types';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import CardStat from '../general/CardStat';
import PieChart from '../general/charts/PieChart';
import { useEffect, useState } from 'react';
import Loader from '../../common/Loader/Loader';
import { stats_CarDistanceByUsers, stats_CarDistanceInYear, stats_CarDistanceToPlaces, stats_CarFavouritePlace, stats_CarFavouriteUser, stats_CarFuelUsageInYear, stats_CarTotalStats, stats_CarTotalStatsInYear, stats_oneMonthSchema, stats_oneMonthSchemaByUsers, stats_oneMonthSchemaFuelUsage, stats_oneMonthSchemaToPlaces } from '../../types/car_stats';
import UnknownCarImg from '../../images/cars/unknown_car_1280_720.png'
import BarChart2 from '../general/charts/BarChart2';
import { dateFormatter } from '../../utilities/dateFormatter';
import formatDate from '../../utilities/formatDate';



type CarPageProps = {
  carData: db_Car;

  totalData: stats_CarTotalStats,
  distanceYearData: stats_CarDistanceInYear,
  totalYearData: stats_CarTotalStatsInYear,
  distancePlacesData: stats_CarDistanceToPlaces,
  distanceUsersData: stats_CarDistanceByUsers,
  distanceFuelUsageYearData: stats_CarFuelUsageInYear,
  favouriteUserInYearData: stats_CarFavouriteUser,
  favouritePlaceInYearData: stats_CarFavouritePlace,

  filterValue: number,
  setFilterValue: Function;
}

const CarPage = (props: CarPageProps) => {



  const { auth } = useAuth();


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.carData && props.totalData && props.distanceYearData && props.totalYearData && props.distancePlacesData && props.distanceUsersData && props.distanceFuelUsageYearData && props.favouriteUserInYearData && props.favouritePlaceInYearData) {
      setTimeout(() => {
      setLoading(false);
      }, 500);
    }
  }, [props]);

  return (
    <>
      {loading ?
        <Loader />
      :
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
          <div className="relative z-30 mx-auto -mt-22 w-full rounded-3xl bg-white/20 p-1 backdrop-blur sm:p-3 max-w-[300px] overflow-hidden">
            <div className="relative drop-shadow-2 h-full w-full rounded-3xl overflow-hidden">
              <img className="h-full w-full" src={`${DOMAIN_NAME}${props.carData.imgPath}` || UnknownCarImg} alt="Zdjęcie samochodu"/>

              {auth.userRole === 'admin' ?
              <Link
                to={`/samochody/edycja/${props.carData.id}`}
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
              {`${props.carData.brand} ${props.carData.model}`}
            </h3>
            <p className="font-medium">{props.carData.type === 'truck' ? 'Auto ciężarowe' : props.carData.type === 'bus' ? 'Auto dostawcze (bus)' : props.carData.type === 'passengerCar' ? 'Auto osobowe' : '#ERROR#'}</p>
            {props.carData.availabilityStatus === 'available' ? <p className="inline-block rounded-full bg-success bg-opacity-10 py-1 px-3 mt-2 font-bold text-success cursor-default">Dostępny</p> : ''}
            {props.carData.availabilityStatus === 'rented' ? <p className="inline-block rounded-full bg-warning bg-opacity-10 py-1 px-3 mt-2 font-bold text-warning cursor-default">Wypożyczony</p> : ''}
            {props.carData.availabilityStatus === 'notAvailable' ? <p className="inline-block rounded-full bg-danger bg-opacity-10 py-1 px-3 mt-2 font-bold text-danger cursor-default">Niedostępny</p> : ''}
            {props.carData.availabilityStatus === 'banned' ? <p className="inline-block rounded-full bg-danger bg-opacity-10 py-1 px-3 mt-2 font-bold text-danger cursor-default">Zbanowany</p> : ''}
            {props.carData.availabilityStatus === 'onService' ? <p className="inline-block rounded-full bg-danger bg-opacity-10 py-1 px-3 mt-2 font-bold text-danger cursor-default">W serwisie</p> : ''}
            {props.carData.availabilityStatus === 'damaged' ? <p className="inline-block rounded-full bg-danger bg-opacity-10 py-1 px-3 mt-2 font-bold text-danger cursor-default">Uszkodzony</p> : ''}
            
            {auth.userRole === 'admin' &&
            <div className="flex justify-center my-6">
            <Link
              to={`/samochody/edycja/${props.carData.id}`}
              className=" rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70"
            >
              Edytuj dane samochodu
            </Link>
            </div>
            }



              <div className="mx-auto mt-4.5 mb-5.5 md:max-w-[90%] rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <h4 className="text-sm sm:text-lg md:text-xl text-black dark:text-white pl-4 text-left">Podstawowe dane dotyczące samochodu:</h4>
              <div className="flex flex-col sm:flex-row items-center justify-center px-4 pb-5 py-5 md:py-8">
                <div className="w-full sm:w-1/2 text-left sm:p-1">
                <p className='text-xs sm:text-base md:text-md text-black dark:text-white'><strong>Numer rejestracyjny:&nbsp;</strong>{props.carData.plateNumber}</p>
                <p className='text-xs sm:text-base md:text-md text-black dark:text-white'><strong>Maksymalna ładowność:&nbsp;</strong>{props.carData.loadCapacity} kg</p>
                <p className='text-xs sm:text-base md:text-md text-black dark:text-white'><strong>Pojemność zbiornika:&nbsp;</strong>{props.carData.loadCapacity} l</p>
                <p className='text-xs sm:text-base md:text-md text-black dark:text-white'><strong>Data następnego przeglądu:&nbsp;</strong>{formatDate(new Date(props.carData.nextInspectionDate))}</p>
                <p className='text-xs sm:text-base md:text-md text-black dark:text-white'><strong>Utworzono w bazie danych:&nbsp;</strong>{dateFormatter(props.carData.createdAt.toString())}</p>
                
                </div>

                <div className="w-full sm:w-1/2 text-left sm:p-1">

                <p className='text-xs sm:text-base md:text-md text-black dark:text-white'><strong>Typ paliwa:&nbsp;</strong>{props.carData.fuelType === 'diesel' ? 'Diesel' : props.carData.fuelType === 'petrol' ? 'Benzyna' : '#ERROR#'}</p>
                <p className='text-xs sm:text-base md:text-md text-black dark:text-white'><strong>Karta paliwowa:&nbsp;</strong>{props.carData.hasFuelCard === true ? 'Tak' : props.carData.hasFuelCard === false ? 'Nie' : '#ERROR#'}</p>
                <p className='text-xs sm:text-base md:text-md text-black dark:text-white'><strong>Pin do karty paliwowej:&nbsp;</strong>{!props.carData.fuelCardPIN ? 'Brak' : props.carData.fuelCardPIN}</p>
                
                <p className='text-xs sm:text-base md:text-md text-black dark:text-white'><strong>Data zapłaty za OC/AC:&nbsp;</strong>{formatDate(new Date(props.carData.nextInsuranceDate))}</p>
                <p className='text-xs sm:text-base md:text-md text-black dark:text-white'><strong>Ostatnia edycja w bazie danych:&nbsp;</strong>{dateFormatter(props.carData.createdAt.toString())}</p>

                </div>
              </div>
              </div>


            
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
                {props.totalData.total_refuelings}
                </span>
                <span className="text-sm">Tankowań samochodów</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row py-5">
                <span className="font-semibold text-black dark:text-white">
                {props.totalData.total_faults}
                </span>
                <span className="text-sm">Zgłoszonych usterek</span>
              </div>
            </div>


            

          <div className="my-5 md:my-10 md:mx-2">

         
          <BarChart title={'Przejechany dystans ogólnie'} data={props.distanceYearData.distance.map((obj: stats_oneMonthSchema) => obj.total_distance)} categories={['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']} filterBy={'year'} filterValue={props.filterValue} setFilterValue={(value: number) => {props.setFilterValue(value)}}/>
          </div>




          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 md:mx-2">
            <CardStat
            svg={
            <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 640 512"><path d="M171.3 96H224v96H111.3l30.4-75.9C146.5 104 158.2 96 171.3 96zM272 192V96h81.2c9.7 0 18.9 4.4 25 12l67.2 84H272zm256.2 1L428.2 68c-18.2-22.8-45.8-36-75-36H171.3c-39.3 0-74.6 23.9-89.1 60.3L40.6 196.4C16.8 205.8 0 228.9 0 256V368c0 17.7 14.3 32 32 32H65.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H385.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H608c17.7 0 32-14.3 32-32V320c0-65.2-48.8-119-111.8-127zM434.7 368a48 48 0 1 1 90.5 32 48 48 0 1 1 -90.5-32zM160 336a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
            }
            value={`${props.totalYearData.data.total_distance.currentYear} km`}
            value_wrap={false}
            title={`Przejechany dystans w ${props.totalYearData.year} roku`}
            showProgress={true}
            progressValue={`${props.totalYearData.data.total_distance.currentYear - props.totalYearData.data.total_distance.previousYear} km`}
            isProgressPositive={props.totalYearData.data.total_distance.currentYear - props.totalYearData.data.total_distance.previousYear >= 0}

            />

            

            <CardStat
            svg={
            <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 512 512"><path d="M32 64C32 28.7 60.7 0 96 0H256c35.3 0 64 28.7 64 64V256h8c48.6 0 88 39.4 88 88v32c0 13.3 10.7 24 24 24s24-10.7 24-24V222c-27.6-7.1-48-32.2-48-62V96L384 64c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l77.3 77.3c12 12 18.7 28.3 18.7 45.3V168v24 32V376c0 39.8-32.2 72-72 72s-72-32.2-72-72V344c0-22.1-17.9-40-40-40h-8V448c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32V64zM96 80v96c0 8.8 7.2 16 16 16H240c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16H112c-8.8 0-16 7.2-16 16z"/></svg>
            }
            value={`${props.totalYearData.data.total_number_of_refueled_liters.currentYear}`}
            value_wrap={false}
            title={`Zatankowane litry paliwa w ${props.totalYearData.year} roku`}
            showProgress={props.totalYearData.data.total_number_of_refueled_liters.previousYear !== 0}
            progressValue={`${((props.totalYearData.data.total_number_of_refueled_liters.currentYear - props.totalYearData.data.total_number_of_refueled_liters.previousYear) / props.totalYearData.data.total_number_of_refueled_liters.previousYear * 100).toFixed(2)}%`}
            isProgressPositive={((props.totalYearData.data.total_number_of_refueled_liters.currentYear - props.totalYearData.data.total_number_of_refueled_liters.previousYear) / props.totalYearData.data.total_number_of_refueled_liters.previousYear * 100) >= 0}
            />


            <CardStat
            svg={
            <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 512 512"><path d="M320 96H192L144.6 24.9C137.5 14.2 145.1 0 157.9 0H354.1c12.8 0 20.4 14.2 13.3 24.9L320 96zM192 128H320c3.8 2.5 8.1 5.3 13 8.4C389.7 172.7 512 250.9 512 416c0 53-43 96-96 96H96c-53 0-96-43-96-96C0 250.9 122.3 172.7 179 136.4l0 0 0 0c4.8-3.1 9.2-5.9 13-8.4zm84 88c0-11-9-20-20-20s-20 9-20 20v14c-7.6 1.7-15.2 4.4-22.2 8.5c-13.9 8.3-25.9 22.8-25.8 43.9c.1 20.3 12 33.1 24.7 40.7c11 6.6 24.7 10.8 35.6 14l1.7 .5c12.6 3.8 21.8 6.8 28 10.7c5.1 3.2 5.8 5.4 5.9 8.2c.1 5-1.8 8-5.9 10.5c-5 3.1-12.9 5-21.4 4.7c-11.1-.4-21.5-3.9-35.1-8.5c-2.3-.8-4.7-1.6-7.2-2.4c-10.5-3.5-21.8 2.2-25.3 12.6s2.2 21.8 12.6 25.3c1.9 .6 4 1.3 6.1 2.1l0 0 0 0c8.3 2.9 17.9 6.2 28.2 8.4V424c0 11 9 20 20 20s20-9 20-20V410.2c8-1.7 16-4.5 23.2-9c14.3-8.9 25.1-24.1 24.8-45c-.3-20.3-11.7-33.4-24.6-41.6c-11.5-7.2-25.9-11.6-37.1-15l0 0-.7-.2c-12.8-3.9-21.9-6.7-28.3-10.5c-5.2-3.1-5.3-4.9-5.3-6.7c0-3.7 1.4-6.5 6.2-9.3c5.4-3.2 13.6-5.1 21.5-5c9.6 .1 20.2 2.2 31.2 5.2c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-6.5-1.7-13.7-3.4-21.1-4.7V216z"/></svg>
            }
            value={`${props.totalYearData.data.total_costBrutto_of_fuel.currentYear} zł`}
            value_wrap={true}
            title={`Wydane pieniądze na paliwo w ${props.totalYearData.year} roku`}
            showProgress={props.totalYearData.data.total_costBrutto_of_fuel.previousYear !== 0}
            progressValue={`${((props.totalYearData.data.total_costBrutto_of_fuel.currentYear - props.totalYearData.data.total_costBrutto_of_fuel.previousYear) / props.totalYearData.data.total_costBrutto_of_fuel.previousYear * 100).toFixed(2)}%`}
            isProgressPositive={((props.totalYearData.data.total_costBrutto_of_fuel.currentYear - props.totalYearData.data.total_costBrutto_of_fuel.previousYear) / props.totalYearData.data.total_costBrutto_of_fuel.previousYear * 100) >= 0}
            />


            <CardStat
            svg={
            <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 512 512"><path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3V88c0-13.3-10.7-24-24-24s-24 10.7-24 24V292.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
            }
            value={`${props.totalYearData.data.averageConsumption.currentYear || 0} l/100km`}
            value_wrap={true}
            title={`Średnie spalanie w ${props.totalYearData.year} roku`}
            showProgress={props.totalYearData.data.averageConsumption.previousYear !== 0 && props.totalYearData.data.averageConsumption.previousYear !== null}
            progressValue={`${(((props.totalYearData.data.averageConsumption.currentYear || 0) - (props.totalYearData.data.averageConsumption.previousYear || 0)) / (props.totalYearData.data.averageConsumption.previousYear || 0) * 100).toFixed(2)}%`}
            isProgressPositive={(((props.totalYearData.data.averageConsumption.currentYear || 0) - (props.totalYearData.data.averageConsumption.previousYear || 0)) / (props.totalYearData.data.averageConsumption.previousYear || 0) * 100) >= 0}

            />


            
            <CardStat
            svg={
            <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 512 512"><path d="M176 56V96H336V56c0-4.4-3.6-8-8-8H184c-4.4 0-8 3.6-8 8zM128 96V56c0-30.9 25.1-56 56-56H328c30.9 0 56 25.1 56 56V96v32V480H128V128 96zM64 96H96V480H64c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64zM448 480H416V96h32c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64z"/></svg>
            }
            value={`${props.totalYearData.data.total_rentals.currentYear}`}
            value_wrap={false}
            title={`Podróży w ${props.totalYearData.year} roku`}
            showProgress={props.totalYearData.data.total_rentals.previousYear !== 0}
            progressValue={`${((props.totalYearData.data.total_rentals.currentYear - props.totalYearData.data.total_rentals.previousYear) / props.totalYearData.data.total_rentals.previousYear * 100).toFixed(2)}%`}
            isProgressPositive={((props.totalYearData.data.total_rentals.currentYear - props.totalYearData.data.total_rentals.previousYear) / props.totalYearData.data.total_rentals.previousYear * 100) >= 0}

            />


          <CardStat
            svg={
            <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 512 512"><path d="M96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zM208 288h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H144c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zM496 192c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V336z"/></svg>
            }
            value={`${props.totalYearData.data.total_reservations.currentYear}`}
            value_wrap={false}
            title={`Rezerwacji w ${props.totalYearData.year} roku`}
            showProgress={props.totalYearData.data.total_reservations.previousYear !== 0}
            progressValue={`${((props.totalYearData.data.total_reservations.currentYear - props.totalYearData.data.total_reservations.previousYear) / props.totalYearData.data.total_reservations.previousYear * 100).toFixed(2)}%`}
            isProgressPositive={((props.totalYearData.data.total_reservations.currentYear - props.totalYearData.data.total_reservations.previousYear) / props.totalYearData.data.total_reservations.previousYear * 100) >= 0}

            />

            <CardStat
            svg={
            <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 512 512"><path d="M32 64C32 28.7 60.7 0 96 0H256c35.3 0 64 28.7 64 64V256h8c48.6 0 88 39.4 88 88v32c0 13.3 10.7 24 24 24s24-10.7 24-24V222c-27.6-7.1-48-32.2-48-62V96L384 64c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l77.3 77.3c12 12 18.7 28.3 18.7 45.3V168v24 32V376c0 39.8-32.2 72-72 72s-72-32.2-72-72V344c0-22.1-17.9-40-40-40h-8V448c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32V64zM96 80v96c0 8.8 7.2 16 16 16H240c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16H112c-8.8 0-16 7.2-16 16z"/></svg>
            }
            value={`${props.totalYearData.data.total_refuelings.currentYear}`}
            value_wrap={false}
            title={`Tankowań w ${props.totalYearData.year} roku`}
            showProgress={props.totalYearData.data.total_refuelings.previousYear !== 0}
            progressValue={`${((props.totalYearData.data.total_refuelings.currentYear - props.totalYearData.data.total_refuelings.previousYear) / props.totalYearData.data.total_refuelings.previousYear * 100).toFixed(2)}%`}
            isProgressPositive={((props.totalYearData.data.total_refuelings.currentYear - props.totalYearData.data.total_refuelings.previousYear) / props.totalYearData.data.total_refuelings.previousYear * 100) >= 0}

            />

            <CardStat
            svg={
            <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 640 512"><path d="M176 8c-6.6 0-12.4 4-14.9 10.1l-29.4 74L55.6 68.9c-6.3-1.9-13.1 .2-17.2 5.3s-4.6 12.2-1.4 17.9l39.5 69.1L10.9 206.4c-5.4 3.7-8 10.3-6.5 16.7s6.7 11.2 13.1 12.2l78.7 12.2L90.6 327c-.5 6.5 3.1 12.7 9 15.5s12.9 1.8 17.8-2.6l35.3-32.5 9.5-35.4 10.4-38.6c8-29.9 30.5-52.1 57.9-60.9l41-59.2c11.3-16.3 26.4-28.9 43.5-37.2c-.4-.6-.8-1.2-1.3-1.8c-4.1-5.1-10.9-7.2-17.2-5.3L220.3 92.1l-29.4-74C188.4 12 182.6 8 176 8zM367.7 161.5l135.6 36.3c6.5 1.8 11.3 7.4 11.8 14.2l4.6 56.5-201.5-54 32.2-46.6c3.8-5.6 10.8-8.1 17.3-6.4zm-69.9-30l-47.9 69.3c-21.6 3-40.3 18.6-46.3 41l-10.4 38.6-16.6 61.8-8.3 30.9c-4.6 17.1 5.6 34.6 22.6 39.2l15.5 4.1c17.1 4.6 34.6-5.6 39.2-22.6l8.3-30.9 247.3 66.3-8.3 30.9c-4.6 17.1 5.6 34.6 22.6 39.2l15.5 4.1c17.1 4.6 34.6-5.6 39.2-22.6l8.3-30.9L595 388l10.4-38.6c6-22.4-2.5-45.2-19.6-58.7l-6.8-84c-2.7-33.7-26.4-62-59-70.8L384.2 99.7c-32.7-8.8-67.3 4-86.5 31.8zm-17 131a24 24 0 1 1 -12.4 46.4 24 24 0 1 1 12.4-46.4zm217.9 83.2A24 24 0 1 1 545 358.1a24 24 0 1 1 -46.4-12.4z"/></svg>
            }
            value={`${props.totalYearData.data.total_faults.currentYear}`}
            value_wrap={false}
            title={`Zgłoszonych usterek w ${props.totalYearData.year} roku`}
            showProgress={props.totalYearData.data.total_faults.previousYear !== 0}
            progressValue={`${((props.totalYearData.data.total_faults.currentYear - props.totalYearData.data.total_faults.previousYear) / props.totalYearData.data.total_faults.previousYear * 100).toFixed(2)}%`}
            isProgressPositive={((props.totalYearData.data.total_faults.currentYear - props.totalYearData.data.total_faults.previousYear) / props.totalYearData.data.total_faults.previousYear * 100) >= 0}

            />
            

          </div>




          <div className="my-5 md:my-10 md:mx-2 grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">

            <div className='col-span-12 xl:col-span-7'>
              <BarChart2
              title={`Średnie spalanie [l/100km] w bieżącym roku oraz w roku porzednim`}
              categories={['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru']}
              label1={`Rok ${props.distanceFuelUsageYearData.year}`}
              label2={`Rok ${props.distanceFuelUsageYearData.year - 1}`}
              data1={props.distanceFuelUsageYearData.response.map((obj: stats_oneMonthSchemaFuelUsage) => obj.average_fuelusage_current_year || 0)}
              data2={props.distanceFuelUsageYearData.response.map((obj: stats_oneMonthSchemaFuelUsage) => obj.average_fuelusage_previous_year || 0)}

              />
            </div>

            <div className='col-span-12 xl:col-span-5'>
                <PieChart
                title={'Top 10 projektów według przejechanego dystansu'}
                data = {
                  props.distancePlacesData.response && props.distancePlacesData.response.length > 0 ?
                  props.distancePlacesData.response
                  .filter((obj: stats_oneMonthSchemaToPlaces) => obj.total_distance > 0)
                  .map((obj: stats_oneMonthSchemaToPlaces) => ({name: obj.placeData.projectCode, value: obj.total_distance, color: obj.random_color}))
                  .slice(0, 10) //limit to the first 10 elements
                  :
                  []
                }
                />
            </div>

          </div>







          <div className='flex flex-col lg:flex-row gap-4 md:gap-62xl:gap-7.5 md:mx-2'>


          <div className='lg:w-1/2'>
              <PieChart
              title={'Top 6 użytkowników według przejechanego dystansu'}
              data = {
                props.distanceUsersData.response && props.distanceUsersData.response.length > 0 ?
                props.distanceUsersData.response
                .filter((obj: stats_oneMonthSchemaByUsers) => obj.total_distance > 0)
                .map((obj: stats_oneMonthSchemaByUsers) => ({name: `${obj.userData.name} ${obj.userData.surname}`, value: obj.total_distance, color: obj.random_color}))
                .slice(0, 6) //limit to the first 6 elements
                :
                []
              }
              />
          </div>


          <div className="lg:w-1/2 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
            {props.favouriteUserInYearData.response !== null &&
            <CardStat
            svg={
            <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 512 512"><path d="M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>
            }
            value={`${props.favouriteUserInYearData.response?.userData?.name} ${props.favouriteUserInYearData.response?.userData?.surname}`}
            value_wrap={true}
            title={`Użytkownik, który przejechał największy dystans tym autem w ${props.favouriteUserInYearData.year} roku`}
            showProgress={false}
            />
            }

            {props.favouriteUserInYearData.response !== null &&
            <CardStat
            svg={
            <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256V448c0 35.3 28.7 64 64 64h42.8c-6.6-5.9-10.8-14.4-10.8-24V376c0-20.8 11.3-38.9 28.1-48.6l21-64.7c7.5-23.1 29-38.7 53.3-38.7H313.6c24.3 0 45.8 15.6 53.3 38.7l21 64.7c16.8 9.7 28.2 27.8 28.2 48.6V488c0 9.6-4.2 18.1-10.8 24H448c35.3 0 64-28.7 64-64V256C512 114.6 397.4 0 256 0zM362.8 512c-6.6-5.9-10.8-14.4-10.8-24V448H160v40c0 9.6-4.2 18.1-10.8 24H362.8zM190.8 277.5L177 320H335l-13.8-42.5c-1.1-3.3-4.1-5.5-7.6-5.5H198.4c-3.5 0-6.5 2.2-7.6 5.5zM168 408a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm200-24a24 24 0 1 0 -48 0 24 24 0 1 0 48 0z"/></svg>
            }
            value={`${props.favouriteUserInYearData.response?.total_distance} km`}
            value_wrap={false}
            title={`Dystans przejechany tym autem przez ${props.favouriteUserInYearData.response?.userData?.name} ${props.favouriteUserInYearData.response?.userData?.surname} w ${props.favouriteUserInYearData.year} roku`}
            showProgress={false}
            />
            }
            

            {props.favouritePlaceInYearData.response !== null &&
            <CardStat
            svg={
            <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 576 512"><path d="M0 80C0 53.5 21.5 32 48 32h96c26.5 0 48 21.5 48 48V96H384V80c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H432c-26.5 0-48-21.5-48-48V160H192v16c0 1.7-.1 3.4-.3 5L272 288h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H272c-26.5 0-48-21.5-48-48V336c0-1.7 .1-3.4 .3-5L144 224H48c-26.5 0-48-21.5-48-48V80z"/></svg>
            }
            value={`${props.favouritePlaceInYearData.response?.placeData?.projectCode}`}
            value_wrap={false}
            title={`Projekt, na który samochód przejechał największy dystans w ${props.favouritePlaceInYearData.year} roku`}
            showProgress={false}
            />
            }

            {props.favouritePlaceInYearData.response !== null &&
            <CardStat
            svg={
            <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 640 512"><path d="M112 0C85.5 0 64 21.5 64 48V96H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 272c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 48c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 240c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 208c8.8 0 16 7.2 16 16s-7.2 16-16 16H64V416c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zM544 237.3V256H416V160h50.7L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z"/></svg>
            }
            value={`${props.favouritePlaceInYearData.response?.total_distance} km`}
            value_wrap={false}
            title={`Dystans przejechany przez to auto na rzecz projektu ${props.favouritePlaceInYearData.response?.placeData?.projectCode} w ${props.favouritePlaceInYearData.year} roku`}
            showProgress={false}
            />
            }

          </div>


          </div>







          <div className="my-5 md:my-10 md:mx-2">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
              <CardStat
              svg={
              <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 640 512"><path d="M171.3 96H224v96H111.3l30.4-75.9C146.5 104 158.2 96 171.3 96zM272 192V96h81.2c9.7 0 18.9 4.4 25 12l67.2 84H272zm256.2 1L428.2 68c-18.2-22.8-45.8-36-75-36H171.3c-39.3 0-74.6 23.9-89.1 60.3L40.6 196.4C16.8 205.8 0 228.9 0 256V368c0 17.7 14.3 32 32 32H65.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H385.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H608c17.7 0 32-14.3 32-32V320c0-65.2-48.8-119-111.8-127zM434.7 368a48 48 0 1 1 90.5 32 48 48 0 1 1 -90.5-32zM160 336a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
              }
              value={`${props.totalData.total_distance} km`}
              value_wrap={false}
              title={`Przejechany dystans łącznie`}
              showProgress={false}

              />

              

              <CardStat
              svg={
                <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 512 512"><path d="M32 64C32 28.7 60.7 0 96 0H256c35.3 0 64 28.7 64 64V256h8c48.6 0 88 39.4 88 88v32c0 13.3 10.7 24 24 24s24-10.7 24-24V222c-27.6-7.1-48-32.2-48-62V96L384 64c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l77.3 77.3c12 12 18.7 28.3 18.7 45.3V168v24 32V376c0 39.8-32.2 72-72 72s-72-32.2-72-72V344c0-22.1-17.9-40-40-40h-8V448c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32V64zM96 80v96c0 8.8 7.2 16 16 16H240c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16H112c-8.8 0-16 7.2-16 16z"/></svg>
              }
              value={`${props.totalData.total_number_of_refueled_liters}`}
              value_wrap={false}
              title={`Zatankowane litry paliwa łącznie`}
              showProgress={false}
              />


              <CardStat
              svg={
                <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 512 512"><path d="M320 96H192L144.6 24.9C137.5 14.2 145.1 0 157.9 0H354.1c12.8 0 20.4 14.2 13.3 24.9L320 96zM192 128H320c3.8 2.5 8.1 5.3 13 8.4C389.7 172.7 512 250.9 512 416c0 53-43 96-96 96H96c-53 0-96-43-96-96C0 250.9 122.3 172.7 179 136.4l0 0 0 0c4.8-3.1 9.2-5.9 13-8.4zm84 88c0-11-9-20-20-20s-20 9-20 20v14c-7.6 1.7-15.2 4.4-22.2 8.5c-13.9 8.3-25.9 22.8-25.8 43.9c.1 20.3 12 33.1 24.7 40.7c11 6.6 24.7 10.8 35.6 14l1.7 .5c12.6 3.8 21.8 6.8 28 10.7c5.1 3.2 5.8 5.4 5.9 8.2c.1 5-1.8 8-5.9 10.5c-5 3.1-12.9 5-21.4 4.7c-11.1-.4-21.5-3.9-35.1-8.5c-2.3-.8-4.7-1.6-7.2-2.4c-10.5-3.5-21.8 2.2-25.3 12.6s2.2 21.8 12.6 25.3c1.9 .6 4 1.3 6.1 2.1l0 0 0 0c8.3 2.9 17.9 6.2 28.2 8.4V424c0 11 9 20 20 20s20-9 20-20V410.2c8-1.7 16-4.5 23.2-9c14.3-8.9 25.1-24.1 24.8-45c-.3-20.3-11.7-33.4-24.6-41.6c-11.5-7.2-25.9-11.6-37.1-15l0 0-.7-.2c-12.8-3.9-21.9-6.7-28.3-10.5c-5.2-3.1-5.3-4.9-5.3-6.7c0-3.7 1.4-6.5 6.2-9.3c5.4-3.2 13.6-5.1 21.5-5c9.6 .1 20.2 2.2 31.2 5.2c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-6.5-1.7-13.7-3.4-21.1-4.7V216z"/></svg>
              }
              value={`${props.totalData.total_costBrutto_of_fuel} zł`}
              value_wrap={true}
              title={`Wydane pieniądze na paliwo łącznie`}
              showProgress={false}
              />


              <CardStat
              svg={
              <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 512 512"><path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3V88c0-13.3-10.7-24-24-24s-24 10.7-24 24V292.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
              }
              value={`${props.totalData.averageConsumption || 0} l/100km`}
              value_wrap={true}
              title={`Średnie spalanie łącznie`}
              showProgress={false}

              />

            </div>
          </div>







          </div>
        </div>
      </div>
      </div>
      }
    </>
  
      
      
  );
};

export default CarPage;
