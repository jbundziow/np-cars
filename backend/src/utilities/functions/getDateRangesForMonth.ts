const getDatesForMonth = (year: number, month: number): { startDate: string, endDate: string } => {
    let endDate: Date;
  
    if (month === 1 && year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
      //february in a leap year
      endDate = new Date(year, month, 29, 23, 59, 59);
    } else {
      endDate = new Date(year, month + 1, 0 , 23, 59, 59);
    }
  
    const startDate = new Date(year, month, 1 , 0, 0, 0);

     //adjust the dates to local time
    startDate.setHours(startDate.getHours() + 1); //add one hour for GMT+1
    endDate.setHours(endDate.getHours() + 1); //add one hour for GMT+1

    return {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };
};


  export default getDatesForMonth;