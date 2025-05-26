import { Request, Response } from "express";
import { AppDataSource } from "../settings/appDataSource";

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
            output: {
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
}