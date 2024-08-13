# ChecklistItem API Spec

## Create ChecklistItem API

Endpoint : POST /api/checklists/:checklistId/checklistItems

Headers :
- Authorization : token

Request Body :

```json
{
  "itemName" : "test",
  "isDone" : false
}
```

Response Body Success :

```json
{
  "data" : {
    "id" : 1,
    "itemName" : "test",
    "isDone" : false
  }
}
```

Response Body Error :

```json
{
  "errors" : "itemName is required" 
}
```

## Update ChecklistItem API

Endpoint : PUT /api/checklists/:checklistId/checklistItems/:checklistItemId

Headers :
- Authorization : token

Request Body :

```json
{
  "itemName" : "test2",
  "isDone" : true
}
```

Response Body Success :

```json
{
  "data" : {
    "id" : 1,
    "itemName" : "test2",
    "isDone" : true
  }
}
```

Response Body Error :

```json
{
  "errors" : "itemName is required"
}
```

## Get ChecklistItem API

Endpoint : GET /api/checklists/:checklistId/checklistItems/:checklistItemId

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data" : {
    "id" : 1,
    "itemName" : "test2",
    "isDone" : true
  }
}
```

Response Body Error :

```json
{
  "errors" : "checklist is not found"
}
```

## List ChecklistItems API

Endpoint : GET /api/checklists/:checklistId/checklistItems

Headers :
- Authorization : token

Response Body Success :

```json 
{
  "data" : [
    {
      "id" : 1,
      "itemName" : "test1",
      "isDone" : true
    },
    {
      "id" : 2,
      "itemName" : "test2",
      "isDone" : true
    }
  ]
}
```

Response Body Error :

```json
{
  "errors" : "checklistItem is not found"
}
```

## Remove ChecklistItem API

Endpoint : DELETE /api/checklists/:checklistId/checklistItems/:checklistItemId

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
  "errors" : "checklistItem is not found"
}
```
