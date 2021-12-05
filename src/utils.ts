export const round = (value: number, decimals: number = 2): number => {
  const p = Math.pow(10, decimals);

  return Math.round(value * p) / p;
};
