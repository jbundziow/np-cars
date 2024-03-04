export type PaginationType = {
    totalCount: number,
    totalPages: number,
    currentPage: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean,
  }

  

export interface ApiResponse {
    status: 'success' | 'fail' | 'error',
    data?: any,
    pagination?: PaginationType,
    message?: any,


    //for rentals
    totalDistance?: number,

    //for refuelings
    totalNumberOfLiters?: number,
    averageConsumption?: number | null,
    totalCostBrutto?: number,
    averageCostPerLiter?: number | null,
  }



  export type warnings = {
    pl: string,
    en: string,
  } 



  export type Polish_weekdays = 'pon.' | 'wt.' | 'śr.' | 'czw.' | 'pt.' | 'sob.' | 'ndz.';


  export type UserRoles = 'unconfirmed' | 'banned' | 'admin' | 'user';

  export type AuthType = {
    userID: string,
    userRole: UserRoles,
  }