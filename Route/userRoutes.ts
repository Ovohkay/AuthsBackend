import { Router } from "express";
import  {getAll, register} from "../controller/user.controller"
import { login } from "../controller/user.controller";
import { userAuth } from "../middlewares/authorization/user.auth";

import {
  loginValidation,
  registerValidation,} from "../validation/authValidation/uservalidation";

const router = Router();


// parsing validation middlewares
router.route("/register").post(registerValidation, register);
router.route("/login").post(loginValidation, login);
router.route("/getAll").get(userAuth, getAll);

export default router;
