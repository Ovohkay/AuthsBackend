import userSchema from "./userSchema";
import {validator} from "../productValidation/validators";
import { RequestHandler, Request, Response, NextFunction } from "express";

// Validation middleware functions
export const registerValidation: RequestHandler = (
  req,
  res,
  next
) => {
  validator(userSchema.register, req.body, next);
};

export const loginValidation: RequestHandler = (
  req,
  res,
  next
) => {
  validator(userSchema.login, req.body, next);
};