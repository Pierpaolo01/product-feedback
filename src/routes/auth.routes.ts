import {Router} from "express"

import {signUp, login, validate, Validators} from "@controllers/auth.controller"
import {catchValidationError} from "@src/middleware/validationError.middleware";

export const authRoutes = Router();

authRoutes.post('/signup', validate(Validators.signup), catchValidationError, signUp);
authRoutes.post('/login', validate(Validators.login), catchValidationError, login);


