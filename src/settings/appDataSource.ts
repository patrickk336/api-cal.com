import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource ({
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
    timezone:'Asia/Beirut'
})