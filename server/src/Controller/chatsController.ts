import { Request,Response } from "express";
import prisma from "../config/db.config.js";

class ChatsController {
    static async index(req: Request, res: Response) {
      try {
          const {group_id} = req.params
          const chats = await prisma.chats.findMany({
              where:{
                  group_id:group_id
              }
          })
          res.json({data:chats})
      } catch (error:any) {
        res
        .status(500)
        .json({message:error.message,
            data:error})
      }
    }
}
export default ChatsController;