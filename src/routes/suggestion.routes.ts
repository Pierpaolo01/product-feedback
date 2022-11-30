import {Router} from "express";

import {
    createSuggestion,
    indexSuggestions,
    deleteSuggestion,
    SuggestionValidate,
    SuggestionValidators,
    updateSuggestion,
    likeSuggestion,
    unlikeSuggestion
} from "@controllers/suggestion.controller"
import {catchValidationError} from "@src/middleware/validationError.middleware";
import {isAuth} from "@src/middleware/auth.middleware";

export const suggestionRoutes = Router();

suggestionRoutes.get('/suggestions', isAuth, indexSuggestions)

suggestionRoutes.post('/suggestion', isAuth, SuggestionValidate(SuggestionValidators.create), catchValidationError, createSuggestion)

suggestionRoutes.put('/suggestion/:suggestionId', isAuth, SuggestionValidate(SuggestionValidators.update), catchValidationError, updateSuggestion)

suggestionRoutes.delete('/suggestion/:suggestionId', isAuth, deleteSuggestion)

suggestionRoutes.post('/suggestion/:suggestionId/like', isAuth, likeSuggestion)

suggestionRoutes.delete('/suggestion/:suggestionId/unlike', isAuth, unlikeSuggestion)

