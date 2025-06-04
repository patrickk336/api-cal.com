import { Request, Response } from "express";
import { AppDataSource } from "../settings/appDataSource";
import { fromBase64 } from "pdf2pic";

export class n8nTestingController {
    static async getGrades(req: Request, res: Response): Promise<any> {
        const { studentId } = req.body;
        if (!studentId) {
            return res.status(400).json({ error: "Student ID is required" });
        }
        const gradesRepository = AppDataSource.getRepository("grades");

        try {
            const grades = await gradesRepository.find({ where: { student_id: studentId } });
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
        } catch (error) {
            console.error("Error fetching grades:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    public static async createApproval(req: Request, res: Response): Promise<any> {
        const { apiOutput, aiOutput, score, approvalStatus } = req.body;

        if (!apiOutput || !aiOutput || score === undefined || approvalStatus === undefined) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const approvalsRepository = AppDataSource.getRepository("approvals");
        try {
            const newApproval = approvalsRepository.create({
                api_output: apiOutput,
                ai_output: aiOutput,
                score: score,
                approval_status: approvalStatus
            });
            const savedApproval = await approvalsRepository.save(newApproval);

            res.status(201).json({
                message: "Approval created successfully",
                approval: savedApproval
            });
        } catch (error) {
            console.error("Error creating approval:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    public static async createImageScan(req: Request, res: Response): Promise<any> {
        const { scanData } = req.body;
        if (!scanData) {
            return res.status(400).json({ error: "Scan data is required" });
        }

        const imageScansRepository = AppDataSource.getRepository("image_scans");

        try {
            const newScan = imageScansRepository.create({
                scan_data: scanData
            });

            const savedScan = await imageScansRepository.save(newScan);

            res.status(201).json({
                message: "Image scan created successfully",
                scan: savedScan
            });
        } catch (error) {
            console.error("Error creating image scan:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}