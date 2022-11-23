import {Router} from "express";

import {
    createSuggestion, deleteSuggestion,
    SuggestionValidate,
    SuggestionValidators,
    updateSuggestion
} from "@controllers/suggestion.controller"
import {catchValidationError} from "@src/middleware/validationError.middleware";
import {isAuth} from "@src/middleware/auth.middleware";

export const suggestionRoutes = Router();

suggestionRoutes.post('/suggestion', isAuth, SuggestionValidate(SuggestionValidators.create), catchValidationError, createSuggestion)

suggestionRoutes.put('/suggestion/:suggestionId', isAuth, SuggestionValidate(SuggestionValidators.update), catchValidationError, updateSuggestion)

suggestionRoutes.delete('/suggestion/:suggestionId', isAuth, deleteSuggestion)

