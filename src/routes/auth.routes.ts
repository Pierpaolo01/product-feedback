import {Router} from "express"

import {signUp, login, validate, Validators} from "@controllers/auth.controller"

export const authRoutes = Router();

authRoutes.post('/signup', validate(Validators.signup), signUp);
authRoutes.post('/login', validate(Validators.login), login);


