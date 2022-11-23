import {Router} from "express";

import {suggestionRoutes} from "@routes/suggestion.routes";
import {authRoutes} from "@routes/auth.routes";

export const routes = Router();

routes.use('/api', authRoutes)
routes.use('/api', suggestionRoutes)
