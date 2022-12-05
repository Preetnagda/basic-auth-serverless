import {body} from "express-validator";

const loginValidator = [
  body("username").isString(),
  body("password").isString(),
]

const registrationValidator = [
  body("username").isString(),
  body("password").isString(),
  body("email").isEmail(),
]

export { loginValidator, registrationValidator };
