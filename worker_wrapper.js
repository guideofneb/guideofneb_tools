//const resolves : {[key: string]: any} = {};
//const rejects : {[key: string]: any}= {};
const resolves = {};
const rejects = {};
let globalMsgId = 0;

// (payload: any, worker: Worker)
const sendQuestion = (payload, worker) => {
    const msgId = globalMsgId++;
    const msg = {
        id : msgId,
        payload
    }
    return new Promise((resolve, reject)=>{
            //Save callback for later
            resolves[msgId] = resolve
            rejects[msgId] = reject
            worker.postMessage(msg);
    });
}

const handleMsg = (ev)=>{
    const {id, answer,error} = ev.data;
    if(answer){
        const resolve = resolves[id]
        if(resolve){
            resolve(answer);
        }
    }else{
        const reject = resolves[id]
        if(reject){
            if(error !== null){
                reject(error)
            }else {
                reject("GOT_NOTHING")
            }

        }
    }
    // Remove used callbacks
    delete resolves[id]
    delete rejects[id]
}

export class WorkerWrapper {
    constructor(){
        this.worker0 = new Worker(new URL("./workers/worker.js", import.meta.url).href, { type: "module"  })
        this.worker0.addEventListener('message',(e)=> handleMsg(e));

    }
    //questionType: string quesitonArgs:{[key: string]: any}
    solve(questionType, questionArgs){
        return sendQuestion({questionType, questionArgs}, this.worker0)
    }
}
