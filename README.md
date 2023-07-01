## SGroup Members Management API

This project is an API used to manage members of SGroup, built with Express.js. It provides various functionalities such as CRUD operations for members, voting, and permission management.

### Installation and Setup

To run this project, follow these steps:

1. Run `yarn` to download the necessary resources and packages.
2. Navigate to the `database` directory and execute the command `node InitDB.js` to initialize the database.
3. Run `node index.js` to start the project on port 8000.

### Usage

To use the API, refer to the following endpoints:

## Authentication API

This API provides authentication endpoints for user registration, login, password reset, and email functionalities. It is built using Express.js and utilizes JWT (JSON Web Tokens) for authentication.

### Endpoints

#### Register a New User

- URL: `POST /register`
- Description: Creates a new user account with the provided information.
- Request Body:
  - `fullname` (string): Full name of the user.
  - `gender` (string): Gender of the user.
  - `age` (number): Age of the user.
  - `username` (string): Username for the user.
  - `password` (string): Password for the user.
  - `email` (string): Email address of the user.
  - `role_id` (number): ID of the user's role.
- Responses:
  - `201 Created`: User account created successfully.
  - `404 Not Found`: Username already exists.
  - `500 Internal Server Error`: Error retrieving user or registering user.

#### User Login

- URL: `POST /login`
- Description: Authenticates the user and generates an access token.
- Request Body:
  - `username` (string): Username of the user.
  - `password` (string): Password of the user.
- Responses:
  - `200 OK`: User authenticated successfully. Returns the access token.
  - `400 Bad Request`: User not found or invalid username or password.
  - `500 Internal Server Error`: Error retrieving user.

#### Forgot Password

- URL: `POST /forgot`
- Description: Sends an email for password recovery.
- Request Body:
  - `emailFrom` (string): Sender's email address.
  - `emailTo` (string): Recipient's email address.
  - `emailSubject` (string): Subject of the email.
  - `emailText` (string): Body of the email.
- Responses:
  - `200 OK`: Email sent successfully.
  - `400 Bad Request`: Error occurred while sending the email.
  - `500 Internal Server Error`: Error occurred while sending the email.

#### Reset Password

- URL: `POST /reset_password`
- Description: Resets the user's password.
- Request Body:
  - `email` (string): Email address of the user.
  - `new_pass` (string): New password for the user.
  - `token` (string): Token for password verification.
- Responses:
  - `200 OK`: Password updated successfully.
  - `401 Unauthorized`: Invalid token.
  - `404 Not Found`: Email does not exist.
  - `500 Internal Server Error`: Error occurred while updating the password.

## User Management API

This API provides endpoints for managing users. It includes functionality such as retrieving users with pagination, retrieving user information by ID, adding a new user, deleting a user by ID, and updating a user.

### Endpoints

#### Get Users with Pagination

- URL: `GET /users`
- Description: Retrieves users with pagination. Requires authentication and authorization as `admin` or `moderator`.
- Query Parameters:
  - `page` (number, optional): Page number for pagination. Default is 1.
  - `email` (string, optional): Filter users by email.
  - `fullname` (string, optional): Filter users by fullname.
- Responses:
  - `200 OK`: Users retrieved successfully.
  - `500 Internal Server Error`: Error retrieving users.

#### Get User Information by ID

- URL: `GET /users/:id`
- Description: Retrieves user information by ID. Requires authentication and authorization as `admin` or `moderator`.
- Parameters:
  - `id` (number): ID of the user.
- Responses:
  - `200 OK`: User information retrieved successfully.
  - `400 Bad Request`: User not found.
  - `404 Not Found`: User not found.
  - `500 Internal Server Error`: Error getting user information.

#### Add a New User

- URL: `POST /users`
- Description: Adds a new user. Requires authentication and authorization as `admin` or `moderator`. Validates the user's name.
- Request Body:
  - `fullname` (string): Full name of the user.
  - `gender` (string): Gender of the user.
  - `age` (number): Age of the user.
  - `email` (string): Email of the user.
  - `username` (string): Username of the user.
  - `password` (string): Password of the user.
  - `created_by` (string): Created by information.
  - `role_id` (number): Role ID of the user.
