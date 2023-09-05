export const matchIsNumeric = (text) => {
  const isNumber = /^\d+$/.test(text);
  return (isNumber) && !isNaN(Number(text))
}
