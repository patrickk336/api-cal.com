import express from "express";
import calcom from "./routes/calcom.routes";
import user from "./routes/user.routes";
import n8nTesting from "./routes/n8nTesting.routes";

export default (app) => {
    app.use(express.json());
    app.use('/api/calcom', calcom);
    app.use('/api/user', user);
    app.use('/api/n8n-testing', n8nTesting);
}