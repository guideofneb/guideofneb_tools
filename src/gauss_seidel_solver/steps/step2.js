const STEP2 = (leftVarAndRightConst) => {
  let step2finalLatex = String.raw`&\text{From equations (i), (ii) and (iii) respectivley we have,}\\[6pt] &\space\space\space\begin{aligned}`;
  //Iterate over all the leftVar and RightConst in leftVarAndRightConst
  leftVarAndRightConst.map((d, i) => {
    const latexSteps = [];
    let leftSide = d.leftVars;
    let rightSide = d.rightConstant;
    //Beginning of every final lone pair latex process. lone pair => It means one variable is at left
    let finalLatex = String.raw`\left.\begin{aligned}`;
    //Make first latex from the passing parameter values
    latexSteps.push(String.raw`&${leftSide[0]} ${leftSide[1]} ${leftSide[2]} = ${rightSide[0]} \\`.replace(/([A-Za-z])/g,String.raw`\text{$1}`));
    // Move all from left elements to right changing their sign, except the leftSide[i] element
    leftSide.map((_d, _i) => {
      // Move all to right except the element at index "i" of leftSide
      if (_i !== i) {
        // Extracts the sign and turns to opposite and if sign not present then it means its + so it will make it -
        // and also adds the new sign with element without a sign. Thus, creating a opposite sign element in the right side
        const signChanger =
          (_d.match(/(\+|\-)/) ?? [""])[0] === "-"
            ? "+"
            : "-" + _d.replace(/(\+|\-)/g, "");
        rightSide.push(signChanger);
        delete leftSide[_i];
      }
    });
    // Removed undefined,null items and remove the sign "+" if present, coz now its in the first
    leftSide = leftSide.filter(Boolean).map((_da) => {
      return _da.replace("+", "");
    });
    latexSteps.push(
      String.raw`\space` +
        String.raw`&${leftSide[0]} = ${rightSide[0]} ${rightSide[1]} ${rightSide[2]}`.replace(
          /([A-Za-z])/g,
          String.raw`\text{$1}`
        )
    );
    rightSide = {
      rightSide: rightSide,
      denom: parseInt(leftSide[0].replace(/([A-Za-z])/g, "")),
    };

    leftSide[0] = leftSide[0].match(/[A-Za-z]/)[0];
      if(rightSide.denom !== 1){
          latexSteps.push(String.raw`\therefore \hspace{8pt}&\text{${leftSide[0]}}` +
              String.raw`= ${rightSide.denom < 0 ? "-" : "" } \dfrac{ 1 } { ${Math.abs(rightSide.denom)} }`+
              String.raw`\left(${rightSide.rightSide[0]}` + String.raw`${rightSide.rightSide[1]} ${rightSide.rightSide[2]}`.replace(/([A-Za-z])/g,String.raw`\text{$1}`));
      }
      latexSteps.map((data,index)=>{
          if(index === 1){
              if (latexSteps.length ===2) {
                  data = String.raw`\therefore \space ${data}`
              }else{
                  data = String.raw`\text{Or, }${data} \\`
              }
          }
        finalLatex += data;
      });
      finalLatex += String.raw`\right)\end{aligned}\space\space\right|`;
      step2finalLatex += finalLatex;
  });
    step2finalLatex += String.raw`\end{aligned} \\`;
  return step2finalLatex;
};




export default STEP2;
