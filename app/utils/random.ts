export const getRandomNumber = (
  min: number,
  max: number,
  allowNegative = false,
): number => {
  const randNumber = Math.floor((max - min) * Math.random()) + min;
  const sign = Math.sign(Math.cos(Math.random() * Math.PI));

  return allowNegative ? sign * randNumber : randNumber;
};
