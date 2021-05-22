import * as GUIDEONEB_TOOLS from '../src/exports.ts';

self.addEventListener("message",(e)=>{
    // Eg. 
    // id => 1
    // payload => {
    //      questionType : "GAUSS_SIEDEL_SOLVER",
    //      questionArgs : {
    //          equation1 : "",
    //          equation2 : "",
    //          equation3 : ""
    //      }
    // }
    const {id ,payload}  = e.data;
    if(payload){
        let error = null;
        let answer = null;
        switch(payload.questionType){
            case "GAUSS_SIEDEL":
                try{
                    answer = GUIDEONEB_TOOLS.GAUSS_SIEDEL_SOLVER(...Object.values(payload.questionArgs));
                }catch(er){
                    error = er;
                }
            break;
        }
        self.postMessage({id,answer,error})
    }
})
