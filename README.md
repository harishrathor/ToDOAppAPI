# ToDoAppAPI
NodeJS API for ToDo Application

## API Guid

### For User 

#### User registration: POST http://localhost:8080/user/signup
* Parameters: username,password,name

#### User authentication: POST http://localhost:8080/user/authenticate
* Parametes: username,password
* It returns jsonwebtoken.

#### User profile info: GET http://localhost:8080/user/memberinfo
* Parameters: No Parameters
* Header:authorization:user_token

### For ToDo list 

#### Insert a ToDo item in the list: POST http://localhost:8080/todo/list
* Parameters: username, todoitem, description, status, catagory, target_date
* Header: authorization: user_token 

#### Get ToDo list: GET http://localhost:8080/todo/list
* Parameter: No parameters
* Header: authorization:user_token

#### Update a ToDo list item: PUT http://localhost:8080/todo/list/#OfListItem
* Parameters: username, todoitem, description, status, catagory, target_date
* Header: authorization:user_token

#### Delete a ToDo list item: DELETE http://localhost:8080/todo/list/#OfListItem
* Parameters: 
* Header: authorization:user_token
