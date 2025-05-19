"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const appDataSource_1 = require("../settings/appDataSource");
class UserController {
    static otpGenerator(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { name, password } = req.body;
            name = name.toLowerCase();
            const userRepository = appDataSource_1.AppDataSource.getRepository("users");
            try {
                const user = yield userRepository.findOne({ where: { name, password } });
                if (user) {
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
            }
            catch (error) {
                console.error("Error during authentication:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    static signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { name, password } = req.body;
            name = name.toLowerCase();
            const userRepository = appDataSource_1.AppDataSource.getRepository("users");
            try {
                const existingUser = yield userRepository.findOne({ where: { name } });
                if (existingUser) {
                    res.status(409).json({
                        message: "User already exists",
                        success: "false"
                    });
                }
                else if (existingUser && !existingUser.isVerified) {
                    const otp = this.otpGenerator(100000, 999999);
                    yield userRepository.update({ where: { name } }, { otp });
                    res.status(201).json({
                        message: "User created successfully",
                        success: "true",
                    });
                }
                else {
                    const otp = this.otpGenerator(100000, 999999);
                    const newUser = yield userRepository.create({ name, password, otp });
                    yield userRepository.save(newUser);
                    res.status(201).json({
                        message: "User created successfully",
                        success: "true",
                    });
                }
            }
            catch (error) {
                console.error("Error creating user:", error);
                res.status(500).json({ message: "Inernal server error" });
            }
        });
    }
    static verifyUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { name, otp } = req.body;
            name = name.toLowerCase();
            const userRepositry = appDataSource_1.AppDataSource.getRepository("users");
            try {
                const user = yield userRepositry.findOne({ where: { name } });
                if (!user) {
                    res.status(404).json({
                        message: "User not found",
                        success: "false1"
                    });
                }
                else if (user.otp !== otp) {
                    res.status(401).json({
                        message: "Invalid OTP",
                        success: "false2"
                    });
                }
                else {
                    yield userRepositry.update({ where: { name } }, { isVerified: true });
                    res.status(200).json({
                        message: "User verified successfully",
                        success: "true"
                    });
                }
            }
            catch (error) {
                console.error("Error verifying user:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.UserController = UserController;
