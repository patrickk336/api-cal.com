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
exports.n8nTestingController = void 0;
const appDataSource_1 = require("../settings/appDataSource");
class n8nTestingController {
    static getGrades(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { studentId } = req.body;
            if (!studentId) {
                return res.status(400).json({ error: "Student ID is required" });
            }
            const gradesRepository = appDataSource_1.AppDataSource.getRepository("grades");
            try {
                const grades = yield gradesRepository.find({ where: { student_id: studentId } });
                if (grades.length === 0) {
                    return res.status(404).json({ message: "No grades found for this student" });
                }
                const formattedGrades = {
                    outputFromAPI: {
                        student_id: studentId,
                        grades: grades.map(g => ({
                            [g.title]: g.grade
                        }))
                    }
                };
                res.status(200).json(formattedGrades);
            }
            catch (error) {
                console.error("Error fetching grades:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    static createApproval(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { apiOutput, aiOutput, score, approvalStatus } = req.body;
            if (!apiOutput || !aiOutput || score === undefined || approvalStatus === undefined) {
                return res.status(400).json({ error: "All fields are required" });
            }
            const approvalsRepository = appDataSource_1.AppDataSource.getRepository("approvals");
            try {
                const newApproval = approvalsRepository.create({
                    api_output: apiOutput,
                    ai_output: aiOutput,
                    score: score,
                    approval_status: approvalStatus
                });
                const savedApproval = yield approvalsRepository.save(newApproval);
                res.status(201).json({
                    message: "Approval created successfully",
                    approval: savedApproval
                });
            }
            catch (error) {
                console.error("Error creating approval:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    static createImageScan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { scanData, formatData } = req.body;
            if (!scanData) {
                return res.status(400).json({ error: "Scan data is required" });
            }
            const imageScansRepository = appDataSource_1.AppDataSource.getRepository("image_scans");
            try {
                const newScan = imageScansRepository.create({
                    scan_data_no_format: scanData,
                    scan_data_formatted: formatData,
                });
                const savedScan = yield imageScansRepository.save(newScan);
                res.status(201).json({
                    message: "Image scan created successfully",
                    scan: savedScan
                });
            }
            catch (error) {
                console.error("Error creating image scan:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.n8nTestingController = n8nTestingController;
