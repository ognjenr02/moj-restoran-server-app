# Project Title

Server-side project for React Native Mobile Application named My Restaurant. Entire code was written in JavaScript. It communicates with MySQL database.

## Description

This project is an Express.js server application that interfaces with a MySQL database to manage user authentication, user data, and reviews for a restaurant review platform. It includes endpoints for user registration, login, and CRUD operations for user and review data.

## Features

    User authentication with JWT
    CRUD operations for users and reviews
    Image upload for reviews with Multer
    Logging with Morgan
    Connection pooling with MySQL


## Getting Started

### Dependencies

    Node.js
    Express.js
    MySQL
    JWT for authentication
    Multer for handling multipart/form-data
    Morgan for HTTP request logging
    dotenv for environment variable management


### Installing

Clone the repository to your local machine.
Install the required dependencies:

    npm install

Set up your MySQL database and create the necessary tables.
Create a .env file in the root directory and fill in your MySQL credentials:

    MYSQL_HOST=your_host
    MYSQL_USER=your_user
    MYSQL_PASSWORD=your_password
    MYSQL_DATABASE=your_database


### Executing program

Start the server:

    npm start

The server will be running on http://localhost:8080.


## API Reference

### Authentication

    /login - POST: Logs in a user and returns a JWT.
    /registerUsers - POST: Registers a new user.


### Users

    /getUsers - GET: Retrieves all users.
    /getUser/:idUser - GET: Retrieves a user by ID.


### Reviews

    /getReviews - GET: Retrieves all reviews.
    /getReviewById/:id - GET: Retrieves a review by ID.
    /addReview - POST: Adds a new review, with support for image uploads.


## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

    Fork the project.
    Create your feature branch (git checkout -b feature/AmazingFeature).
    Commit your changes (git commit -m 'Add some AmazingFeature').
    Push to the branch (git push origin feature/AmazingFeature).
    Open a pull request.


## License

This project is licensed under the [LICENSE NAME] License - see the LICENSE.md file for details.

## Acknowledgments

### Inspiration, code snippets, etc.

    Node.js
    Express.js
    MySQL
    JWT
    Multer
    Morgan
    dotenv


## Contact

LinkedIn - https://www.linkedin.com/in/ognjen-rodi%C4%87-4595241b3/

Project Link: https://github.com/ognjenr02/my-restaurant-server-app
