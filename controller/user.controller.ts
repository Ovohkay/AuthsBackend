import userModel  from "../models/user.model"
import { NextFunction, Request, Response } from "express"
import bycrypt from "bcrypt"
import { asyncHandler } from "../Utils/asyncHandler"
import { AppError, HttpCode } from "../Utils/AppError"
import { Iuser } from "../interfaces/User"
import { generateToken } from "../middlewares/authorization/user.auth"

export const register = asyncHandler (async(req: Request<{},{},Iuser>,res: Response,next: NextFunction ): Promise<Response> =>{
    
    const {name, email, password, confirmPassword }= req.body 

    const salt : string = await bycrypt.genSalt(10)
    const hashPassword = await bycrypt.hash(password, salt)

    const user = await userModel.create({
        name, email, password:hashPassword, confirmPassword :hashPassword
    })

    if(!user) 
       {
        next(
            new AppError({
                message: "Account not created",
                httpCode: HttpCode.BAD_REQUEST,
                isOperational: true
            })
        )
       }
    
       return res.status(HttpCode.CREATED).json({
        message: `${user!.name} , you are welcome`,
        
    })

})

export const login = asyncHandler (async (req: Request <{},{},Iuser>, res: Response, next: NextFunction): Promise<Response> =>{
   
    const {email, password} = req.body
    const user = await userModel.findOne({email})
   
    const checkPassword = await bycrypt.compare(password, user!.password)
   
    if(!user || password){
        next (
            new AppError({
                message: "user not found",
                httpCode: HttpCode.NOT_FOUND,
               
            })
        )
    }
    if(!checkPassword) {
        next (
            new AppError({
                message: "Invalid password or email",
                httpCode: HttpCode.UNAUTHORISED,
               
            })
        )
    }
    const Token = generateToken({email: user!.email, _id: user!._id})
   
    return res.status(HttpCode.CREATED).json({
        message: `welcome ${user!.name}`,
        Token
    })

})

export const getAll = asyncHandler( async (req: Request, res: Response, next: NextFunction): Promise<Response> =>{
   
        const user = await userModel.find()
       


        return res.status(HttpCode.OK).json({
            message: `${user.length} user(s)`,
            data: user

            
        })
        
    
})
