import { Response } from "express";
import { interfaces, controller, httpGet, response} from "inversify-express-utils";

@controller("/")
export class HeartbeatController implements interfaces.Controller {
  @httpGet("/")
  public heartbeat(@response() res: Response){
    return res.status(200).json({msg: "ok"})
  }
}

