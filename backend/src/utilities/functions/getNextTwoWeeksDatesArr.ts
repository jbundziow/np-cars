import { dateOnlyValidator } from "../../models/validation/ReservationSchemas";
import { getFormattedDate } from "./getFormattedDate";

const getNextTwoWeeksDatesArr = (): string[] => {
    const dates: string[] = [];
    const today = new Date();
  
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
  
      const formattedDate = getFormattedDate(date);
      
      if(dateOnlyValidator(formattedDate)) {
      dates.push(formattedDate);
      }
    }
  
    return dates;
  }

  export {getNextTwoWeeksDatesArr}
  