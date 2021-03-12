import { ROW, RowOperationData } from './constants';
/* It lets you to find the GCD of two numbers, 
 Eg , if a = 20, c = 40 then findGCD(a,b) = 10 
 because 10 is the greatest number that can divide 'a' and 'b'  */
export const findGCD = (a: number, b: number): number => {
    if (Math.abs(a) == 0) {
        return Math.abs(b);
    }
    return findGCD(Math.abs(b) % Math.abs(a), Math.abs(a));
}

/* It lets you find GCD of 4 numbers
 Eg if a = 20, b = 10, c = 5, d = 30 then findGCDforFour(a,b,c,d) = 5
 because 5 is the greatest number that can divide 'a', 'b', 'c' and 'd' */
export const findGCDforFour = (a: number, b: number, c: number, d: number) => {
    return findGCD(a, findGCD(b, findGCD(c, d)));
}

/* It takes a row which contains a -1 which we need to convert to 1 ,it can be A11, A22 or A33
 it simply mutliplies that row with -1; making the A11, A22 or A33 provided into 1 */
export const negOnetoPosOne = (questionData: number[][], row: ROW): RowOperationData => {
    for (let i = 0; i <= 3; i++) {
        questionData[row - 1][i] *= (-1);
    }
    return new RowOperationData(
        String.raw`\text{Multiplying }{{\text{R}}_{\text{${row}}}}\text{ by (-1) we get,}`,
        questionData,
        String.raw`\small{{{\text{R}}_{\text{${row}}}}\to {{\text{R}}_{\text{${row}}}}\times(-1)}`);
}


/* It takes a row(considered as left row) and does two variable operation with another row(right row)
Eg. R1(it is the toMake) -> x(R1) + y(R2) 
ToMake can be 0 or 1 which you wanna make */
export const twoVariableOperation = (toMake: number, left: number, right: number): [number, number] => {
    // Formula then becomes y = toMake - R1
    // x = R2
    // then we'll find the 	
    let y = toMake - left
    let x = right;
    let gcd = findGCD(left, right);
    x /= gcd;
    y /= gcd;
    let isitCorrect = ((x * left) + (y * right)) === toMake;
    if (isitCorrect) {
        return [x, y];
    }
    return [0, 0];
}
