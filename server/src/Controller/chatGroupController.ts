import { Request, Response } from "express";
import prisma from "../config/db.config.js";

class ChatGroupController {
    static async store(req: Request, res: Response): Promise<void> {
        try {
            const body = req.body;
            const user = req.user;

            await prisma.chatGroup.create({
                data: {
                    title: body.title,
                    passcode: body.passcode,
                    user_id: user.id,
                },
            });

            res.json({ message: "Chat group created successfully" }); // Do not return this
        } catch (error: any) {
            res.status(500).json({ message: error.message }); // Do not return this
        }
    }

    static async index(req: Request, res: Response): Promise<void> {
        try {
            const user = req.user;

            const groups = await prisma.chatGroup.findMany({
                where: {
                    user_id: user.id,
                },
                orderBy: {
                    created_at: 'desc',
                },
            });

            res.json({ data: groups }); // Do not return this
        } catch (error: any) {
            res.status(500).json({ message: error.message }); // Do not return this
        }
    }

    static async show(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            console.log("id",id);
            

            if (id) {
                const group = await prisma.chatGroup.findUnique({
                    where: {
                        id: id,
                    },
                });

                if (group) {
                    res.json({ data: group }); // Do not return this
                    return;
                }
            }
            res.status(404).json({ message: "No groups found" });
        } catch (error: any) {
            res.status(500).json({ message: error.message }); // Do not return this
        }
    }

    static async update(req: Request, res: Response): Promise<void> {
      try {
          const body = req.body;
          const { id } = req.params;

          if (id) {
              await prisma.chatGroup.update({
                data:body,
                  where: {
                      id: id,
                  },
              });

                  res.json({ message:"update successfully" }); // Do not return this
                  return;
              
          }
          res.status(404).json({ message: "No groups found" });
      } catch (error: any) {
          res.status(500).json({ message: error.message }); // Do not return this
      }
  }
  static async destroy(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;

        if (id) {
            await prisma.chatGroup.delete({
                where: {
                    id: id,
                },
            });

                res.json({ message:"delete successfully" }); // Do not return this
                return;
            
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message }); // Do not return this
    }
}

  
}

export default ChatGroupController;
