import express from "express";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerFile from "../src/swagger.json";

import "./database";

import './shared/container';

const app = express();

app.use(express.json());

app.use("/app-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router)

app.listen(3333, () => console.log("Server is running!"));