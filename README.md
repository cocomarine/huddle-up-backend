# Welcome to huddleUp!

<img src="img/huddleUp_title.jpg" width="400" height="120" alt="huddleUp title logo" title="huddleUp title logo"/>

## Table of contents

- [Introduction](#introduction)
- [How it works](#how-it-works)
- [Concepts covered](#concepts-covered)
- [Setup & getting started](#setup-&-getting-started)
- [API end points](#API-end-points)
- [Models](#models)
- [Future works](#future-works)
- [Author](#author)

## Introduction

This is an app for organising meet-ups with groups of friends and family created by using React, ExpressJS and PosgreSQL.
Users can create events and invite others to join. Upon creating and/or joining an event, users can make a suggestion and/or cast a vote on the event location. When everyone finishes voting, the most voted option is displayed. 
This is the backend repo for the app created by [HJ](https://github.com/cocomarine) and [Rayhan](https://github.com/RayBeera) as part of the Command Shift bootcamp course [(original frontend repo](https://github.com/RayBeera/HuddleUp-frontend), [latest frontend repo)](https://github.com/cocomarine/huddle-up-frontend). 

## How it works

This project involves creating an Express API that stores information about users, events, suggestions and userevents in a PostgreSQL database. A user can create an account by signing up, which will create a new user entry in 'users' table. When a user logs in, the auth controller compares the credentials with those stored in the database and generates a JWT (Json Web Token); upon finding a match, the access token will be added to the user data for accessing the app. After authentication, a user can create an event in 'events' table'; an invite code is generated in the frontend using React and this can be used to invite other users. Users can join the event using the invite code and start making suggestions and/or cast votes. 

## Concepts covered

- Interpreting user stories and translating into app features
- Creating a web server using Express
- Handling HTTP requests and responses and errors
- Creating API using CRUD (Create, Read, Update and Delete) operations on databases
- Routing, middleware and controller functions
- Database synchronisation, manipuation and validation using Sequelize, a promise-based Node.js ORM (Object-Relational Mapping) tool
- Establishing complex relationships between database tables
- Authentication and authorisation using bcrypt and JWT (JSON Web Token)
- Use of CORS (Cross-Origin Resource Sharing) to allow whitelisted requests to the web server
- Creating test and development PostgreSQL databases in a Docker container
- Use of helpers and refractoring to make code DRY
- Using Postman to manage API requests
- Integration testing using Mocha, Chai and SuperTest
- Use of Dotenv to store sensitive information

## Setup & getting started

1. Start by running postgres in a Docker container.
2. Add a new pgAdmin server that connects to the container-run postgres. 
3. Clone this repo and install project dependencies. 
```bash 
git clone git@github.com:[your-github-username]/hudddle-up-backend 
npm install
```
4. Create .env and .env.test files in the root of your project in the same format as the .env.example file. 
5. To test or run the app, run the following commands.
```bash
npm test  # to test the codes
npm start # to start the app at http://localhost:3000
```
6. Use Postman and pgAdmin to check if the CRUD operations are working.

----------------
## API end points

----------------
## API methods

------------------
## Models


------------------

## Author

👤 **HJ Kang** 
- GitHub [@cocomarine](https://github.com/cocomarine) 
- LinkedIn [@hj-kang07](https://www.linkedin.com/in/hj-kang07/) 