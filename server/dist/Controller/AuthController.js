var _a;
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";
class AuthController {
}
_a = AuthController;
AuthController.login = async (req, res) => {
    try {
        const body = req.body;
        let findUser = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });
        if (!findUser) {
            findUser = await prisma.user.create({
                data: body,
            });
        }
        const jwtPayload = {
            name: body.name,
            email: body.email,
            id: findUser.id,
        };
        const token = jwt.sign(jwtPayload, process.env.SECRET_KEY, {
            expiresIn: "365d",
        });
        res.json({
            message: "Logged in successfully",
            user: {
                ...findUser,
                token: `Bearer ${token}`,
            },
        });
    }
    catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Error logging in" });
    }
};
export default AuthController;
