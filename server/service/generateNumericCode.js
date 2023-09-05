const generateNumericCode = (payload) => {
  const length = 6;
  let code = "";

  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * 10);
    code += randomNumber;
  }

  return code;
};

export default generateNumericCode
