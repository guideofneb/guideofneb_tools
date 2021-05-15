const areArrayEqual = (firstArray, secondArray) => {
  let isEqual = true;
  firstArray.map((v, i) => {
    if (secondArray[i] !== v) {
      isEqual = false;
    }
  });
  return isEqual;
};
export default areArrayEqual;
