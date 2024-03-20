const getDateRangesForYear = (year: number): { startDate: string, endDate: string } => {
    const startDate = new Date(year, 0, 1); //january 1st
    const endDate = new Date(year, 11, 31); //december 31st
  
    //adjust the dates to local time for GMT+1
    startDate.setHours(startDate.getHours() + 1); //add one hour for GMT+1
    endDate.setHours(endDate.getHours() + 1); //add one hour for GMT+1
  
    return {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };
  };
  
  export default getDateRangesForYear;