import { Request, Response, NextFunction } from "express";
import { hashSync, compareSync } from "bcryptjs";
import User from "../schema/User";
import { sign, Secret } from "jsonwebtoken";

const loginController = (req: Request, res: Response): void => {
  User.get(req.body.username, function (err, user) {
    // If user is not found return with 401
    if (err || !user) return res.status(401).send({ auth: false, token: null });
    // Compare password with found user's password
    const passwordIsValid = compareSync(req.body.password, user.attrs.password);
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });
    //   Create a token for the logged in user
    const token = sign(
      { username: user.attrs.username },
      process.env.JWT_SECRET_TOKEN as Secret,
      {
        expiresIn: 86400, // expires in 24 hours
      }
    );
    res.status(200).send({ auth: true, token: token });
  });
};

const registerController = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const hashedPassword = hashSync(req.body.password);
  const body = {
    email: req.body.email,
    password: hashedPassword,
    username: req.body.username,
  };
  User.create(body, { overwrite: false }, (err, user) => {
    if (err) {
      next(err);
    } else {
      res.send({
        username: user.attrs.username,
      });
    }
  });
};

export { loginController, registerController };
