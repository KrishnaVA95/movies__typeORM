import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";


const ensureNameNotExistsMiddlewares = async (req: Request, res:Response, next: NextFunction) =>{

    const movieName = req.body.name
 
    if(movieName === undefined){
        return  next()
    }

    const movieRepository : Repository<Movie> = AppDataSource.getRepository(Movie)

    const movie = await movieRepository.exist({where : {name: movieName}})


    if(movie === true){
        throw new AppError("Movie already exists.", 409)
    }

    return next()

}
export default ensureNameNotExistsMiddlewares