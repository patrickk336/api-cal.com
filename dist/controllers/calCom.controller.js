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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCalCom = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const dates_1 = require("../utils/dates");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getCalCom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!process.env.CALCOM_AUTHORIZATION) {
            throw new Error('CALCOM_AUTHORIZATION is not set in the environment variables.');
        }
        const options = {
            method: 'GET',
            headers: {
                Authorization: process.env.CALCOM_AUTHORIZATION,
                'cal-api-version': '2024-09-04',
            },
        };
        const url = `https://api.cal.com/v2/slots?eventTypeId=${process.env.CALCOM_EVENT_ID}&start=${(0, dates_1.getStartDate)()}&end=${(0, dates_1.getEndDate)()}`;
        const response = yield (0, node_fetch_1.default)(url, options);
        const data = yield response.json();
        if (!response.ok) {
            throw new Error(`Failed to fetch data`);
        }
        const dates = Object.keys(data.data);
        console.log(dates);
        res.status(200).json({ dates });
    }
    catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});
exports.getCalCom = getCalCom;
