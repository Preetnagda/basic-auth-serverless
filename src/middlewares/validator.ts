import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

const validate =
  (
    schema: ObjectSchema
  ): ((req: Request, res: Response, next: NextFunction) => any) =>
  (req: Request, res: Response, next: NextFunction): any => {
    const { value, error } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      return next(new Error(errorMessage));
    }

    return next();
  };

export default validate;
