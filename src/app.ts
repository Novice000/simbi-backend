import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { corsConfig } from "./config/cors";
import morgan from "./utils/logger";
import { NotFoundError } from "./utils/errorClasses";
import userAndAuthRouter from "./routes/userAndAuth.routes";
import { errorHandler } from "./middlewares/error.middlewares";
import Config from "./config/settings";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors(corsConfig));

/*
* MORGAN LOGGER MIDDLEWARE
*/
app.use(morgan("[ :date ] :coloured-method :url :status :response-time ms"));

/*
* USERS AND AUTHENTICATION ROUTES
*/
app.use(`/api/v${Config.API_VERSION}`, userAndAuthRouter);

/*
* HOME ROUTE AND HEALTH CHECK
*/
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "Welcome to Simbi-Backend" });
});

/**
 * CATCH ALL ROUTE
 */
app.all('*"catch_all"', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Cannot find ${req.originalUrl} on this server`));
});

// GLOBAL ERROR HANDLING
app.use(errorHandler);
export default app;
