import { dateOnlyValidator } from "../../models/validation/ReservationSchemas";

const getNextTwoWeeksDatesArr = (): string[] => {
    const dates: string[] = [];
    const today = new Date();
  
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
  
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      
      if(dateOnlyValidator(formattedDate)) {
      dates.push(formattedDate);
      }
    }
  
    return dates;
  }

  export {getNextTwoWeeksDatesArr}
  