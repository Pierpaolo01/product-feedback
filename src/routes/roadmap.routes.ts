import {Router} from "express"
import {showRoadmapCount} from "@controllers/roadmap.controller";
import {isAuth} from "@src/middleware/auth.middleware";

export const roadmapRoutes = Router()

roadmapRoutes.get('/roadmap/count', isAuth, showRoadmapCount)
