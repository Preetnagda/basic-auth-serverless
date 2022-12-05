import { validationResult} from "express-validator";
import { interfaces} from "inversify-express-utils";


export function validateWithRes(){
    return function(target: interfaces.Controller, propertyKey: string, descriptor: PropertyDescriptor){
      const originalMethod = descriptor.value;
  
      descriptor.value = function(...args: any[]){
        const req = args[args.length - 3];
        const errors = validationResult(req);
        if(!errors.isEmpty()){
          return args[2].status(400).send(errors.array());
        }else{
          return originalMethod.apply(this, args);
        }
      }
    }
  }