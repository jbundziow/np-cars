import { db_Car_basic } from "./db_types";

type months = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

//................................................................//
// /stats/places/:placeid/distance?year=2024
export interface stats_oneMonthSchema {
    month_num: number,
    month_text: months,
    total_distance: number
}

export interface stats_PlacesDistanceInYear {
    placeid: number,
    year: number,
    distance: stats_oneMonthSchema[]
}
//................................................................//


//................................................................//
// /stats/places/:placeid/distance/bycartypes?year=2024
export interface stats_oneMonthSchemaByCarTypes {
    month_num: number,
    month_text: string,
    total_distance_passengerCar: number,
    total_distance_bus_and_truck: number
}

export interface stats_PlaceDistanceInYearByCarTypes {
    placeid: number,
    year: number,
    distance: stats_oneMonthSchemaByCarTypes[]
}
//................................................................//


//................................................................//
// /stats/places/:placeid/distance/users
type UserData = {
    id: number,
    name: string,
    surname: string,
}
export interface stats_oneMonthSchemaToUsers {
    userData: UserData,
    total_distance: number,
    random_color: string,
}

export interface stats_DistanceToPlacesByUsers {
    placeid: number,
    response: stats_oneMonthSchemaToUsers[] | [],
}
//................................................................//



//................................................................//
// /stats/places/:placeid/distance/cars
type CarData = {
    id: number,
    brand: string,
    model: string,
}
export interface stats_oneMonthSchemaToPlaces {
    carData: CarData,
    total_distance: number,
    random_color: string,
}

export interface stats_DistanceToPlacesByCars {
    placeid: number,
    response: stats_oneMonthSchemaToPlaces[] | [],
}
//................................................................//



//................................................................//
// /stats/places/:placeid/total
export interface stats_PlaceTotalStats {
    placeid: number,
    total_rentals: number,
    total_distance: number,
}
//................................................................//


//................................................................//
// /stats/places/:placeid/total/year/:year
type YearStatsObject = {
    currentYear: number,
    previousYear: number,
}

export interface stats_PlaceTotalStatsInYearDataObject {
    total_rentals: YearStatsObject,
    total_distance: YearStatsObject
}

export interface stats_PlaceTotalStatsInYear {
    placeid: number,
    year: number,
    data: stats_PlaceTotalStatsInYearDataObject,
}
//................................................................//


//................................................................//
// /stats/places/:placeid/favourite/car
export interface stats_PlaceFavouriteCarResponse {
    carData: db_Car_basic | null,
    total_distance: number,
}

export interface stats_PlaceFavouriteCar {
    placeid: number,
    year: number | null,
    response: stats_PlaceFavouriteCarResponse | null,
}
//................................................................//


//................................................................//
// /stats/places/:placeid/favourite/user
export interface stats_PlaceFavouriteUserResponse {
    userData: {id: number, name: string, surname: string} | null,
    total_distance: number,
}

export interface stats_PlaceFavouriteUser {
    placeid: number,
    year: number | null,
    response: stats_PlaceFavouriteUserResponse | null,
}
//................................................................//
