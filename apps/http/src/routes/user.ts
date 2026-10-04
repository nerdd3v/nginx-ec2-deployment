import { Router } from "express";
import client from "@repo/db/client"

export const userRouter:Router =  Router();

userRouter.post("/signup", async(req, res)=>{
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({
            message: "username or password not found"
        })
    }

    try {
        const checkUsernameExists = await client.user.findFirst({
            where:{
                username
            }
        })

        if(checkUsernameExists != null){
            return res.status(400).json({
                message: 'username already exists'
            })
        }

        const resp =await client.user.create({
            data:{
                username,
                password
            }
        })
        return res.status(200).json({
            message: 'username added to the db',
            id: resp.id
        })
    } catch (error) {
        return res.status(500).json({
            message: 'internal server error'
        })
    }
})