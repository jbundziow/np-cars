import { db_User } from "./db_types"

export type reservationTypeAtSpecificDate = {
    date: Date,
    reservation: boolean,
    userID: number | null,
    userName: string | null,
  }



export type RentalGapType = {
  gapStart: number,
  gapEnd: number,
}

export type Rental_Gaps = {
    carID: number,
    excludeRentalID: number | null,
    firstMileage: number | null | undefined,
    lastMileage: number | null | undefined,
    gaps: RentalGapType[] | [],
  }




  export type HomepageStats = {
    year: number,
    current_user: db_User,
    total_distance_currentYear: number,
    total_rentals_currentYear: number,
    faults_to_be_repaired: number,
    active_users: number,
    all_cars: number,
    all_available_cars: number,
  }