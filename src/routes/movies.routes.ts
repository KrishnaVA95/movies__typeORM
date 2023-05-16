import { Router } from 'express'
import { createMoviesController, deleteMovieController, listMoviesController, updateMovieController } from '../controllers/movies.controllers'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middlewares'
import { movieSchemaRequest, movieSchemaUpdateRequest } from '../schemas/movies.schema'
import ensureNameNotExistsMiddlewares from '../middlewares/ensureNameNotExists.middlewares'
import ensureMovieExistsMiddlewares from '../middlewares/ensureMovieExists.middlewares'

const userRoutes: Router = Router()

userRoutes.post('',
ensureDataIsValidMiddleware(movieSchemaRequest),
ensureNameNotExistsMiddlewares,
createMoviesController)

userRoutes.get('',
listMoviesController)

userRoutes.patch('/:id',
ensureMovieExistsMiddlewares,
ensureNameNotExistsMiddlewares,
ensureDataIsValidMiddleware(movieSchemaUpdateRequest),
updateMovieController)

userRoutes.delete('/:id',
ensureMovieExistsMiddlewares,
deleteMovieController)

export default userRoutes