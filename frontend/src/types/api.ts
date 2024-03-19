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