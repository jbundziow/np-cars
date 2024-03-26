import CoverOne from '../../images/cover/industry-cover.jpg';
import BarChart from '../general/charts/BarChart';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import CardStat from '../general/CardStat';
import PieChart from '../general/charts/PieChart';
import AreaChart from '../general/charts/AreaChart';
import { db_Place } from '../../types/db_types';
import { stats_DistanceToPlacesByCars, stats_DistanceToPlacesByUsers, stats_PlaceDistanceInYearByCarTypes, stats_PlaceFavouriteCar, stats_PlaceFavouriteUser, stats_PlaceTotalStats, stats_PlaceTotalStatsInYear, stats_PlacesDistanceInYear, stats_oneMonthSchema, stats_oneMonthSchemaByCarTypes, stats_oneMonthSchemaToPlacesByCars, stats_oneMonthSchemaToUsers } from '../../types/places_stats';
import { dateFormatter } from '../../utilities/dateFormatter';
import Loader from '../../common/Loader/Loader';
import { useEffect, useState } from 'react';



type PlacePageProps = {
  placeData: db_Place,

  totalData: stats_PlaceTotalStats,
  distanceYearData: stats_PlacesDistanceInYear,
  totalYearData: stats_PlaceTotalStatsInYear,
  distanceUsersData: stats_DistanceToPlacesByUsers,
  distanceCarsData: stats_DistanceToPlacesByCars,
  distanceCarTypesYearData: stats_PlaceDistanceInYearByCarTypes,
  favouriteUserInYearData: stats_PlaceFavouriteUser,
  favouriteCarInYearData: stats_PlaceFavouriteCar,

  filterValue: number,
  setFilterValue: Function;
}

