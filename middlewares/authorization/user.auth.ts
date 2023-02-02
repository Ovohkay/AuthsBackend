
import {Request,Response, NextFunction } from "express";
import jwt, {JwtPayload, Secret, VerifyErrors} from "jsonwebtoken";
import { Iuser } from "../../interfaces/User";
import userModel from "../../models/user.model";
import { AppError, HttpCode } from "../../utils/AppError";

interface Payload extends JwtPayload  {
    _id: string,
    email: string

}

const secret = "htyjjedttynsssthhha"
export const generateToken = (user: Payload) => {
    return jwt.sign(user, secret as Secret, {expiresIn: "1h"})
}

 export const userAuth = (req: Request,res: Response, next: NextFunction) =>{
    //make request for our token from the headers

    const headers = req.headers.authorization ;
    if(!headers || !headers.startsWith("Bearer ")) {
        next (
            new AppError({
                httpCode: HttpCode.UNAUTHORISED,
                message: "you are not authorised"
            })
        )
    }

    const token: string = headers!.split(" ")[1] 

    // verify the token payload
    jwt.verify(
        token, 
        secret as Secret,
        async (err: VerifyErrors | null , decodedUser: any) => {
            if(err){
                const errorMsg = err.name === "JsonTokenError" ?
                 "invaild token, you are authorised" :  err.message;

                next (
                    new AppError({
                        httpCode: HttpCode.UNAUTHORISED,
                        message: errorMsg
                    })
                 )

            }
            try {
                const verifiedError = await userModel.findOne({_id: decodedUser!._id})
                if(!verifiedError){
                    next(
                        new AppError({
                            httpCode: HttpCode.UNAUTHORISED,
                            message: "unauthorised user",

                        })
                    )

                }

                req!.user = verifiedError as Iuser
                next()
            } catch (error: any) {
                next(
                    
                        new AppError({
                            httpCode: HttpCode.INTERNAL_SERVER_ERROR,
                            message: error,
                        })
                    
                )
            }

            
        }
    )

 }