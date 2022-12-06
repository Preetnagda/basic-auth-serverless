import { Request, Response, NextFunction } from "express";
import { hash, compare } from "bcryptjs";
import { sign, Secret } from "jsonwebtoken";
import { interfaces, controller, httpGet, httpPost, request, response, requestBody, next } from "inversify-express-utils";
import {UserAuth} from "../types/User";
import {User as UserService} from "../services/user.service";
import { inject } from "inversify";
import TYPES from "../di/types";
import { loginValidator, registrationValidator} from "../validations/auth.validations";
import {validateWithRes} from "../middlewares/validateParams";

@controller("/auth")
export class AuthController implements interfaces.Controller {

  private userService: UserService;

  constructor(@inject(TYPES.UserService) _userService: UserService) {
    this.userService = _userService;
  }

  @httpPost("/login", ...loginValidator)
  @validateWithRes()
  public login(@requestBody() _user:{username: string, password: string}, @request() req: Request, @response() res: Response) {

    return this.userService.getUserAuthDetails(_user.username)
      .then(user => {
        // If user is not found return with 401
        if (!user) return res.status(401).send({ auth: false, token: null });
        // Compare password with found user's password
        return compare(_user.password, user.password)
        .then(isValid => {
          if (!isValid)
          return res.status(401).send({ auth: false, token: null });
          //   Create a token for the logged in user
          const token = sign(
            { username: _user.username },
            process.env.JWT_SECRET_TOKEN as Secret,
            {
              expiresIn: 86400, // expires in 24 hours
            }
          );
          return res.status(200).send({ auth: true, token: token });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(400).send({ message: err})})
  }

  @httpPost("/register", ...registrationValidator)
  @validateWithRes()
  public register(@requestBody() _user: UserAuth, @response() res: Response, @next() next: NextFunction){
    return hash(_user.password, 10)
      .then((hashedPassword) => {
        const body = _user;
        body["password"] = hashedPassword
        return this.userService.createUser(body).then(res => res);
      })
      .catch(err => res.status(400).send({ message: err}));
  }
}

