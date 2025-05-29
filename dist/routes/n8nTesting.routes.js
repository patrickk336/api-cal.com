"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const n8nTesting_controller_1 = require("../controllers/n8nTesting.controller");
const router = express_1.default.Router();
router.post('/', n8nTesting_controller_1.n8nTestingController.getGrades);
router.post('/approval', n8nTesting_controller_1.n8nTestingController.createApproval);
exports.default = router;
