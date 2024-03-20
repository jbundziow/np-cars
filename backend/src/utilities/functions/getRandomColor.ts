const getRandomColor = (): string => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    return `bg-[${randomColor}]`;
  };
  
  export default getRandomColor;
  