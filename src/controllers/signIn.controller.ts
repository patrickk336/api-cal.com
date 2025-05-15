import { Request, Response } from "express";
import { AppDataSource } from "../settings/appDataSource";

export class UserController {
    static async signIn(req: Request, res: Response) {
        const { name, password } = req.body;
        const userRepository = AppDataSource.getRepository("User");
        try {
            const user = await userRepository.findOne({ where : { name, password } });

            if(user) {
                res.status(200).json({ message: "User authenticated successfully" });
            }
            else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async signUp(req: Request, res: Response) {
        const { name, password } = req.body;
        const userRepository = AppDataSource.getRepository("User");
        try {
            const existingUser = await userRepository.findOne({ where: { name } });
            if (existingUser) {
                res.status(409).json({ message: "User already exists" });
            } else {
                const newUser = userRepository.create({ name, password });
                await userRepository.save(newUser);
                res.status(201).json({ message: "User created successfully" });
            }
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ message: "Inernal server error" });
        }
    }
}