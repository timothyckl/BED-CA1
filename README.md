# SP IT!

## Checklist
- [x] Redo tables as some endpoint need to use table join operation
- [x] Create routes
    - [x] Create user routes.
    - [x] Create category routes.
    - [x] Create product routes.
    - [x] Create interest routes.
- [ ] Create additional/advanced features.
    - [x] Endpoint to upload/store images.
        - [ ] Validate file format. Only accept .jpg / .png and less than 1MB. 
    - [ ] Hash passwords to store into db.
        - [ ] Generate random salt specific to each userid.
    - [ ] Action logging system with timestamp for each request made.



### Features
- [x] User registration
- [x] Publication of product info
- [x] Insertion of products
- [x] User reviews

### Requirements
- [x] Create MySQL database
- [ ] Create entity relationship diagram
- [x] Proper use of PK and FK constraints
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
- [x] reviews
- [x] userInterest
- [ ] discount_codes

## Endpoints

**/user**

|          Route          |   Method   |                     Description                              |    Codes        | 
|-------------------------|------------|--------------------------------------------------------------|-----------------|
|   /users                |    GET     |  Retrieve array of all user/admin data                       |   200/500       |
|   /users                |    POST    |  Add new user                                                |   201/422/500   |
|   /users/:id            |    GET     |  Retrieve single user data by id                             |   200/500       |
|   /users/:id            |    PUT     |  Update single user data excluding id,timestamp              |   204/422/500   |

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
|   /product/:id          |    DELETE  |  Remove single product by id                                |   204/500       |
|   /product/:id/review   |    POST    |  Add a review for product. Products can have many reviews.   |   201/500       |

**/interest**

|          Route          |   Method   |                     Description                              |    Codes        | 
|-------------------------|------------|--------------------------------------------------------------|-----------------|
|   /interest/:userid     |    POST    | Insert user interest. Users can have multiple interests.     |   201/500       |



## Getting Started

1. clone repo
2. npm i
3. npm start
