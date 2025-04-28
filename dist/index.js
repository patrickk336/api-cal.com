"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
(0, routes_1.default)(app);
app.get('/', (req, res) => {
    res.send('Hello Beautiful');
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
