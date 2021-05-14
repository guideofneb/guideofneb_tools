// Function that adds missing variable to the finalized latex steps and coeff and var
// Eg final latex is 2x + 10y = 20 and the leftVars = ["2x", "+10y"] and the possible vars are x, y and z
// Then what this function will do is add a new latex as 2x + 10y + 0z = 20 and make the leftVars = ["2x", "+10y", "+0z"]
// varsArray example : ["y","+2z"] and it will return ["x","+y","+2z"]
const addMissingVars = (varsArray,allVars) => {
  // Final leftVars that is to be returned after adding missing var .Eg before : ["y","+10z"] after : ["0x","+y","+10z"]
  const finalLeftVars = [];
  // Only add mising variable if three variables arent there
  if (varsArray.length !== 3) {
    // Grab all the variables present currently in the leftVar of this equation excluding the sign and coefficient
    const allVarsFromleftVars = varsArray.map((SignCoeffAndVar) => {
      //Matches the character variable and returns it
      return SignCoeffAndVar.match(/[A-Za-z]/)[0];
    });
    // Iterating over current leftVar and taking every data out of it as variable SignCoeffAndVar
    allVars.map((variable, index) => {
      if (allVarsFromleftVars.includes(variable)) {
        // Get the matching variable coeff sign and its variable
        let dataFromFilter = varsArray.filter((data) =>
          data.includes(variable)
        )[0]; 
        // If the index is not first and it has no sign then it should be added a sign i.e "+" sign
        if (index !== 0 && dataFromFilter.match(/(\+|\-)/) === null) {
          dataFromFilter = "+" + dataFromFilter;
        }
        finalLeftVars.push(dataFromFilter);
      } else {
        // If index is not 0 then it means + should be the prefix sign
        if (index !== 0) {
          finalLeftVars.push(`+0${variable}`);
        } else {
          //If index is 0 then it means that its at the first and its sign should be nothing as its alread +
          finalLeftVars.push(`0${variable}`);
        }
      }
    });
    return finalLeftVars;
  }
      return varsArray;
} 
export default addMissingVars;
