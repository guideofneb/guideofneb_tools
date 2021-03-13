import { LatexAndQuestionData } from './shared/constants';
import Step0 from './steps/step0';
import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';
// row_equiv_solve takes an argument of rows of arrays  
// rows of arrays that represent column  Eg. [[1,2,3,4],[1,2,2,2],[2,3,2,1]]
const row_equiv_solve = (questionData: number[][]) => {
    let _latexquestionanddata = new LatexAndQuestionData(questionData, []);
    return Step3(Step2(Step1(Step0(_latexquestionanddata))));
}

export default row_equiv_solve;