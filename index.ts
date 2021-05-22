import * as GUIDEONEB_TOOLS from './src/exports.ts';
import * as WRAPPER from './worker_wrapper.js';

const _WORKER0 = new WRAPPER.WorkerWrapper();
const _WORKER1 = new WRAPPER.WorkerWrapper();

const solver = ()=>{
    let a = performance.now();
    for (let x = 0; x<1000; x++){
        if(x%2 === 0){
           _WORKER0.solve("GAUSS_SIEDEL", {equation1:`2x+y=${x}`,equation2: "x+3y+10z=12",equation3:"10z=2"}).then(()=>{
                if(x === 9999){
                    console.log(performance.now()-a);
                };
          });
        }else{
           _WORKER1.solve("GAUSS_SIEDEL", {equation1:`2x+y=${x}`,equation2: "x+3y+10z=12",equation3:"10z=2"}).then(()=>{
                if(x === 9999){
                    console.log(performance.now()-a);
                };
          });
        }
    }
}

solver();
