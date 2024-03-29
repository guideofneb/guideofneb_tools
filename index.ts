import { serve } from "https://deno.land/std@0.97.0/http/server.ts";
import * as WRAPPER from './worker_wrapper.js';

const _WORKER0 = new WRAPPER.WorkerWrapper();
const _WORKER1 = new WRAPPER.WorkerWrapper();

const server = serve({ port: 8080 });
let aa = 1;
let currentWorker = 0;
for await (const request of server) {
  if(request.method === "POST"){
    const a = performance.now();
    if(currentWorker === 0){
      _WORKER1.solve("GAUSS_SIEDEL", {equation1:`2x+y=10`,equation2: "x+3y+10y=12",equation3:"10z=2"}).then((d)=>{
       const bodyContent = d;
       console.log(performance.now()-a);
       request.respond({ status: 200, body: bodyContent });
    });
      currentWorker = 1;
    }else {
      _WORKER0.solve("GAUSS_SIEDEL", {equation1:`2x+y=10`,equation2: "x+3y+10y=12",equation3:"10z=2"}).then((d)=>{
       const bodyContent = d;
       console.log(performance.now()-a);
       request.respond({ status: 200, body: bodyContent });
    });
      currentWorker = 0;
    }

  }


}
