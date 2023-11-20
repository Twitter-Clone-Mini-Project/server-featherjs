## Endpoint :

### List of available endpoints:

-   GET /tweets
-   POST /sign
-   POST /comment/:tweet_id
-   PATCH /like/:tweet_id
-   POST /tweets/:user_id
-   GET /tweets/:user_id
-   DELETE /tweets/:user_id/:tweet_id
-   PUT /tweets/:user_id/:tweet_id


## 1. GET /tweets

### Description

-   get all tweets

### Response

Response (200)

```json
[
  {
    "id": 1,
    "content": "Jangan pernah membicarakan kejelekan yang dimiliki oleh orang lain. Karena sesungguhnya orang yang membicarakan itulah yang menjadi orang jelek.",
    "likes": 0,
    "user_id": 1,
    "created_at": "2023-11-09T00:31:17.000Z",
    "updated_at": "2023-11-09T00:31:17.000Z",
    "username": "tengkurizki",
    "comments": []
  },
  {
    "id": 2,
    "content": "Beberapa orang masuk ke kehidupan kita dan meninggalkan jejak di hati. Sementara yang lain, masuk ke kehidupan kita dan membuat kita ingin meninggalkan jejak di muka mereka.",
    "likes": 0,
    "user_id": 2,
    "created_at": "2023-11-09T00:31:17.000Z",
    "updated_at": "2023-11-09T00:31:17.000Z",
    "username": "jamaluddin",
    "comments": [
      {
        "id": 1,
        "content": "komen-1",
        "user_id": 1,
        "created_at": "2023-11-09 07:31:17.000000",
        "updated_at": "2023-11-09 07:31:17.000000",
        "user_username": "tengkurizki"
      }
    ]
  }
]
```



## 2. POST /sign

### Description

-   authentication jika belum ada akun

### Request

```json
[
  {
    "username": "bejo",
    "password": "12345",
  },
]
```

### Response

Response (201) 

```json
{
  "id": 3,
  "username" : "bejo"
}
```

### Description

-   authentication jika sudah akun

### Request

```json
[
  {
    "username": "tengkurizki",
    "password": "12345",
  },
]
```

### Response

Response (200) 

```json
{
  "id": 1,
  "username" : "tengkurizki"
}
```

### Description

-   validasi jika password atau username kosong

### Request

```json
[
  {
    "username": "",
    "password": "12345",
  },
]
```

```json
[
  {
    "username": "tengkurizki",
    "password": "",
  },
]
```

### Response

Response (400) 

```json
{
  "type": "Bad Request",
  "message":"Username Or Password Is Requiered"
}
```

### Description

-   validasi jika password salah

### Request

```json
[
  {
    "username": "tengkurizki",
    "password": "1234566666",
  },
]
```


### Response

Response (400) 

```json
{
  "type": "Bad Request",
  "message":"the password is incorrect"
}
```


## 3. POST POST /comment/1

### Description

-   add comment

### Request

```json
[
  {
    "user_id": "2",
    "content": "komen-2"
  },
]
```

### Response

Response (201) 

```json
{
  "id": 2,
  "content": "komen-2",
  "tweet_id": 1,
  "user_id": 2,
  "created_at": "2023-11-09T01:12:01.000Z",
  "updated_at": "2023-11-09T01:12:01.000Z"
}
```


## 4. PATCH /like/2

### Description

-   add like to table tweet

### Response

Response (201) 

```json
{
  "id": 2,
  "content": "Beberapa orang masuk ke kehidupan kita dan meninggalkan jejak di hati. Sementara yang lain, masuk ke kehidupan kita dan membuat kita ingin meninggalkan jejak di muka mereka.",
  "likes": 1,
  "user_id": 2,
  "created_at": "2023-11-09T01:11:37.000Z",
  "updated_at": "2023-11-09T01:11:37.000Z"
}
```


## 5. POST /tweets/1

### Description

-   add tweet

### Request

```json
[
  {
    "content": "jadilah manusia yang bermanfaat bagi manusia lain",
  },
]
```

### Response

Response (201) 

```json
{
  "id": 3,
  "content": "jadilah manusia yang bermanfaat bagi manusia lain",
  "likes": 0,
  "user_id": 1,
  "created_at": "2023-11-09T19:57:12.000Z",
  "updated_at": "2023-11-09T19:57:12.000Z",
  "username": "tengkurizki",
  "comments": []
}
```

### Description

-   user belum login

### Request

```json
[
  {
    "content": "jadilah manusia yang bermanfaat bagi manusia lain",
  },
]
```

### Response

Response (401) 

```json
{
  "type": "Authentication Required",
  "message": "Please log in."
}
```

## 6. GET /tweets/1

### Description

-   get myTweet


### Response

Response (200) 

```json
[
  {
    "id": 1,
    "content": "Jangan pernah membicarakan kejelekan yang dimiliki oleh orang lain. Karena sesungguhnya orang yang membicarakan itulah yang menjadi orang jelek.",
    "likes": 0,
    "user_id": 1,
    "created_at": "2023-11-09T19:56:33.000Z",
    "updated_at": "2023-11-09T19:56:33.000Z",
    "username": "tengkurizki",
    "comments": []
  },
  {
    "id": 3,
    "content": "jadilah manusia yang bermanfaat bagi manusia lain",
    "likes": 0,
    "user_id": 1,
    "created_at": "2023-11-09T19:57:12.000Z",
    "updated_at": "2023-11-09T19:57:12.000Z",
    "username": "tengkurizki",
    "comments": []
  }
]
```

### Description

-   user belum login


### Response

Response (401) 

```json
{
  "type": "Authentication Required",
  "message": "Please log in."
}
```


## 7. DELETE /tweets/2/2

### Description

-   delete tweets


### Response

Response (401) 

```json
{
  "id": 2
}
```

### Description

-   tweet not found


### Response

Response (401) 

```json
{
  "type": "Not Found",
  "message": "Tweet not found."
}
```

### Description

-   user forbidden


### Response

Response (401) 

```json
{
  "type": "Forbidden",
  "message": "You are not allowed to access this resource."
}
```


## 8. PUT /tweets/:user_id/:tweet_id

### Description

-   update tweets

### Request

```json
[
  {
    "content": "ini edit bro",
  },
]
```


### Response

Response (200) 

```json
{
  "id": 1,
  "content": "ini edit bro",
  "likes": 0,
  "user_id": 1,
  "created_at": "2023-11-12T20:36:29.000Z",
  "updated_at": "2023-11-12T20:36:29.000Z",
  "username": "tengkurizki",
  "comments": []
}
```

### Description

-   tweet not found


### Response

Response (401) 

```json
{
  "type": "Not Found",
  "message": "Tweet not found."
}
```

### Description

-   user forbidden


### Response

Response (401) 

```json
{
  "type": "Forbidden",
  "message": "You are not allowed to access this resource."
}
```

