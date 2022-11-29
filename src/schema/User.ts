import * as dynamo from "dynamodb";
import * as Joi from "joi";

interface UserInterface {
  username: string;
  email: string;
  password: string;
}

const UserSchema = {
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string(),

  //   repeat_password: Joi.ref("password"),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
};

const UserModel = dynamo.define("User", {
  hashKey: "username",
  schema: UserSchema,
});

export { UserInterface };
export default UserModel;
