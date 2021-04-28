import { LatexAndQuestionData } from './shared/constants.ts';
import Step0 from './steps/step0.ts';
import Step1 from './steps/step1.ts';
import Step2 from './steps/step2.ts';
import Step3 from './steps/step3.ts';
import Step4 from './steps/step4.ts';
import Step5 from './steps/step5.ts';
import Step6 from './steps/step6.ts';
import Step7 from './steps/step7.ts';
import Step8 from './steps/step8.ts';
import Step9 from './steps/step9.ts';

// row_equiv_solve takes an argument of rows of arrays  
// rows of arrays that represent column  Eg. [[1,2,3,4],[1,2,2,2],[2,3,2,1]]
const row_equiv_solve = (questionData: number[][]) => {
    let _latexquestionanddata = new LatexAndQuestionData(questionData, []);
    return Step9(Step8(Step7(Step6(Step5(Step4(Step3(Step2(Step1(Step0(_latexquestionanddata))))))))));
}

export default row_equiv_solve;
