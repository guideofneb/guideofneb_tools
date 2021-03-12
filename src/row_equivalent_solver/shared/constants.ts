

export enum ROW {
    R1 = 1,
    R2 = 2,
    R3 = 3,
}

/* It is the class whose instance is returned after completion of every 
step "process" from step 0 to step 9 */
export class RowOperationData {
    public heading_data: string;
    public mutated_row: Array<Array<number>>;
    public reason: string;
    constructor(heading_data: string, mutated_row: Array<Array<number>>, reason: string) {
        this.heading_data = heading_data;
        this.mutated_row = mutated_row;
        this.reason = reason;
    }
}

/* It is the class whose instance is used to pass data to the step and returned
after completion of every "step" */
export class LatexAndQuestionData {
    questionData: Array<Array<number>>;
    latex_array: Array<RowOperationData> = [];
    constructor(questionData: Array<Array<number>>, latex_array: Array<RowOperationData>) {
        this.questionData = questionData;
        this.latex_array = latex_array;
    }

}

