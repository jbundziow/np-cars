const getRandomColor = (): string => {
  let randomColor;
  do {
      randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  } while (randomColor.length !== 7);
  
  return `bg-[${randomColor}]`;
};

export default getRandomColor;