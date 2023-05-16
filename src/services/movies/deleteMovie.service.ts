import { Repository } from "typeorm";
import { Movie } from "../../entities";
import { AppDataSource } from "../../data-source";


const deleteMovieService = async (
    movieId: number
) =>{

    const movieRepository : Repository<Movie> = AppDataSource.getRepository(Movie)

    const movie = await movieRepository.findOneBy({ id: movieId})

    return  await movieRepository.remove(movie!)

}

export default deleteMovieService