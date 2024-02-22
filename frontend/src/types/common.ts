export type Pagination = {
    totalCount: number,
    totalPages: number,
    currentPage: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean,
  }

  

export interface ApiResponse {
    status: 'success' | 'fail' | 'error',
    totalDistance?: number,
    data?: any,
    pagination?: Pagination,
    message?: any,
  }



  export type warnings = {
    pl: string,
    en: string,
  } 



  export type Polish_weekdays = 'pon.' | 'wt.' | 'śr.' | 'czw.' | 'pt.' | 'sob.' | 'ndz.';