export type ParsedEquationType = {
    latexArray : string[];
    leftVars : string[];
    rightConstant : string[];
}

export type GaussSiedelQuestionParserType = {
   equation1 : ParsedEquationType;
   equation2 : ParsedEquationType;
   equation3 : ParsedEquationType;
}

export type KeyOfQuestion = keyof GaussSiedelQuestionParserType;
export type STEP1 = {
    latex : string,
    leftVarAndRightConst : {
      leftVars : string[],
      rightConstant : string[] 
    }
}[]

export type STEP2 = {

}
