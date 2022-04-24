# Bullet Hell Jam 2022 scoreboard server

## Run the server
Edit .env (and docker-compose ports if necessary)
and run
```
$ docker-compose up
```

## Initialize database
Connect to DB using specified root credentials  
Execute schema.sql to create tables and fields

Create new user `scoreboard` with the specified password and grant permissions `select, insert` on `scoreboard` table

## Endpoints 
- /scores 
    - GET: returns all scores in descending order (LIMIT 10)
    - POST: inserts a new score (Params: username, score, additional_data)

The endpoint takes content of type `application/x-www-form-urlencoded`  
 - `username` String of length <= 5  
 - `score` Integer  
 - `additional_data` String, optional (inteneded for potential metadata)
