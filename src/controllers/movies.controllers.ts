import { Request, Response } from "express";
import { TMovieRequest, TMovieUpdateRequest, TMoviesPaginationm, TMoviesResponse } from "../interfaces/movies.interfaces";
import createMoviesService from "../services/movies/createMovie.service";
import listMoviesService from "../services/movies/listMovies.service";
import updateMovieService from "../services/movies/updateMovie.service";
import deleteMovieService from "../services/movies/deleteMovie.service";
import { Movie } from "../entities";


const createMoviesController = async (req: Request, res: Response): Promise<Response> =>{
    const movieData: TMovieRequest = req.body
    
    const newMovie = await createMoviesService(movieData)
    return res.status(201).json(newMovie)
}

const listMoviesController = async (req: Request, res: Response): Promise<Response> =>{
    const page: number | undefined | null = Number(req.query.page) 
    const perPage: number | undefined | null = Number(req.query.perPage) 
    const order: any = req.query.order
    const sort: any= req.query.sort
    const movies: TMoviesPaginationm = await listMoviesService(page, perPage, order, sort)
    return res.status(200).json(movies)
}


const updateMovieController = async (req: Request, res: Response): Promise<Response> =>{
    const movieData: TMovieUpdateRequest = req.body
    const movieId: number = parseInt(req.params.id)

    const newMovieData: Movie = await updateMovieService(movieData, movieId)
    return res.status(200).json(newMovieData)
}

const deleteMovieController = async (req: Request, res: Response): Promise<Response> =>{
    const movieId: number = parseInt(req.params.id)
    await deleteMovieService(movieId)
    return res.status(204).send()
} 

export { 
    createMoviesController, 
    listMoviesController, 
    updateMovieController,  
    deleteMovieController 
}