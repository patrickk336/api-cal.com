import express from "express";
import calcom from "./routes/calcom.routes";

export default (app) => {
    app.use(express.json());
    app.use('/api/calcom', calcom);
}