import { z } from 'zod'

const movieSchema = z.object({
    id: z.number(),
    name: z.string().max(50),
    description: z.string().nullish(),
    duration: z.number().gt(0),
    price: z.number().int()
})

const movieSchemaRequest = movieSchema.omit({id: true})

const movieSchemaUpdateRequest = movieSchemaRequest.partial()

const moviesSchemaResponse = z.array(movieSchema)

export  { 
    movieSchema, 
    movieSchemaRequest, 
    moviesSchemaResponse, 
    movieSchemaUpdateRequest
}