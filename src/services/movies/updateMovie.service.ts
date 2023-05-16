import { Repository } from "typeorm";
import { TMovieUpdateRequest, TMoviesResponse } from "../../interfaces/movies.interfaces";
import { Movie } from "../../entities";
import { AppDataSource } from "../../data-source";
import { moviesSchemaResponse } from "../../schemas/movies.schema";


const updateMovieService = async (
    movieData: TMovieUpdateRequest,
    movieId: number
): Promise<Movie> =>{

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

    const oldMovieData: Movie | null = await movieRepository.findOneBy({
        id: movieId
    })

    const newMovieData: Movie = movieRepository.create({
        ...oldMovieData,
        ...movieData
    })


    await movieRepository.save(newMovieData)


    return newMovieData
}


export default updateMovieService