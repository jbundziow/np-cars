const dateFormatter = (inputDateString: string): string | 'Błąd' => {
    const inputDate = new Date(inputDateString);
  
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
  


  
  export default dateFormatter;