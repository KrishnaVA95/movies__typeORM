import { Repository } from "typeorm";
import  Movie  from "../../entities/movies.entity";
import { TMovieRequest } from "../../interfaces/movies.interfaces";
import { AppDataSource } from "../../data-source";


const createMoviesService = async(movieData: TMovieRequest): Promise<Movie> =>{
     const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

     const movie: Movie = movieRepository.create(movieData)

     await movieRepository.save(movie)

     return movie
}

export default createMoviesService