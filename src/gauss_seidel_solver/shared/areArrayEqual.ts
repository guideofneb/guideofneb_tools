const areArrayEqual = (firstArray : any[], secondArray : any[]) : boolean => {
  let isEqual = true;
  firstArray.map((v, i) => {
    if (secondArray[i] !== v) {
      isEqual = false;
    }
  });
  return isEqual;
};
export default areArrayEqual;
