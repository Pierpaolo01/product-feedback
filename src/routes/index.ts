import {Router} from "express";

import {suggestionRoutes} from "@routes/suggestion.routes";
import {authRoutes} from "@routes/auth.routes";
import {commentRoutes} from "@routes/comment.routes";
import {roadmapRoutes} from "@routes/roadmap.routes";

export const routes = Router();

routes.use('/api', authRoutes)
routes.use('/api', suggestionRoutes)
routes.use('/api', commentRoutes)
routes.use('/api', roadmapRoutes)
