# SP IT!

## Checklist
- [ ] redo tables as some endpoint need to use table join operation


### Features
- [ ] User registration
- [ ] Publication of product info
- [ ] Insertion of products
- [ ] User reviews

### Requirements
- [ ] Create MySQL database
- [ ] Create entity relationship diagram
- [ ] Proper use of PK and FK constraints
- [ ] __(BONUS)__ Create endpoint for img upload/storage
  - Server should only accept .jpg/.png < 1MB
- [ ] __(BONUS)__ Retrieve product listings from server
- [ ] __(BONUS)__ Create endpoint and table for discounts

### Grading
- __75%__ - Demonstrate & satisfy endpoint functionalities.
- __10%__ Advanced Features
- __10%__ Proper Documentation
- __5%__ Proper db and table design w/ sample data

## Database

- [x] SP_IT

## Tables 

- [x] user
- [x] product
- [x] category
- [ ] reviews
- [ ] userInterest
- [ ] discount_codes

## Endpoints

**/user**

|          Route          |   Method   |                     Description                              |    Codes        | 
|-------------------------|------------|--------------------------------------------------------------|-----------------|
|   /users                |    GET     |  Retrieve array of all user/admin data                       |   200/500       |
|   /users/:id            |    GET     |  Retrieve single user data by id                             |   200/500       |
|   /users/:id            |    PUT     |  Update single user data excluding id,timestamp              |   204/422/500   |
|   /users/:id            |    POST    |  Add new user                                                |   201/422/500   |

**/category**

|          Route          |   Method   |                     Description                              |    Codes        | 
|-------------------------|------------|--------------------------------------------------------------|-----------------|
|   /category             |    GET     |  Retrieve all categories                                     |   200/500       |
|   /category             |    POST    |  Insert new category, cat_id uses AI constraint              |   204/422/500   |

**/product**

|          Route          |   Method   |                     Description                              |    Codes        | 
|-------------------------|------------|--------------------------------------------------------------|-----------------|
|   /product/:id          |    GET     |  Retrive single product by id                                |   200/500       |
|   /product              |    POST    |  Add new product                                             |   201/500       |
|   /product/:id          |    DELETE  |  Retrive single product by id                                |   204/500       |
|   /product/:id/review   |    POST    |  Add a review for product. Products can have many reviews.   |   201/500       |

**/interest**

|          Route          |   Method   |                     Description                              |    Codes        | 
|-------------------------|------------|--------------------------------------------------------------|-----------------|
|   /interest/:userid     |    POST    | Insert user interest. Users can have multiple interests.     |   201/500       |



## Getting Started

1. clone repo
2. npm i
3. npm start
