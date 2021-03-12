import { RowOperationData, findGCDforFour, LatexAndQuestionData, ROW } from '../shared/constants';
/* Step 0 is all about reducing the rows to the lowest possible value
 by dividing each row with their own GCD (Greatest Common Divisor) */

/* It contains header latex for all the possibilities in STEP - 0
    #[R0]# is the string we need to replace for first row value and #[V0]# is the value
    we need to replace for the first dividing value and so on  */
let headerTemplatesSTEP0 = [
    String.raw`\text{Dividing }\text{R}_{\text{#[R0]#}}\text{ by }\text{#[V0]# we get,}`, //Template for dividing by only 1 row
    String.raw`\text{Dividing }\text{R}_{\text{#[R0]#}}\text{ and }\text{R}_{\text{#[R1]#}}\text{ by }\text{#[V0]# and #[V1]# respectively we get,}`, //Template for dividing by 2 rows:
    String.raw`\text{Dividing }\text{R}_{\text{#[R0]#}}\text{ ,  }\text{R}_{\text{#[R1]#}}\text{ and }\text{R}_{\text{#[R2]#}}\text{ by }\text{#[V0]#, #[V1]# and #[V2]# respectively we get,}`//Template for dividing by 3 rows
];

const Step0 = (input_data: LatexAndQuestionData): LatexAndQuestionData => {
    // creates a new array from arrays of question data
    let questionData = [...input_data.questionData];

    // stores the values that divide and row and stores which row it's dividing; so that we can from a 
    // header of row operation .Eg valueAndRow = [{dividingVal:20, row : 1}]
    let valuesAndRow = [];

    // stores every single dividing reason Eg ['R1->R1/2', 'R2->R2/5','R3->R3/4']
    // and at final a single reason is created accumulating all the reasons in this var
    let reasons = [];

    for (let row = 1; row <= 3; row++) {

        // finding the gcd for all the colums of a row
        let gcd = findGCDforFour(questionData[row - 1][0], questionData[row - 1][1], questionData[row - 1][1], questionData[row - 1][1]);

        // this basically means like if gcd exists(exists implicity means that it's useful enough to divide the columns of the row);
        if (gcd != 0 && gcd > 1) {
            questionData[row - 1] = [
                questionData[row - 1][0] / gcd,
                questionData[row - 1][1] / gcd,
                questionData[row - 1][2] / gcd,
                questionData[row - 1][3] / gcd,
            ]
            valuesAndRow.push({ dividingVal: gcd, row: row });
            reasons.push(String.raw`\small{{{\text{R}}_{\text{${row}}}}\to \dfrac{{{\text{R}}_{\text{${row}}}}}{${gcd}}}`);
        }
    }

    // this condition runs if any of the row was mutated which implicity means that if the operations are done 
    if (input_data.questionData !== questionData) {

        // ***** Header data accumulation ******
        // Initial header string, it will the variable that'll be storing the header value
        let header: string = "";

        // check the lenght of the row, which basically means how many operations where done
        // and by doing that we can know which header template should be used
        switch (valuesAndRow.length) {
            case 1:
                header = headerTemplatesSTEP0[0];
                break;
            case 2:
                header = headerTemplatesSTEP0[1];
                break;
            case 3:
                header = headerTemplatesSTEP0[2];
                break;
        }
        // replacing the templates strings like #[R1]# and #[V1]# with the row on which the operation is done
        // and creating a new header latex out of it, which gets stored in the header string
        valuesAndRow.map((rowandvalue, index) => {
            header = header.replace(`#[R${index}]#`, `${rowandvalue.row}`);
            header = header.replace(`#[V${index}]#`, `${rowandvalue.dividingVal}`);
        });

        // ***** Reasons accumulation ******
        // It will be the variable that'll be storing the final combined reason
        let combinedReason = String.raw` `;
        reasons.map((data, index) => {
            combinedReason = combinedReason + data + (index === (reasons.length - 1) ? String.raw`` : String.raw`\text{, }`);
        });

        // Creating instance of RowOperationData after it's being complete
        input_data.questionData = questionData;
        let rowOperationData = new RowOperationData(header, questionData, combinedReason);
        input_data.latex_array.push(rowOperationData);
    }
    return input_data;
}
export default Step0;