import {prismaClient} from "../application/database.js";
// import * as jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end();
    } else {
        // const secret = process.env.JWT_SECRET;
        //
        // try {
        //     const jwtDecode = jwt.verify(token, secret)
        // } catch (e) {
        //     res.status(401).json({
        //         errors: "Invalid Token"
        //     }).end();
        // }

        const user = await prismaClient.user.findFirst({
            where: {
                token: token
            }
        });
        if (!user) {
            res.status(401).json({
                errors: "Unauthorized"
            }).end();
        } else {
            req.user = user;
            next();
        }
    }
}
