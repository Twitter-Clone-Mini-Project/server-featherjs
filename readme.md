## Endpoint :

### List of available endpoints:

-   POST /users
-   POST /authentication
-   POST /tweets
-   GET /tweets
-   PATCH /tweets/:tweet_id
-   POST /tweets/:tweet_id/comments
-   GET /tweets/:tweet_id/comments
-   PATCH /tweets/:tweet_id/comments/:comment_id
-   DELETE /tweets/:tweet_id/comments/:comment_id
-   DELETE /tweets/:tweet_id


## 1. POST /users

### Description

-   register new user

### request

```json
 {
  "username": "bejo",
  "password": "12345"
}
```


### Response

Response (201)

```json
{
  "status": "Success",
  "message": "Success",
  "data": {
    "id": 1,
    "username": "bejo",
    "createdAt": "2023-11-19T21:20:41.000Z",
    "updatedAt": "2023-11-19T21:20:41.000Z"
  }
}
```

### validation

### Description

-  username is required 

### request

```json
 {
  "username": "",
  "password": "12345"
}
```


### Response

Response (400)

```json
{
  "name": "BadRequest",
  "message": "Username is required.",
  "code": 400,
  "className": "bad-request"
}
```

### Description

-  username is required 

### request

```json
 {
  "username": "bejo",
  "password": ""
}
```


### Response

Response (400)

```json
{
  "name": "BadRequest",
  "message": "Password is required.",
  "code": 400,
  "className": "bad-request"
}
```

### Description

-  username is already

### request

```json
 {
  "username": "bejo",
  "password": "12345"
}
```


### Response

Response (400)

```json
{
  "name": "BadRequest",
  "message": "Username is already taken. Please choose a different username.",
  "code": 400,
  "className": "bad-request"
}
```

## 2. POST /authentication

### Description

-   login user

### request

```json
{
  "username": "bejo",
  "password": "12345"
}

```


### Response

Response (201)

```json
{
  "status": "Success",
  "message": "Success",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE3MDA0NTQ4NzIsImV4cCI6MTcwMDU0MTI3MiwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsInN1YiI6IjEiLCJqdGkiOiI2NTJkZGQ1ZS03ODJjLTRiZDItOTk0ZC03YWMwNWQ0NzA4NmYifQ.X1zpcP8HcrIMglDfrUgas10UATnrFiqWvlNOkaMGC94",
    "user": {
      "id": 1,
      "username": "bejo",
      "createdAt": "2023-11-19T21:15:46.000Z",
      "updatedAt": "2023-11-19T21:15:46.000Z"
    }
  }
}
```

### validation

### Description

-  username is required 

### request

```json
 {
  "username": "",
  "password": "12345"
}
```


### Response

Response (400)

```json
{
  "name": "BadRequest",
  "message": "Username is required.",
  "code": 400,
  "className": "bad-request"
}
```

### Description

-  username is required 

### request

```json
 {
  "username": "bejo",
  "password": ""
}
```


### Response

Response (400)

```json
{
  "name": "BadRequest",
  "message": "Password is required.",
  "code": 400,
  "className": "bad-request"
}
```

### Description

-  invalid akun

### request

```json
 {
  "username": "bejo1",
  "password": "12345"
}
```


### Response

Response (401)

```json
{
  "name": "NotAuthenticated",
  "message": "Invalid login",
  "code": 401,
  "className": "not-authenticated"
}
```

## 3. POST /tweets

### Description

-   add new tweets

### request

```json
{
  "content": "Sejak beberapa waktu lalu, serangan terus dilakukan Israel di sekitar RS Indonesia di Gaza sebab menuduh menyembunyikan komando dan kendali bawah tanah untuk Hamas.",
  "user_id": 1
}
```


### Response

Response (201)

```json
{
  "status": "Success",
  "message": "Success",
  "data": {
    "id": 1,
    "content": "Sejak beberapa waktu lalu, serangan terus dilakukan Israel di sekitar RS Indonesia di Gaza sebab menuduh menyembunyikan komando dan kendali bawah tanah untuk Hamas.",
    "likes": 0,
    "user_id": 1,
    "createdAt": "2023-11-19T22:01:02.000Z",
    "updatedAt": "2023-11-19T22:01:02.000Z"
  }
}
```

### validation

### Description

-  content is required 

### request

```json
{
  "content": "",
  "user_id": 1
}
```


### Response

Response (400)

