import { Repository } from "typeorm"
import { TMoviesPaginationm, TMoviesResponse } from "../../interfaces/movies.interfaces"
import { AppDataSource } from "../../data-source"
import  Movie  from "../../entities/movies.entity"
import { moviesSchemaResponse } from "../../schemas/movies.schema"


const listMoviesService = async (
    page: any, 
    perPage: any,
    order: 'asc' | 'desc' | undefined | null,
    sort: 'price' | 'duration' | undefined | null
): Promise<TMoviesPaginationm> =>{
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

    let movies: Movie[] | undefined 
    
    // Se order não for definido sera igual a 'asc'
    if(sort === null || sort === undefined){
        order = 'asc'
    }

    if(order === undefined || order === null){
        order = 'asc'
    }

    //ordenar por 
    let orderBy = {}
    if(sort === 'price'){
        orderBy ={
            price: order
        }
    }else if( sort === 'duration'){
        orderBy ={
            duration: order
        }
    }else{
        orderBy={
            id: order
        }
    }
  


    if(isNaN(page) || page === undefined || page === null || page <= 0){
        page = 1
    }


    if(isNaN(perPage) || perPage === undefined || perPage === null || perPage <= 0 || perPage > 5){
        perPage = 5 
    }

    
    if(!page || !perPage){
        movies= await movieRepository.find()
    }else{

        movies = await movieRepository.find({
            skip: (page - 1) * perPage,
            take: perPage,
            order: orderBy
        })
    }

    //skip quantos dados  devem ser pulados no retorno
    //Take = quantidade de dados que serão retornados na pag

    const returnMovies: TMoviesResponse = moviesSchemaResponse.parse(movies)

    const totalMovies = await movieRepository.count()
    const prevPageNum = Number(page) - 1
    const nextPageNum = Number(page)  <= totalMovies ? Number(page)  + 1 : page

   
  

    let nextLink: string | null = null
    let prevLink: string | null = null

    if (Number(page)  <= (totalMovies / perPage)) {
        nextLink = `http://localhost:3000/movies?page=${nextPageNum}&perPage=${perPage}`
    }
    if (Number(page)  >= 2) {
        prevLink = `http://localhost:3000/movies?page=${prevPageNum}&perPage=${perPage}`
    }

    return {
        nextPage: nextLink,
        prevPage: prevLink,
        count: totalMovies,
        data: returnMovies,
    }
}

export default listMoviesService