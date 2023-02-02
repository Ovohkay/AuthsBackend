
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors"

import morgan from "morgan"
import { errorHandler } from "./middlewares/errHandler";
import { AppError, HttpCode } from "./utils/AppError"
import router from "./Route/userRoutes";

const appConfig=(app:Application)=> {
    //middlewares
app.use(express.json()).use(cors()).use(morgan("dev"))

 // router configuration
 

//routes
.use("/api/user", router)

.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(
      new AppError({
        message: `This route ${req.originalUrl} does not exist`,
        httpCode: HttpCode.NOT_FOUND,
        isOperational: true,
      })
    );
  })


 // error handlers; note: it should be the last in your app
 .use(errorHandler);
}
export default appConfig