```json
{
  "name": "BadRequest",
  "message": "Content is required.",
  "code": 400,
  "className": "bad-request"
}
```


### Description

-  jika tidak ada token

### request

```json
{
  "content": "Sejak beberapa waktu lalu, serangan terus dilakukan Israel di sekitar RS Indonesia di Gaza sebab menuduh menyembunyikan komando dan kendali bawah tanah untuk Hamas.",
  "user_id": 1
}
```


### Response

Response (401)

```json
{
  "name": "NotAuthenticated",
  "message": "Not authenticated",
  "code": 401,
  "className": "not-authenticated"
}
```


## 4. GET /tweets

### Description

-   get tweets

### Response

Response (200)

```json
{
  "status": "Success",
  "message": "Success",
   "meta": {
    "limit": 50,
    "skip": 0
  },
  "total": 1,
  "data": [
    {
      "id": 1,
      "content": "Sejak beberapa waktu lalu, serangan terus dilakukan Israel di sekitar RS Indonesia di Gaza sebab menuduh menyembunyikan komando dan kendali bawah tanah untuk Hamas.",
      "likes": 0,
      "user_id": 1,
      "createdAt": "2023-11-19T23:18:41.000Z",
      "updatedAt": "2023-11-19T23:18:41.000Z"
    }
  ]
}
```

### validation

### Description

-  jika tidak ada token

### Response

Response (401)

```json
{
  "name": "NotAuthenticated",
  "message": "Not authenticated",
  "code": 401,
  "className": "not-authenticated"
}
```

## 5. PATCH /tweets/:tweet_id

### Description

-   update tweets

### request

```json
{
  "content": "ini di update",
}
```


### Response

Response (200)

```json
{
  "status": "Success",
  "message": "Success",
  "data": {
    "id": 1,
    "content": "ini di update",
    "likes": 0,
    "user_id": 1,
    "createdAt": "2023-11-19T23:18:41.000Z",
    "updatedAt": "2023-11-19T23:18:41.000Z"
  }
}
```

### validation

### Description

-  tweet not found PATCH /tweets/5

### request

```json
{
  "content": "ini di update",
}
```


### Response

Response (400)

```json
{
  "name": "NotFound",
  "message": "No record found for id '5'",
  "code": 404,
  "className": "not-found"
}
```

### Description

-  content is required 

### request

```json
{
  "content": "",
}
```


### Response

Response (400)

```json
{
  "name": "BadRequest",
  "message": "Content is required.",
  "code": 400,
  "className": "bad-request"
}
```

### Description

-  jika tidak ada token

### request

```json
{
  "content": "ini di update",
}
```


### Response

Response (401)

```json
{
  "name": "NotAuthenticated",
  "message": "Not authenticated",
  "code": 401,
  "className": "not-authenticated"
}
```

## 6. POST /tweets/:tweet_id/comments

### Description

-   add  comments /tweets/1/comments

### request

```json
{
  "content": "tweet yang sangat bagus!!",
  "user_id": 1
}
```


### Response

Response (201)

```json
{
  "status": "Success",
  "message": "Success",
  "data": {
    "id": 1,
    "content": "tweet yang sangat bagus!!",
    "tweet_id": 1,
    "user_id": 1,
    "createdAt": "2023-11-19T23:52:33.000Z",
    "updatedAt": "2023-11-19T23:52:33.000Z"
  }
}
```

### validation

### Description

-  tweet not found POST /tweets/2/comments

### request

```json
{
  "content": "tweet yang sangat bagus!!",
  "user_id": 1
}
```


### Response

Response (404)

```json
{
  "name": "NotFound",
  "message": "No record found for id '2'",
  "code": 404,
  "className": "not-found"
}
```

### Description

-  content is required 

### request

```json
{
  "content": "",
  "user_id": 1
}
```


### Response

Response (400)

```json
{
  "name": "BadRequest",
  "message": "Content is required.",
  "code": 400,
  "className": "bad-request"
}
```

### Description

-  jika tidak ada token

### request

```json
{
  "content": "ini di update",
}
```


### Response

Response (401)

```json
{
  "name": "NotAuthenticated",
  "message": "Not authenticated",
  "code": 401,
  "className": "not-authenticated"
}
```

## 7. GET /tweets/:tweet_id/comments

### Description

-   get all tweets /tweets/1/comments

### Response

Response (200)

