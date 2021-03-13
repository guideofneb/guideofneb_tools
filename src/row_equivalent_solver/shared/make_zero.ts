import { ROW, RowOperationData } from './constants';


export const makeZero = (leftROW: ROW, rightROW: ROW, questionData: number[][], fromValue: number): RowOperationData => {
    // headerTemplate containes two possibilities i.e of addition and subtraction
    let headerTemplate = [
        String.raw`\text{Multipyling }\text{R}_{\text{#[R1]#}}\text{ by #[VALUE]# and adding it with }\text{R}_{\text{#[R0]#}}\text{ we get,}`,
        String.raw`\text{Multipyling }\text{R}_{\text{#[R1]#}}\text{ by #[VALUE]# and subtracting it from }\text{R}_{\text{#[R0]#}}\text{ we get,}`
    ]
    let value: number;
    let header: string;
    let reasonSign = fromValue > 0 ? "-" : "+";
    if (reasonSign === "-") {
        value = fromValue;
        for (let i = 0; i <= 3; i++) {
            questionData[leftROW - 1][i] = questionData[leftROW - 1][i] - (questionData[rightROW - 1][i]) * (fromValue);
        }
        header = headerTemplate[1];
    } else {
        value = Math.abs(fromValue);
        for (let i = 0; i <= 3; i++) {
            questionData[leftROW - 1][i] = questionData[leftROW - 1][i] + (questionData[rightROW - 1][i]) * (value);
        }
        header = headerTemplate[0];
    }
    header = header.replace("#[R1]#", `${rightROW}`).replace("#[R0]#", `${leftROW}`).replace("#[VALUE]#", `${value}`);
    return new RowOperationData(
        header,
        questionData,
        String.raw`\text{R}_{\text{${leftROW}}}\to\text{R}_{\text{${leftROW}}} ${reasonSign} ${value !== 1 ? `${value})` : ""}\text{R}_{\text{${rightROW}}}`);
}