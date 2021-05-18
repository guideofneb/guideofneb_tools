/*
 * STEP2 takes leftVarAndRightConst as input parameter, which is just array of objects
 * that contains the leftVar and rightConstant
 * Eg. leftVarAndRightConst = [
 *      { leftVars: [ "3x", "-y", "+z" ], rightConstant: [ "-1" ] },
 *      { leftVars: [ "-x", "+3y", "-z" ], rightConstant: [ "7" ] },
 *      { leftVars: [ "x", "-y", "+3z" ], rightConstant: [ "-7" ] } 
 * ];
 *
 * It then iterates over the leftVarAndRightConst array and takes each object and does processing over it
 * By processing, i mean its solved into loner form and its latex to reach that step is produced 
 * 
 */
const Step2 = (leftVarAndRightConst) => {
  // Final latex and final left and right side to be returned
  const finalReturnLeftRightSideAndLatex = {
        finalLatex : "",
        leftRightSide : []
  };
  let step2finalLatex = String.raw`&\text{From equations (i), (ii) and (iii) respectivley we have,}\\[6pt] &\begin{aligned}`;
  //Iterate over all the leftVar and RightConst objects in leftVarAndRightConst
  leftVarAndRightConst.map((d, i) => {
    let leftSide = d.leftVars;
    let rightSide = d.rightConstant;
    //latexSteps is basically the array of all steps made to convert the equation into loner form => where there is only one var in the left
    //First element of the latexsteps is basically the latex from the input parameter iteself 
    const latexSteps = [String.raw`&${leftSide[0]} ${leftSide[1]} ${leftSide[2]} = ${rightSide[0]} \\`.replace(/([A-Za-z])/g,String.raw`\text{$1}`)];
    // Move all from left elements to right changing their sign, except the leftSide[i] element, coz leftSide[i] element is the one that we wanna solve for
    leftSide.map((_d, _i) => {
      // Move all to right except the element at index "i" of leftSide
      if (_i !== i) {
        // Extracts the sign and turns to opposite and if sign not present then it means its + so it will make it -
        // and also adds the new sign with element without a sign. Thus, creating a opposite sign element in the right side
        const signChanger =`${(_d.match(/(\+|\-)/) ?? [""])[0] === "-" ? "+" : "-"}${_d.replace("+","").replace("-","")}` ;
        rightSide.push(signChanger);
        delete leftSide[_i];
      }
    });
    // Removed undefined,null items and remove the sign "+" if present, coz now its in the first
    leftSide = leftSide.filter(Boolean).map((_da) => {
      return _da.replace("+", "");
    });

    latexSteps.push(
      String.raw`\space &` +
        String.raw`${leftSide[0]}`.replace(
          /([A-Za-z])/g, String.raw`\text{$1}`) + String.raw`= \left(`+`${rightSide[0]} ${rightSide[1]} ${rightSide[2]}`.replace(
          /([A-Za-z])/g,
          String.raw`\text{$1}`
        )
    );
    //Extracts the denominator, which is the coefficient of leftSide element at index 0 with sign
    const denomString = leftSide[0].replace(/([A-Za-z])/g, "") 
    rightSide = {
      rightSide: rightSide,
      denom: parseInt(denomString === "" ? "1": denomString),
    };

    leftSide[0] = leftSide[0].match(/[A-Za-z]/)[0];
      if(rightSide.denom !== 1 ){
          latexSteps.push(String.raw`\therefore \hspace{8pt}&\text{${leftSide[0]}}` +
              String.raw`= ${rightSide.denom < 0 ? "-" : "" } \dfrac{ 1 } { ${Math.abs(rightSide.denom)} }`+
              String.raw`\left(${rightSide.rightSide[0]}` + String.raw`${rightSide.rightSide[1]} ${rightSide.rightSide[2]}`.replace(/([A-Za-z])/g,String.raw`\text{$1}`)+String.raw`\right)`);
      }
    //Beginning of finalLatex of a equation that is to be returned
    let finalLatex = String.raw`\left.\begin{aligned}`;
      //Iterate over all the steps made of latex of making lone pair i.e only one variable to the left
      latexSteps.map((data,index)=>{
          if(index === 1){
              if (latexSteps.length ===2) {
                  data = String.raw`\therefore \space ${data} \right)`
              }else{
                  data = String.raw`\text{Or, } ${data} \right) \\`
              }
          }
        finalLatex += data;
      });
      finalLatex += String.raw`\end{aligned}\space\space\right|`;
      step2finalLatex += finalLatex;
      finalReturnLeftRightSideAndLatex.leftRightSide.push({
            leftSide : leftSide,
          rightSide : rightSide
     });
    });
    step2finalLatex += String.raw`\end{aligned} \\`;
    finalReturnLeftRightSideAndLatex.finalLatex = step2finalLatex
  return finalReturnLeftRightSideAndLatex;
};
export default Step2;
