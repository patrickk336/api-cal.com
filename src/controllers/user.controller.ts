import { Request, Response } from "express";
import { AppDataSource } from "../settings/appDataSource";

export class UserController {
    static otpGenerator(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static async signIn(req: Request, res: Response) {
        const { name } = (req.body).toLowerCase();
        const { password } = req.body;
        const userRepository = AppDataSource.getRepository("users");
        try {
            const user = await userRepository.findOne({ where : { name, password } });

            if(user) {
                res.status(200).json({ 
                    message: "User authenticated successfully",
                    success: "true"
                });
            }
            else {
                res.status(401).json({ 
                    message: "Invalid credentials",
                    success: "false"
                });
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async signUp(req: Request, res: Response) {
        const { name, password } = req.body;
        const userRepository = AppDataSource.getRepository("users");
        try {
            const existingUser = await userRepository.findOne({ where: { name } });
            if (existingUser) {
                res.status(409).json({ 
                    message: "User already exists",
                    success: "false"
                 });
            } else if (existingUser && !existingUser.isVerified) {
                const otp = this.otpGenerator(100000, 999999);
                await userRepository.update({ where: { name } }, { otp });
                res.status(201).json({ 
                    message: "User created successfully",
                    success: "true",
                 });
            } else {
                const otp = this.otpGenerator(100000, 999999);
                const newUser = await userRepository.create({ name, password, otp });
                await userRepository.save(newUser);
                res.status(201).json({ 
                    message: "User created successfully",
                    success: "true",
                 });
            }
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ message: "Inernal server error" });
        }
    }

    static async verifyUser(req: Request, res: Response) {
        const { name, otp } = req.body;
        const userRepositry = AppDataSource.getRepository("users");
        try {
            const user = await userRepositry.findOne({ where: { name } });
            if (!user) {
                res.status(404).json({ message: "User not found" });
            } else if (user.otp !== otp) {
                res.status(401).json({ message: "Invalid OTP" });
            } else {
                await userRepositry.update({ where: { name } }, { isVerified: true });
                res.status(200).json({ message: "User verified successfully" });
            }
        } catch (error) {
            console.error("Error verifying user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}