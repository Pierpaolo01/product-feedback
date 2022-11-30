import {Router} from "express"
import {isAuth} from "@src/middleware/auth.middleware";
import {
    CommentValidation,
    CommentValidators,
    createSuggestionComment,
    indexSuggestionComments
} from "@controllers/comment.controller";
import {catchValidationError} from "@src/middleware/validationError.middleware";

export const commentRoutes = Router();

commentRoutes.get('/suggestion/:suggestionId/comments', isAuth, indexSuggestionComments)
commentRoutes.post('/suggestion/:suggestionId/comments', isAuth, CommentValidation(CommentValidators.CREATE), catchValidationError, createSuggestionComment)