```json
{
  "status": "Success",
  "message": "Success",
   "meta": {
    "limit": 50,
    "skip": 0
  },
  "total": 1,
  "data": [
    {
      "id": 1,
      "content": "tweet yang sangat bagus!!",
      "tweet_id": 1,
      "user_id": 1,
      "createdAt": "2023-11-20T01:14:46.000Z",
      "updatedAt": "2023-11-20T01:14:46.000Z"
    }
  ]
}
```

### validation

### Description

-  tweet not found POST /tweets/2/comments


### Response

Response (404)

```json
{
  "name": "NotFound",
  "message": "No record found for id '2'",
  "code": 404,
  "className": "not-found"
}
```

### Description

-  jika tidak ada token


### Response

Response (401)

```json
{
  "name": "NotAuthenticated",
  "message": "Not authenticated",
  "code": 401,
  "className": "not-authenticated"
}
```


## 8. PATCH /tweets/:tweet_id/comments/:comment_id


### Description

-   update komentar

### request

```json
{
  "content": "ini di update",
}
```


### Response

Response (200)

```json
{
  "status": "Success",
  "message": "Success",
  "data": {
    "id": 1,
    "content": "ini di update",
    "likes": 0,
    "user_id": 1,
    "createdAt": "2023-11-19T23:18:41.000Z",
    "updatedAt": "2023-11-19T23:18:41.000Z"
  }
}
```

### validation

### Description

-  tweet not found PATCH /tweets/2/comments/1

### request

```json
{
  "content": "ini di update",
}
```


### Response

Response (404)

```json
{
  "name": "NotFound",
  "message": "No record found for id '2'",
  "code": 404,
  "className": "not-found"
}
```


### Description

-  content is required 

### request

```json
{
  "content": "",
}
```


### Response

Response (400)

```json
{
  "name": "BadRequest",
  "message": "Content is required.",
  "code": 400,
  "className": "bad-request"
}
```

### Description

-  jika tidak ada token

### request

```json
{
  "content": "ini di update",
}
```


### Response

Response (401)

```json
{
  "name": "NotAuthenticated",
  "message": "Not authenticated",
  "code": 401,
  "className": "not-authenticated"
}
```


## 9. DELETE /tweets/:tweet_id/comments/:comment_id

### Description

-   delete komentar DELETE /tweets/1/comments/1

### Response

Response (200)

```json
{
  "status": "Success",
  "message": "Success",
  "data": {
    "id": 1,
    "content": "ini di update",
    "likes": 0,
    "user_id": 1,
    "createdAt": "2023-11-19T23:18:41.000Z",
    "updatedAt": "2023-11-19T23:18:41.000Z"
  }
}
```

### validation

### Description

-  tweet not found DELETE /tweets/2/comments/1


### Response

Response (404)

```json
{
  "name": "NotFound",
  "message": "No record found for id '2'",
  "code": 404,
  "className": "not-found"
}
```


### Description

-  comments not found DELETE /tweets/1/comments/2


### Response

Response (404)

```json
{
  "name": "NotFound",
  "message": "No record found for id '2'",
  "code": 404,
  "className": "not-found"
}
```

### Description

-  jika tidak ada token

### request

```json
{
  "content": "ini di update",
}
```


### Response

Response (401)

```json
{
  "name": "NotAuthenticated",
  "message": "Not authenticated",
  "code": 401,
  "className": "not-authenticated"
}
```

## 10. DELETE /tweets/:tweet_id

### Description

-   delete tweet


### Response

Response (200)

```json
{
  "status": "Success",
  "message": "Success",
  "data": {
    "id": 1,
    "content": "Sejak beberapa waktu lalu, serangan terus dilakukan Israel di sekitar RS Indonesia di Gaza sebab menuduh menyembunyikan komando dan kendali bawah tanah untuk Hamas.",
    "likes": 0,
    "user_id": 1,
    "createdAt": "2023-11-20T01:14:34.000Z",
    "updatedAt": "2023-11-20T01:14:34.000Z"
  }
}
```

### validation

### Description

-  tweet not found DELETE /tweets/5



### Response

Response (404)

```json
{
  "name": "NotFound",
  "message": "No record found for id '5'",
  "code": 404,
  "className": "not-found"
}
```


### Description

-  jika tidak ada token



### Response

Response (401)

```json
{
  "name": "NotAuthenticated",
  "message": "Not authenticated",
  "code": 401,
  "className": "not-authenticated"
}
```