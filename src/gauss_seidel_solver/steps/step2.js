const STEP2 = (leftVarAndRightConst) => {
    let step2finalLatex = String.raw`
    &\text{From equations (i), (ii) and (iii) respectivley we have,}\\[6pt]
    &\space\space\space\begin{aligned}`;

    let firstEquationLonerLatex = String.raw`
    \left.
    \begin{aligned}
    &2\text{x}+\text{y}+0\text{z}=-20 \\
    \text{Or,}\space & 2\text{x}=-20 -\text{y}-0\text{z} \\
    \therefore \space &\text{ x }=\dfrac{ 1 } { 2 } \left(-20 -\text{ y } - 0\text{ z }\right)
    \end{aligned}
    \space\space
    \right |


    `;
    return step2finalLatex;
};

export default STEP2;
