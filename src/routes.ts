import express from "express";
import calcom from "./routes/calcom.routes";
import user from "./routes/user.routes";

export default (app) => {
    app.use(express.json());
    app.use('/api/calcom', calcom);
    app.use('/api/user', user);
}