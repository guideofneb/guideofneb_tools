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

export const oneByDividingWithItself = (questionData: number[][], row: ROW): RowOperationData => {
    for (let i = 0; i <= 3; i++) {
        questionData[row - 1][i] /= questionData[row - 1][i];
    }
    return new RowOperationData("", questionData, "");
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

export const twoVariableOperationRowOperation = (twoVariables: [number, number], leftRow: ROW, rightRow: ROW, questionData: number[][]): RowOperationData => {
    /*
     ***** Header Templates *****
     [For addition and suubtraction]
     First one => where x is 1 and y is non 1
     Second one => where x is non 1 and y is 1
     Third one => where both x and y are 1
     Fourth one => where both x and y are non 1
     */
    let header: string;
    let reason: string;
    let headerTemplates_SUBTRACTION = [
        String.raw`\text{Multipyling }\text{R}_{\text{#[R1]#}}\text{ by #[Y]# and sutracting it from }\text{R}_{\text{#[R0]#}}`,
        String.raw`\text{Mutliplying }\text{R}_{\text{#[R0]#}}\text{ and }\text{R}_{\text{#[R1]#}}\text{by #[X]# and #[Y]# respectively and subtracting }\text{R}_{\text{#[R1]#}} by \text{R}_{\text{#[R0]#}}\text{ we get,}`,
    ];
    let headerTemplates_ADDITION = [
        String.raw`\text{Multipyling }\text{R}_{\text{#[R1]#}}\text{ by #[Y]# and adding it with }\text{R}_{\text{#[R0]#}}\text{we get,}`,
        String.raw`\text{Multipyling }\text{R}_{\text{#[R0]#}}\text{ by #[X]# and adding it with }\text{R}_{\text{#[R1]#}}\text{ we get,}`,
        String.raw`\text{Adding }\text{R}_{\text{#[R1]#}}\text{ and }\text{R}_{\text{#[R0]#}}\text{we get,}`,
        String.raw`\text{Mutliplying }\text{R}_{\text{#[R0]#}}\text{ and }\text{R}_{\text{#[R1]#}}\text{by #[X]# and #[Y]# respectively and adding }\text{R}_{\text{#[R1]#}} and \text{R}_{\text{#[R0]#}}\text{ we get,}`,
    ];
    // Storing the left and right as x and y
    // in R(m) -> xR(m) + yR(n)
    let [x, y] = twoVariables;
    for (let i = 0; i <= 3; i++) {
        questionData[leftRow - 1][i] = (x) * (questionData[leftRow - 1][i]) + (y) * (questionData[rightRow - 1][i]);
    }
    // ***** Finding header *****
    if (x === 1 && y !== 1) { // First one => Where x is 1 and y is non 1
        if (y < 0) { // When y is negative , use subtraction template 
            header = headerTemplates_SUBTRACTION[0];
        } else { // and if not then use the addition template
            header = headerTemplates_ADDITION[0];
        }
    } else if (x !== 1 && y === 1) { // Second one => Where x is non 1 and y is 1
        header = headerTemplates_ADDITION[1];
    } else if (x === 1 && y === 1) { // Third one => Where x is 1 and y is 1
        header = headerTemplates_ADDITION[2];
    } else { // Fourth one => Where x is non 1 and y is also non 1
        if (y < 0) {
            header = headerTemplates_SUBTRACTION[1];
        } else {
            header = headerTemplates_ADDITION[3];
        }
    }
    reason = x !== 1 ? String.raw`\text{(${x})}` : "" + String.raw`\text{R}_{\text{${leftRow}}} ${y < 0 ? "-" : "+"}` + (y !== 1 ? String.raw`\text{(${Math.abs(y)})}` : "") + String.raw`\text{R}_{\text{${rightRow}}}`;
    header = header.replace("#[R1]#", `${rightRow}`).replace("#[R0]#", `${leftRow}`).replace("#[Y]#", `${y}`).replace("#[X]#", `${x}`);
    return new RowOperationData(header, questionData, reason);
}