export const countDaysLeft = (date: Date | string): number | '#ERR' => {
    if (!(date instanceof Date)) {
        return '#ERR';
      }

    const today = new Date();
    const timeDiff = date.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft;
};