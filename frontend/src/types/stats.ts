

//................................................................//

export type stats_UserDistanceInYear_oneMonthSchema = {
    month_num: number,
    month_text: string,
    total_distance: number
}

export type stats_UserDistanceInYear = {
    userid: number,
    year: number,
    distance: stats_UserDistanceInYear_oneMonthSchema[]
  }

//................................................................//