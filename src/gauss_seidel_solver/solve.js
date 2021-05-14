import { GaussSiedelQuestionParser } from "./GuassSiedelQuestionParser.js";
import grabAllVariables from "./grabAllVariables.js";
import addMissingVars from "./addMissingVars.js";
import EquationProcessLatex from "./equationProcessLatex.js";
const gaussSiedelQuestion = new GaussSiedelQuestionParser(
  "10z+2y=30",
  "x+5y+z=10",
  "10x=50"
);

// gauss_siedel_solve takes only one parameter and it is quest, which is basically question of Guass Siedel
// quest => It's an object of class GaussSiedelQuestionParser
const gauss_siedel_solve = (quest) =>{
    const allVariables = grabAllVariables(quest);
}
