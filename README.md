# ToDoAppAPI
ToDo-API built using NodeJS.

## API Guide

### For User 

#### User registration: POST /user/signup
* Parameters: username, password, name

#### User authentication: POST /user/authenticate
* Parametes: username, password
* It returns jsonwebtoken.

#### User profile info: GET /user/memberinfo
* Parameters: No Parameters
* Header: authorization: user_token

### For ToDo list 

#### Insert an item in the list: POST /todo/list
* Parameters: username, todoitem, description, status, catagory, target_date
* Header: authorization: user_token 

#### Get the list: GET /todo/list
* Parameter: No parameters
* Header: authorization: user_token

#### Update an item in the list: PUT /todo/list/#OfListItem
* Parameters: username, todoitem, description, status, catagory, target_date
* Header: authorization: user_token

#### Delete an item in the list: DELETE /todo/list/#OfListItem
* Parameters: none
* Header: authorization: user_token
