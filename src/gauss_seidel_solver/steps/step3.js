//import mathExpressionEvaluator from 'https://cdn.skypack.dev/math-expression-evaluator';
import mathExpressionEvaluator from "../../../libs/math-expr-eval.js";
import * as ERRORS from '../shared/errors.ts';
const STEP3 = (leftRightSide) => {
  /*
   * Iterative will take first parameter as varAndValue and it will me in the following form
   * varAndValue = [{var : "x",  value:"0"},{var : "y",  value:"0"},{var : "z",  value:"0"}]
   * Initally the value is set to 0 in the iterative method
   *
   * Second parameter is the final latex that it will add upon to insert to other iterations
   *
   * Third parameter is the leftRightSide, which contains all variable names and values including the denominator to
   * build latex
   *
   */
  const operations = [];
  leftRightSide.map((d) => {
    operations.push(
      `(${d.rightSide.rightSide.reduce((a, b) => a + b, "")})/${d.rightSide.denom}`.replace(/([A-Za-z])/g, "($1)"));
  });
  let value = Iterative(
    [
      { var: leftRightSide[0].leftSide[0], value: 0 },
      { var: leftRightSide[1].leftSide[0], value: 0 },
      { var: leftRightSide[2].leftSide[0], value: 0 },
    ],
    "",
    leftRightSide,
    operations,
  );
  return {
    finalLatex: value.iterationsFinalLatex,
    finalValues: value.varAndValue,
  };
};

/*
 *
 * Iterative function takes paramter in following format
 * varAndValue = [{var : "x",  value:"0"},{var : "y",  value:"0"},{var : "z",  value:"0"}]
 * iterationsFinalLatex = ""
 * leftRightSide is an array of leftSide and rightSide object i.e
 * leftRightSide = {
 *                leftSide : [],
 *                rightSide : {
 *                       rightSide : [],
 *                       denom : Number
 *               }
 *       }
 */

const Iterative = (varAndValue, iterationsFinalLatex, leftRightSide, operations, iterationNo = 1) => {
    if(iterationNo > 25){
        throw ERRORS.TOO_MANY_ITERATIONS;
    }
    const prevVarVal = JSON.parse(JSON.stringify(varAndValue));
    console.log()
    let iterationStepsCompleteLatex = leftRightSide.map((d, i) => {
    let oneEquation = String.raw`&\hspace{10pt}`;
    oneEquation +=
      String.raw`\text{${d.leftSide[0]}}=` +
      String.raw`${d.rightSide.denom < 0 ? "-" : ""}\dfrac{1}{${Math.abs(
        d.rightSide.denom
      )}}` +
      String.raw`\left( ${d.rightSide.rightSide[0]}` +
      String.raw`${d.rightSide.rightSide[1]} ${d.rightSide.rightSide[2]}`.replace(
        /([A-Za-z])/g,
        String.raw`\text{$1}`
      ) +
      String.raw`\right)`;

    oneEquation +=
      String.raw`=` +
      String.raw`${d.rightSide.denom < 0 ? "-" : ""}\dfrac{1}{${Math.abs(
        d.rightSide.denom
      )}}` +
      String.raw`\left\{ ${d.rightSide.rightSide[0]}` +
      String.raw`${d.rightSide.rightSide[1]} ${d.rightSide.rightSide[2]}`
        .replace(
          new RegExp(`${varAndValue[0].var}`),
          `(${varAndValue[0].value})`
        )
        .replace(
          new RegExp(`${varAndValue[1].var}`),
          `(${varAndValue[1].value})`
        )
        .replace(
          new RegExp(`${varAndValue[2].var}`),
          `(${varAndValue[2].value})`
        ) +
      String.raw`\right\}`;

    varAndValue[i].value = Number.parseFloat(
      mathExpressionEvaluator
        .eval(
          operations[i]
            .replace(
              new RegExp(`${varAndValue[0].var}`),
              `${varAndValue[0].value}`
            )
            .replace(
              new RegExp(`${varAndValue[1].var}`),
              `${varAndValue[1].value}`
            )
            .replace(
              new RegExp(`${varAndValue[2].var}`),
              `${varAndValue[2].value}`
            )
        )
        .toFixed(3)
    );

    oneEquation += String.raw`= ${varAndValue[i].value} \\ `;
    return oneEquation;
  });
  // Stop the recursion by returning the iterationsFinalLatex and final varAndValue when
  // previous value are equal to the current value
  if (
    prevVarVal[0].value === varAndValue[0].value &&
    prevVarVal[1].value === varAndValue[1].value &&
    prevVarVal[2].value === varAndValue[2].value
  ) {
    return {
      iterationsFinalLatex: iterationsFinalLatex,
      varAndValue: varAndValue,
    };
  } else {
    // Only add the previous question when prevVarVal values and varAndValue values are different i.e the answer has not been found
    iterationStepsCompleteLatex = iterationStepsCompleteLatex.reduce((a, b) => {
      return a + b;
    });
    iterationsFinalLatex +=
      String.raw`&\begin{aligned}&` +
      `\\underline{\\text{Iteration : ${iterationNo}` +
      String.raw`}}\\`;
    iterationsFinalLatex += iterationStepsCompleteLatex + String.raw`\end{aligned}\\`;
    iterationNo++;
    return Iterative(varAndValue, iterationsFinalLatex, leftRightSide, operations, iterationNo);
  }
};
export default STEP3;
