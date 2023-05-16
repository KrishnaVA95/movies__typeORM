import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";


const ensureMovieExistsMiddlewares = async (req: Request, res:Response, next: NextFunction) =>{

    const movieId: number = Number(req.params.id)
    const movieRepository : Repository<Movie> = AppDataSource.getRepository(Movie)

    const movie = await movieRepository.exist({where : {id: movieId}})

    if(movie === true){
        return next()
    }
    
    throw new AppError("Movie not found", 404)

}
export default ensureMovieExistsMiddlewares