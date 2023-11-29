## Endpoint :

### List of available endpoints:

-   POST /users
-   POST /authentication
-   POST /tweets
-   GET /tweets
-   PATCH /tweets/:tweetId
-   POST /tweets/:tweetId/comments
-   GET /tweets/:tweetId/comments
-   PATCH /tweets/:tweetId/comments/:comment_id
-   DELETE /tweets/:tweetId/comments/:comment_id
-   DELETE /tweets/:tweetId


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
  "message": "Username is required."
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
  "userId": 1
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
    "userId": 1,
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
  "userId": 1
}
```


### Response

Response (400)

```json
{
  "name": "BadRequest",
  "message": "Content is required.",
}
```


### Description

-  jika tidak ada token

### request

```json
{
  "content": "Sejak beberapa waktu lalu, serangan terus dilakukan Israel di sekitar RS Indonesia di Gaza sebab menuduh menyembunyikan komando dan kendali bawah tanah untuk Hamas.",
  "userId": 1
}
```


### Response

Response (401)

```json
{
  "name": "NotAuthenticated",
  "message": "Not authenticated",
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
      "userId": 1,
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
}
```

## 5. PATCH /tweets/:tweetId

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
    "userId": 1,
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
}
```

## 6. POST /tweets/:tweetId/comments

### Description

-   add  comments /tweets/1/comments

### request

```json
{
  "content": "tweet yang sangat bagus!!",
  "userId": 1
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
    "tweetId": 1,
    "userId": 1,
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
  "userId": 1
}
```


### Response

Response (404)

```json
{
  "name": "NotFound",
  "message": "No record found for id '2'",
}
```

### Description

-  content is required 

### request

```json
{
  "content": "",
  "userId": 1
}
```


### Response

Response (400)

```json
{
  "name": "BadRequest",
  "message": "Content is required.",
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
}
```

## 7. GET /tweets/:tweetId/comments

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
      "tweetId": 1,
      "userId": 1,
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
}
```


## 8. PATCH /tweets/:tweetId/comments/:comment_id


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
    "userId": 1,
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
}
```


## 9. DELETE /tweets/:tweetId/comments/:comment_id

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
    "userId": 1,
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
}
```

## 10. DELETE /tweets/:tweetId

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
    "userId": 1,
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
}
```