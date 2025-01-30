import prisma from "../config/db.config.js";
class GroupUserController {
    static async index(req, res) {
        try {
            const { group_id } = req.query;
            const users = await prisma.groupUser.findMany({
                where: {
                    group_id: group_id
                }
            });
            res.json({ message: "Data fetched successfully", data: users });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "something went wrong", data: error });
        }
    }
    static async store(req, res) {
        try {
            const body = req.body;
            const users = await prisma.groupUser.create({
                data: body
            });
            res.json({ message: "User created successfully", data: users });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "something went wrong", data: error });
        }
    }
}
export default GroupUserController;
