"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const calCom_controller_1 = require("../controllers/calCom.controller");
const router = express_1.default.Router();
router.get('/', calCom_controller_1.getCalCom);
exports.default = router;
