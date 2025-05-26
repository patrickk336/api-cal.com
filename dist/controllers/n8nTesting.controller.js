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
                    student_id: studentId,
                    grades: grades.map(grade => ({
                        [grade.title]: grade.grade
                    }))
                };
                res.status(200).json(formattedGrades);
            }
            catch (error) {
                console.error("Error fetching grades:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.n8nTestingController = n8nTestingController;
