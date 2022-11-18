import {Router} from "express"

import {validate, Validators, signUp} from "@controller/auth.controller"

const authRoutes = Router();

authRoutes.post('signup', validate(Validators.signup), signUp);
authRoutes.post('login');

export default authRoutes;
