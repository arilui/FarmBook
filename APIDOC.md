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
**Error Handling:**
- Possible 500 errors (all plain text):
  - If something else goes wrong on the server, returns an error:
    ```json
    {"message": "err.message"}
    ```


## Endpoint 2 - Get All Information of a Product.
**Request Format:** `/products/:id`

**Request Type:** `GET`

**Returned Data Format**: JSON

**Description:** Given a valid id of a product, returns a JSON with every detail possible about the given product.

**Example Request:** `/products/665f8b9b6fb1daad7cae7a78`

**Example Response:**
```json
{
  "exists": true,
  "productInfo": {
    "_id": "665f8b9b6fb1daad7cae7a78",
    "pid": 2,
    "name": "Tomatos",
    "Shortname": "tomato",
    "price": 1,
    "description": "Grown in Redmond, WA",
    "image": "images/tomatoes.jpeg"
  }
}
```

**Error Handling:**
- Possible 400 (invalid request) errors (all plain text):
  - If passed in an invalid product id, returns an error message:
    ```json
    {"exists": false}
    ```
- Possible 500 errors (all plain text):
  - If something else goes wrong on the server, returns an error message:
    ```json
    {"message": "err.message"}
    ```


## Endpoint 3 - Login as a user.
**Request Format:** `/login` endpoint with POST parameters of `username` and `password`.

**Request Type**: `POST`

**Returned Data Format**: JSON

**Description:** Given a valid `username` and `password`, returns a JSON message response to indicate that the user has been logged in and if they are a seller or not.

**Example Request:** `/login` with POST parameters of `username=johndoe@gmail.com`, and `p4ssword`.

**Example Response:**
```json
{
  "message": "Login successful",
  "isSeller": false
}
```

**Error Handling:**
- Possible 400 (invalid request) errors:
  - If passed a username that does not exist in the database, an error is returned with the message:
    ```json
    {"message": "User not found"}
    ```
  - If passed a username with an incorrect corresponding password, an error is returned with the message:
    ```json
    {"message": "Invalid email or password"}
    ```
- Possible 500 error:
  - If something else goes wrong on the server, returns an error with the message:
    ```json
    {"message": "An error occurred during login. Please try again later."}
    ```


## Endpoint 4 - Adds New User Information to Database.
**Request Format:** `/createaccount` endpoint with POST parameters of `email`, `password`, and `isSeller`.

**Request Type**: `POST`

**Returned Data Format**: JSON

**Description:** Given a valid `email`, `password` and `isSeller` value, returns a JSON response message to indicate that the call to the database went through and created the new user in the database.

**Example Request:** `/createaccount` with POST parameters of `email=ginger@gmail.com`, `username=pepperoni`, and `isSeller=false`.

**Example Response:**
```json
{
  "message": "User registered successfully"
}
```

**Error Handling:**
- Possible 500 error:
  - If something else goes wrong on the server, returns an error with the message:
    ```json
    {"message": "An error occurred during registration. Please try again later."}
    ```