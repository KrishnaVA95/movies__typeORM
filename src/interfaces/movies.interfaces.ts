import { z } from 'zod'
import { movieSchema, movieSchemaRequest, moviesSchemaResponse } from '../schemas/movies.schema';
import { DeepPartial } from 'typeorm';
 
type TMovieRequest = z.infer<typeof movieSchemaRequest>

type TMovie = z.infer<typeof movieSchema>

type TMoviesResponse = z.infer<typeof moviesSchemaResponse>

type TMoviesPaginationm = {
    prevPage: string | null | undefined;
    nextPage: string | null | undefined;
    count: number | null;
    data: TMoviesResponse;
}

type TMovieUpdateRequest = DeepPartial<TMovieRequest>

export { 
    TMovieRequest, 
    TMovie, 
    TMoviesResponse, 
    TMoviesPaginationm,
    TMovieUpdateRequest
}