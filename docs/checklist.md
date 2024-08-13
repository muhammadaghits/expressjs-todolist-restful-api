# Checklist API Spec

## Create Checklist API

Endpoint : POST /api/checklists

Headers : 
- Authorization : token

Request Body :

```json
{
  "name" : "test"
}
```

Response Body Success : 

```json
{
  "data" : {
    "id" : 1,
    "name" : "test"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Name is required"
}
```

## Update Checklist API

Endpoint : PUT /api/checklists/:id

Headers :
- Authorization : token

Request Body :

```json
{
  "name" : "test2"
}
```

Response Body Success :

```json
{
  "data" : {
    "id" : 1,
    "name" : "test2"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Name is required"
}
```

## Get Checklist API

Endpoint : GET /api/checklists/:id

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data" : {
    "id" : 1,
    "name" : "test2"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Checklist is not found"
}
```

## Search Checklist API

Endpoint : GET /api/checklists

Headers :
- Authorization : token

Query params :
- name : Search by name, using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data" : [
    {
      "id" : 1,
      "name" : "test1"
    },
    {
      "id" : 2,
      "name" : "test2"
    }
  ],
  "paging" : {
    "page" : 1,
    "total_page" : 1,
    "total_item" : 2
  }
}
```

Response Body Error :

## Remove Checklist API

Endpoint : DELETE /api/checklists/:id

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data" : "OK"
}
```

Response Body Error :

```json
{
  "errors" : "Checklist is not found"
}
```
