"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: 'mysql-patrick36.alwaysdata.net',
    port: 3306,
    username: 'patrick36',
    password: 'batikha5678',
    database: 'patrick36_testing',
    synchronize: true,
    logging: false,
    entities: ['dist/models/entities/*.js'],
    migrations: [],
    subscribers: [],
    timezone: 'Asia/Beirut'
});
