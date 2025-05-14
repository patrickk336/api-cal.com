import { Request, Response } from "express";
import { AppDataSource } from "../settings/appDataSource";

export class signInController {
    static async signIn(req: Request, res: Response) {
        const { name, password } = req.body;
        const userRepository = AppDataSource.getRepository("User");
        const user = await userRepository.findOne({ where : { name, password } });

        if(user) {
            res.status(200).json({ message: "User authenticated successfully" });
        }
        else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    }
}