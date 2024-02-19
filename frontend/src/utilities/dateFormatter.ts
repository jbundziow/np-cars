const offset = 60 * 60 * 1000; // Poland is UTC+1 in standard time

export const dateFormatter = (inputDateString: string): string | 'Błąd' => { //converted to UTC+1
    let inputDate = new Date(inputDateString);
    inputDate = new Date(inputDate.getTime() + offset)
    if (isNaN(inputDate.getTime())) {
      // Invalid date string
      return 'Błąd'
    }
  
    const day = String(inputDate.getUTCDate()).padStart(2, '0');
    const month = String(inputDate.getUTCMonth() + 1).padStart(2, '0');
    const year = inputDate.getUTCFullYear();
    const hours = String(inputDate.getUTCHours()).padStart(2, '0');
    const minutes = String(inputDate.getUTCMinutes()).padStart(2, '0');
  
    const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
    return formattedDate;
  }


  export const dateFormatterAsObject = (inputDateString: string): {date: string, time: string} => { //converted to UTC+1
    let inputDate = new Date(inputDateString);
    inputDate = new Date(inputDate.getTime() + offset)
  
    if (isNaN(inputDate.getTime())) {
      // Invalid date string
      return {date: 'Błąd', time: 'ERR'};
    }
  
    const day = String(inputDate.getUTCDate()).padStart(2, '0');
    const month = String(inputDate.getUTCMonth() + 1).padStart(2, '0');
    const year = inputDate.getUTCFullYear();
    const hours = String(inputDate.getUTCHours()).padStart(2, '0');
    const minutes = String(inputDate.getUTCMinutes()).padStart(2, '0');
  
    const result = {
      date: `${day}.${month}.${year}`,
      time: `${hours}:${minutes}`
    }
    return result;
  }
  
