import { CorsOptions } from "cors";
import Config from "./settings";

export const corsConfig: CorsOptions = {
    origin: Config.ALLOWED_ORIGINS,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
};