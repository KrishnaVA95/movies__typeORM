# Locadora de filmes com TypeORM


### Introdução

API que oferece um serviço de locação de filmes. 


### Endpoints, Casos de sucesso

`POST /movies - FORMATO DA REQUISIÇÃO`
###### Corpo de requisição:
```json
{
   "id": 40,
   "duration": 60,
   "name": "Movie: Sem description",
   "price": 200
}
```
###### Resposta: Status code: 201 CREATED

```json
{
   "id": 1,
   "name": "Movie: Sem description",
   "description": null,
   "duration": 60,
   "price": 200
}
```


`GET  /movies - FORMATO DA REQUISIÇÃO`
Deve ser possível listar os filmes armazenados no banco de dados. Seguindo as regras de paginação

exemplo de URL: `http://localhost:3000/movies/?sort=price&order=desc&page=2&perPage=3`

###### Resposta: Status code: 200 
```json
{
    "prevPage": "http://localhost:3000/movies?page=1&perPage=3",
    "nextPage": "http://localhost:3000/movies?page=3&perPage=3",
    "count": 14,
    "data": [
        {
            "id": 8,
            "name": "Filme 08",
            "description": null,
            "duration": 88,
            "price": 72
        },
        {
            "id": 4,
            "name": "Filme 04",
            "description": null,
            "duration": 75,
            "price": 72
        },
        {
            "id": 11,
            "name": "Filme 11",
            "description": null,
            "duration": 7,
            "price": 68
        }
    ]
}
```

`PATCH - /movies/:id - FORMATO DA REQUISIÇÃO`

Deve ser possível atualizar um filme pelo id recebido nos parâmetros da rota.
###### Corpo de requisição:
```json
{
    "id": 55,
    "duration": 130,
    "price": 200
}
```

###### Resposta: Status code: 200 
```json
{
    "id": 4,
    "name": "Filme 04",
    "description": null,
    "duration": 130,
    "price": 200
}
```


`DELETE - /movies/:id- FORMATO DA REQUISIÇÃO`
Deleta um filme pelo id recebido nos parâmetros da rota.

###### Status code: 204 NO CONTENT

### Endpoints, Casos de erro

`Nas rotas POST e PATCH /movies`
O nome (name) deve ser único.
Caso seja enviado um nome já registrado, retorna: 
###### Status code: 409 CONFLICT
```json
{
    "message": "Movie already exists."
}
```

`Nas rotas POST e PATCH `
Contam com serialização de dados.
Em caso de erro ao validar os dados,  retorna:
###### Status code: 400 BAD REQUEST
```json
{
    "name": ["Expected string, received number"],
    "duration": ["Expected number, received string"]
 }
```

`Em todas as rotas que recebem id por parâmetro`
 Deve verificar se o id informado existe.
 Caso o filme (movie) não exista,  retorna:
###### Status code: 404 NOT FOUND
```json
{
    "message": "Movie not found"
}
```



