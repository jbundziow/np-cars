
type months = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

//................................................................//
// /stats/cars/:carid/distance?year=2024
export interface stats_oneMonthSchema {
    month_num: number,
    month_text: months,
    total_distance: number
}

export interface stats_CarDistanceInYear {
    carid: number,
    year: number,
    distance: stats_oneMonthSchema[]
  }
//................................................................//



//................................................................//
// /stats/cars/:carid/fuelusage/year/2024
export interface stats_oneMonthSchemaFuelUsage {
  month_num: number,
  month_text: string,
  average_fuelusage_current_year: number | null,
  average_fuelusage_previous_year: number | null,
}

export interface stats_CarFuelUsageInYear {
  carid: number,
  year: number,
  response: stats_oneMonthSchemaFuelUsage[]
}
//................................................................//



//................................................................//
// /stats/cars/:carid/distance/places
type PlaceData = {
  id: number,
  projectCode: string,
}
export interface stats_oneMonthSchemaToPlaces {
  placeData: PlaceData,
  total_distance: number,
  random_color: string,
}

export interface stats_CarDistanceToPlaces {
  carid: number,
  response: stats_oneMonthSchemaToPlaces[] | [],
}
//................................................................//




//................................................................//
// /stats/cars/:carid/distance/users
type UserData = {
  id: number,
  name: string,
  surname: string,
}
export interface stats_oneMonthSchemaByUsers {
  userData: UserData,
  total_distance: number,
  random_color: string,
}

export interface stats_CarDistanceByUsers {
  carid: number,
  response: stats_oneMonthSchemaByUsers[] | [],
}
//................................................................//




//................................................................//
// /stats/cars/:carid/total
export interface stats_CarTotalStats {
  carid: number,
  total_rentals: number,
  total_reservations: number,
  total_refuelings: number,
  total_faults: number,
  total_distance: number,
  total_number_of_refueled_liters: number,
  total_costBrutto_of_fuel: number,
  averageConsumption: number | null,
}
//................................................................//





//................................................................//
// /stats/cars/:carid/total/year/:year
type YearStatsObject = {
  currentYear: number,
  previousYear: number,
}

export interface stats_CarTotalStatsInYearDataObject {
  total_rentals: YearStatsObject,
  total_reservations: YearStatsObject,
  total_refuelings: YearStatsObject,
  total_faults: YearStatsObject
  total_distance: YearStatsObject
  total_number_of_refueled_liters: YearStatsObject,
  total_costBrutto_of_fuel: YearStatsObject,
  averageConsumption: {currentYear: number | null, previousYear: number | null},
}

export interface stats_CarTotalStatsInYear {
  carid: number,
  year: number,
  data: stats_CarTotalStatsInYearDataObject,
}
//................................................................//




//................................................................//
// /stats/cars/:carid/favourite/user

export interface stats_CarFavouriteUserResponse {
  userData: {id: number, name: string, surname:string} | null,
  total_distance: number,
}

export interface stats_CarFavouriteUser {
  carid: number,
  year: number | null,
  response: stats_CarFavouriteUserResponse | null,
}
//................................................................//





//................................................................//
// /stats/cars/:carid/favourite/place


export interface stats_CarFavouritePlaceResponse {
  placeData: {id: number, projectCode: string} | null,
  total_distance: number,
}

export interface stats_CarFavouritePlace {
  carid: number,
  year: number | null,
  response: stats_CarFavouritePlaceResponse | null,
}
//................................................................//