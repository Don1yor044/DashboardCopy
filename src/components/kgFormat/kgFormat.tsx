export const kgFormatter = (weight: number) => {
  const kg = weight / 1000;
  return `${new Intl.NumberFormat("uz-UZ").format(kg)} kg`;
};