const PlacePage = (props: PlacePageProps) => {

  const { auth } = useAuth();


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.placeData && props.totalData && props.distanceYearData && props.totalYearData && props.distanceUsersData && props.distanceCarsData && props.distanceCarTypesYearData && props.favouriteUserInYearData && props.favouriteCarInYearData) {
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

          <div className="mt-4">
            <h3 className="mb-1.5 text-4xl font-semibold text-black dark:text-white">
              {props.placeData.projectCode}
            </h3>
            <h4 className="text-black dark:text-white text-xl">{props.placeData.projectName}</h4>
            <h5 className="text-black dark:text-white text-base mb-2">{props.placeData.placeName}</h5>
            {props.placeData.status === 'active' ? <p className="inline-block rounded-full bg-success bg-opacity-10 py-1 px-3 mt-2 font-bold text-success cursor-default">Aktywny</p> : ''}
            {props.placeData.status === 'closed' ? <p className="inline-block rounded-full bg-warning bg-opacity-10 py-1 px-3 mt-2 font-bold text-warning cursor-default">Nieaktywny</p> : ''}
            {props.placeData.status === 'banned' ? <p className="inline-block rounded-full bg-danger bg-opacity-10 py-1 px-3 mt-2 font-bold text-danger cursor-default">Zbanowany</p> : ''}
            
            {auth.userRole === 'admin' &&
            <div className="flex justify-center my-6">
            <Link
              to={`/projekty/edycja/${props.placeData.id}`}
              className=" rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70"
            >
              Edytuj dane projektu
            </Link>
            </div>
            }
            
            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-[90%] grid-cols-2 xl:grid-cols-2 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row py-5">
                <span className="text-xs sm:text-sm xl:mr-4">Projekt utworzono w bazie danych</span>
                <span className="font-semibold text-black dark:text-white text-sm sm:text-base">
                {dateFormatter(props.placeData.createdAt.toString())}
                </span>
                
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row py-5">
                <span className="text-xs sm:text-sm xl:mr-4">Ostatnia edycja projektu w bazie danych</span>
                <span className="font-semibold text-black dark:text-white text-sm sm:text-base">
                {dateFormatter(props.placeData.updatedAt.toString())}
                </span>
                
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
            value_wrap={false}
            title={`Podróży w roku ${props.totalYearData.year}`}
            showProgress={props.totalYearData.data.total_rentals.previousYear !== 0}
            progressValue={`${((props.totalYearData.data.total_rentals.currentYear - props.totalYearData.data.total_rentals.previousYear) / props.totalYearData.data.total_rentals.previousYear * 100).toFixed(2)}%`}
            isProgressPositive={((props.totalYearData.data.total_rentals.currentYear - props.totalYearData.data.total_rentals.previousYear) / props.totalYearData.data.total_rentals.previousYear * 100) >= 0}

            />

            <CardStat
            svg={
              <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 512 512"><path d="M280 24c0-13.3-10.7-24-24-24s-24 10.7-24 24v80c0 13.3 10.7 24 24 24s24-10.7 24-24V24zM185.8 224H326.2c6.8 0 12.8 4.3 15.1 10.6L360.3 288H151.7l19.1-53.4c2.3-6.4 8.3-10.6 15.1-10.6zm-75.3-10.9L82.2 292.4C62.1 300.9 48 320.8 48 344v40 64 32c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V448H384v32c0 17.7 14.3 32 32 32h16c17.7 0 32-14.3 32-32V448 384 344c0-23.2-14.1-43.1-34.2-51.6l-28.3-79.3C390.1 181.3 360 160 326.2 160H185.8c-33.8 0-64 21.3-75.3 53.1zM128 344a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm232 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM39 39c-9.4 9.4-9.4 24.6 0 33.9l48 48c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L73 39c-9.4-9.4-24.6-9.4-33.9 0zm400 0L391 87c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l48-48c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0z"/></svg>
            }
            value={`${props.totalData.total_distance} km`}
            value_wrap={false}
            title={`Przejechany dystans łącznie`}
            showProgress={false}
            />


            <CardStat
            svg={
              <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 512 512"><path d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5v39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9v39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7v-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1H257c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>
            }
            value={`${props.totalData.total_rentals}`}
            value_wrap={false}
            title={`Podróży łącznie`}
            showProgress={false}
            />
            

          </div>


          <div className="my-5 md:my-10 md:mx-2 grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
          <div className='col-span-12 xl:col-span-5'>
            
              <PieChart
              title={'Top 6 użytkowników według przejechanego dystansu'}
              data = {
                props.distanceUsersData.response && props.distanceUsersData.response.length > 0 ?
                props.distanceUsersData.response
                .filter((obj: stats_oneMonthSchemaToUsers) => obj.total_distance > 0)
                .map((obj: stats_oneMonthSchemaToUsers) => ({name: `${obj.userData.name} ${obj.userData.surname}`, value: obj.total_distance, color: obj.random_color}))
                .slice(0, 6) //limit to the first 6 elements
                :
                []
              }
              />
            
          </div>
            <div className='col-span-12 xl:col-span-7'>

              <AreaChart
              title={`Najczęściej wykorzystywane typy samochodów w ${props.distanceCarTypesYearData.year} roku według przejechanego dystansu`}
              categories={['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru']}
              label1={'Samochody osobowe'}
              label2={'Samochody dostawcze'}
              data1={props.distanceCarTypesYearData.distance.map((obj: stats_oneMonthSchemaByCarTypes) => obj.total_distance_passengerCar)}
              data2={props.distanceCarTypesYearData.distance.map((obj: stats_oneMonthSchemaByCarTypes) => obj.total_distance_bus_and_truck)}
              
              />

            </div>
          </div>




          <div className='flex flex-col lg:flex-row gap-4 md:gap-62xl:gap-7.5 md:mx-2'>


              <div className="lg:w-1/2 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
                {props.favouriteCarInYearData.response !== null &&
                <CardStat
                svg={
                <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 512 512"><path d="M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>
                }
                value={`${props.favouriteCarInYearData.response?.carData?.brand} ${props.favouriteCarInYearData.response?.carData?.model}`}
                value_wrap={true}
                title={`Najczęściej używane auto w ${props.favouriteCarInYearData.year} roku`}
                showProgress={false}
                />
                }

                {props.favouriteCarInYearData.response !== null &&
                <CardStat
                svg={
                <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256V448c0 35.3 28.7 64 64 64h42.8c-6.6-5.9-10.8-14.4-10.8-24V376c0-20.8 11.3-38.9 28.1-48.6l21-64.7c7.5-23.1 29-38.7 53.3-38.7H313.6c24.3 0 45.8 15.6 53.3 38.7l21 64.7c16.8 9.7 28.2 27.8 28.2 48.6V488c0 9.6-4.2 18.1-10.8 24H448c35.3 0 64-28.7 64-64V256C512 114.6 397.4 0 256 0zM362.8 512c-6.6-5.9-10.8-14.4-10.8-24V448H160v40c0 9.6-4.2 18.1-10.8 24H362.8zM190.8 277.5L177 320H335l-13.8-42.5c-1.1-3.3-4.1-5.5-7.6-5.5H198.4c-3.5 0-6.5 2.2-7.6 5.5zM168 408a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm200-24a24 24 0 1 0 -48 0 24 24 0 1 0 48 0z"/></svg>
                }
                value={`${props.favouriteCarInYearData.response?.total_distance} km`}
                value_wrap={false}
                title={`Dystans przejechany najczęściej używanym autem w ${props.favouriteCarInYearData.year} roku`}
                showProgress={false}
                />
                }

                
                {props.favouriteUserInYearData.response !== null &&
                <CardStat
                svg={
                <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 576 512"><path d="M0 80C0 53.5 21.5 32 48 32h96c26.5 0 48 21.5 48 48V96H384V80c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H432c-26.5 0-48-21.5-48-48V160H192v16c0 1.7-.1 3.4-.3 5L272 288h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H272c-26.5 0-48-21.5-48-48V336c0-1.7 .1-3.4 .3-5L144 224H48c-26.5 0-48-21.5-48-48V80z"/></svg>
                }
                value={`${props.favouriteUserInYearData.response?.userData?.name} ${props.favouriteUserInYearData.response?.userData?.surname}`}
                value_wrap={true}
                title={`Użytkownik z największym przejechanym dystansem na ten projekt w ${props.favouriteUserInYearData.year} roku`}
                showProgress={false}
                />
                }

                {props.favouriteUserInYearData.response !== null &&
                <CardStat
                svg={
                <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 640 512"><path d="M112 0C85.5 0 64 21.5 64 48V96H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 272c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 48c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 240c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 208c8.8 0 16 7.2 16 16s-7.2 16-16 16H64V416c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zM544 237.3V256H416V160h50.7L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z"/></svg>
                }
                value={`${props.favouriteUserInYearData.response?.total_distance} km`}
                value_wrap={false}
                title={`Dystans przejechany przez ${props.favouriteUserInYearData.response?.userData?.name} ${props.favouriteUserInYearData.response?.userData?.surname} na rzecz tego projektu w ${props.favouriteCarInYearData.year} roku`}
                showProgress={false}
                />
                }

              </div>


              <div className='lg:w-1/2'>
                
                  <PieChart
                  title={'Top 6 samochodów według przejechanego dystansu'}
                  data = {
                    props.distanceCarsData.response && props.distanceCarsData.response.length > 0 ?
                    props.distanceCarsData.response
                    .filter((obj: stats_oneMonthSchemaToPlacesByCars) => obj.total_distance > 0)
                    .map((obj: stats_oneMonthSchemaToPlacesByCars) => ({name: `${obj.carData.brand} ${obj.carData.model}`, value: obj.total_distance, color: obj.random_color}))
                    .slice(0, 6) //limit to the first 6 elements
                    :
                    []
                  }
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

export default PlacePage;