- Responses:
  - `200 OK`: User added successfully.
  - `404 Not Found`: Error adding the user.

#### Delete a User

- URL: `DELETE /users/:id`
- Description: Deletes a user by ID. Requires authentication and authorization as `admin` or `moderator`.
- Parameters:
  - `id` (number): ID of the user.
- Responses:
  - `200 OK`: User deleted successfully.
  - `404 Not Found`: User not found.
  - `500 Internal Server Error`: Error removing the user.

#### Update a User

- URL: `PUT /users/:id`
- Description: Updates a user by ID. Requires authentication and authorization as `admin` or `moderator`. Validates the user's name.
- Parameters:
  - `id` (number): ID of the user.
- Request Body:
  - `fullname` (string): Updated full name of the user.
  - `gender` (string): Updated gender of the user.
  - `age` (number): Updated age of the user.
- Responses:
  - `204 No Content`: User updated successfully.
  - `400 Bad Request`: User not found.
  - `500 Internal Server Error`: Error updating the user.

## Poll Management API

This API provides endpoints for managing polls and options. It is built using Express.js and includes functionality such as creating a poll, retrieving poll details, deleting a poll, creating options, updating options, deleting options, and choosing/unchoosing options.

### Endpoints

#### Create a New Poll

- URL: `POST /polls`
- Description: Creates a new poll with the provided name and question.
- Request Body:
  - `poll_name` (string): Name of the poll.
  - `poll_question` (string): Question for the poll.
- Responses:
  - `200 OK`: Poll created successfully.
  - `500 Internal Server Error`: Error adding the poll.

#### Get Poll Details

- URL: `GET /polls/:id`
- Description: Retrieves the details of a poll by its ID.
- Parameters:
  - `id` (number): ID of the poll.
- Responses:
  - `200 OK`: Poll details retrieved successfully.
  - `404 Not Found`: Poll not found.
  - `500 Internal Server Error`: Error getting poll details.

#### Delete a Poll

- URL: `DELETE /polls/:id`
- Description: Deletes a poll by its ID.
- Parameters:
  - `id` (number): ID of the poll.
- Responses:
  - `200 OK`: Poll deleted successfully.
  - `400 Bad Request`: Poll not found.
  - `500 Internal Server Error`: Error deleting the poll.

#### Create a New Option

- URL: `POST /polls/options`
- Description: Creates a new option for a poll.
- Request Body:
  - `poll_id` (number): ID of the poll.
  - `content` (string): Content of the option.
- Responses:
  - `200 OK`: Option created successfully.
  - `500 Internal Server Error`: Error adding the option.

#### Update an Option

- URL: `PUT /polls/options/:id`
- Description: Updates an option by its ID.
- Parameters:
  - `id` (number): ID of the option.
- Request Body:
  - `content` (string): Updated content of the option.
- Responses:
  - `200 OK`: Option updated successfully.
  - `404 Not Found`: Option not found.
  - `500 Internal Server Error`: Error updating the option.

#### Delete an Option

- URL: `DELETE /polls/options`
- Description: Deletes an option.
- Request Body:
  - `option_id` (number): ID of the option.
- Responses:
  - `200 OK`: Option deleted successfully.
  - `404 Not Found`: Option not found.
  - `500 Internal Server Error`: Error removing the option.

#### Choose/Unchoose an Option

- URL: `POST /polls/choose_options`
- Description: Allows choosing or unchoosing an option for a poll.
- Request Body:
  - `option_id` (number): ID of the option.
  - `created_by` (string): Created by information.
- Responses:
  - `200 OK`: Option chosen/unchosen successfully.
  - `500 Internal Server Error`: Error choosing/unchoosing the option.

Feel free to reach out if you have any questions or need further assistance. Happy coding!

