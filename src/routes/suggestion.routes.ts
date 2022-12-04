import {Router} from "express";

import {
    createSuggestion,
    indexSuggestions,
    showSuggestion,
    deleteSuggestion,
    SuggestionValidation,
    SuggestionValidators,
    updateSuggestion,
    likeSuggestion,
    unlikeSuggestion
} from "@controllers/suggestion.controller"
import {catchValidationError} from "@src/middleware/validationError.middleware";
import {isAuth} from "@src/middleware/auth.middleware";

export const suggestionRoutes = Router();

suggestionRoutes.get('/suggestions', isAuth, indexSuggestions)

suggestionRoutes.get('/suggestion/:suggestionId', isAuth, showSuggestion)

suggestionRoutes.post('/suggestion', isAuth, SuggestionValidation(SuggestionValidators.create), catchValidationError, createSuggestion)

suggestionRoutes.put('/suggestion/:suggestionId', isAuth, SuggestionValidation(SuggestionValidators.update), catchValidationError, updateSuggestion)

suggestionRoutes.delete('/suggestion/:suggestionId', isAuth, deleteSuggestion)

suggestionRoutes.post('/suggestion/:suggestionId/like', isAuth, likeSuggestion)

suggestionRoutes.delete('/suggestion/:suggestionId/unlike', isAuth, unlikeSuggestion)

