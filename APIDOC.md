# Final Project API Documentation
The Final Project API provides information about the various products on our website and handling user logins and transactions.

## Endpoint 1 - Get All Product Information.
**Request Format:** `/products`

**Request Type:** `GET`

**Returned Data Format**: JSON

**Description:** Returns a JSON of every product in our item catalog.

**Example Request:** `/products`

**Example Response 1:** (abbreviated)
```json
[
  {
    "_id": "665f8b9b6fb1daad7cae7a78",
    "pid": 2,
    "name": "Tomatos",
    "Shortname": "tomato",
    "price": 1,
    "description": "Grown in Redmond, WA"
  },
  {
    "_id": "665f8b9b6fb1daad7cae7a79",
    "pid": 3,
    "name": "Cucumbers",
    "Shortname": "cucumber",
    "price": 1,
    "description": "Grown in Redmond, WA"
  },
  {
    "_id": "665f8b9b6fb1daad7cae7a7a",
    "pid": 4,
    "name": "Potatos",
    "Shortname": "potato",
    "price": 0.99,
    "description": "Grown in Redmond, WA"
  },
  ...
]
```