import { Request,Response } from "express";
import prisma from "../config/db.config.js";
interface GroupUserType{
    group_id:string;
    name:string;
}
class GroupUserController {
    static async  index(req:Request,res:Response) {
        try {
            const {group_id} = req.query;
            const users = await prisma.groupUser.findMany({
                where: {
                    group_id: group_id as string
                }
            });
            res.json({message:"Data fetched successfully",data:users})
        } catch (error) {
            res
            .status(500)
            .json({message:"something went wrong",data:error})
        }
    }


    static async  store(req:Request,res:Response) {
        try {
            const body:GroupUserType = req.body ;
            const users = await prisma.groupUser.create({
               data:body
            });
            res.json({message:"User created successfully",data:users})
        } catch (error) {
            res
            .status(500)
            .json({message:"something went wrong",data:error})
        }
    }
}
export default GroupUserController;