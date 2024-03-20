import { db_Car_basic } from "./db_types";

type months = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

//................................................................//
// /stats/users/:userid/distance?year=2024
export interface stats_oneMonthSchema {
    month_num: number,
    month_text: months,
    total_distance: number
}

export interface stats_UserDistanceInYear {
    userid: number,
    year: number,
    distance: stats_oneMonthSchema[]
  }
//................................................................//



//................................................................//
// /stats/users/:userid/distance/bycartypes?year=2024
export interface stats_oneMonthSchemaByCarTypes {
  month_num: number,
  month_text: string,
  total_distance_passengerCar: number,
  total_distance_bus_and_truck: number
}

export interface stats_UserDistanceInYearByCarTypes {
  userid: number,
  year: number,
  distance: stats_oneMonthSchemaByCarTypes[]
}
//................................................................//



//................................................................//
// /stats/users/:userid/distance/places
type PlaceData = {
  id: number,
  projectCode: string,
}
export interface stats_oneMonthSchemaToPlaces {
  placeData: PlaceData,
  total_distance: number,
  random_color: string,
}

export interface stats_UserDistanceToPlaces {
  userid: number,
  response: stats_oneMonthSchemaToPlaces[] | [],
}
//................................................................//




//................................................................//
// /stats/users/:userid/total
export interface stats_UserTotalStats {
  userid: number,
  total_rentals: number,
  total_reservations: number,
  total_refuelings: number,
  total_faults: number,
  total_distance: number,
  total_number_of_refueled_liters: number,
  total_costBrutto_of_fuel: number,
}
//................................................................//





//................................................................//
// /stats/users/:userid/total/year/:year
type YearStatsObject = {
  currentYear: number,
  previousYear: number,
}

export interface stats_UserTotalStatsInYearDataObject {
  total_rentals: YearStatsObject,
  total_reservations: YearStatsObject,
  total_refuelings: YearStatsObject,
  total_faults: YearStatsObject
  total_distance: YearStatsObject
  total_number_of_refueled_liters: YearStatsObject,
  total_costBrutto_of_fuel: YearStatsObject,
}

export interface stats_UserTotalStatsInYear {
  userid: number,
  year: number,
  data: stats_UserTotalStatsInYearDataObject,
}
//................................................................//




//................................................................//
// /stats/users/:userid/favourite/car


export interface stats_UserFavouriteCarResponse {
  carData: db_Car_basic | null,
  total_distance: number,
}

export interface stats_UserFavouriteCar {
  userid: number,
  year: number | null,
  response: stats_UserFavouriteCarResponse | null,
}
//................................................................//





//................................................................//
// /stats/users/:userid/favourite/place


export interface stats_UserFavouritePlaceResponse {
  placeData: {id: number, projectCode: string} | null,
  total_distance: number,
}

export interface stats_UserFavouritePlace {
  userid: number,
  year: number | null,
  response: stats_UserFavouritePlaceResponse | null,
}
//................................................................//