const EquationProcessLatex = (_equationLatexSteps, _equationNo) => {
    // latex that is to be returned finally, initially set to an empty String
    let latexCombined = String.raw``;
    // Get the equationNumbering string from the equation no 
    const equationNum = _equationNo === 1 ? `i` : _equationNo === 2 ? `ii` : _equationNo === 3 ? `iii` : ``;
    // If the equation equationLatexSteps is 1 in length then give it equation numbering without arrow and end it there
     if (_equationLatexSteps.length === 1) {
          latexCombined+=String.raw`\hspace{14pt}${_equationLatexSteps[0]}\space\text{----------(${equationNum})}`;
    } else {
    // If the equationLatexSteps is more than 1 in length then give equation numbering to the last one 
    // and print the first one without arrow as it is
       _equationLatexSteps.map((latex, index) => {
        switch (index) {
          // If its the first latex then print as it is
          case 0:
            latexCombined += String.raw`&${latex}\\ `;
            break;
          //If its the last latex then print with right arrow prefix and equation no as (-----(i)) in the right
          case _equationLatexSteps.length - 1:
            latexCombined += String.raw`\rightarrow\space&${latex}\space\text{-----------(${equationNum})}\\`;
            break;
          //If it is not first or last then just put a right arrow and show the latex
          default:
            latexCombined += String.raw`\rightarrow\space&${latex}\\`;
            break;
        }
      });
    }
      return latexCombined;
  };

export default EquationProcessLatex;

