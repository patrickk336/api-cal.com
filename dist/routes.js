"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const calcom_routes_1 = __importDefault(require("./routes/calcom.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
exports.default = (app) => {
    app.use(express_1.default.json());
    app.use('/api/calcom', calcom_routes_1.default);
    app.use('/api/user', user_routes_1.default);
};
