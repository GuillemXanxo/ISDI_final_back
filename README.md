# Transporta't Pallars

This is a REST API serving to the project Transporta't Pallars.
It has been developed with NodeJS using Express, used JasonWebToken for authentication and password encryption and it connects to a MongoDB database using Mongoose.

Production site (front):[https://transportatpallars-guillem-xanxo.netlify.app/]
Front react project: [https://github.com/isdi-coders-2022/Guillem-Xanxo_Front-Final-Project-202201-BCN]

## Endpoints

**/viatges** --> all routes managing trips creating and retrieving trips from the database.
**/crono** --> GET: serves all the trips in the database sorted by date of the trip.
**/publicats** --> GET: serves all trips belonging to the user received in the headers request.
**/:id** --> GET: serves one trip with the id passed by params.
**/:id** --> DELETE: deletes the trip with the id passed by params in the trips database and user's array of trips.
**/crear** --> POST: creates the trip received in the body in the trips database and is assigned to a user.

**/usuari** --> manages all routes thats only affect users database.
**/login** --> it receives the user and password and serves a token key to access other endpoints.
**/register** --> it creates a user in the database.

## How to start as a developer/contributor

Please, fork the project in orther to add features if you would like to contribute to the project. Once you have the GitHub repository forked and downloaded proceed:

### `npm install`

This command will install all npm packages listed in dependencies JSON.

### `npm build`

This command will prepare and build the project for production.

### Testing

It is aimed to unit test all components and pages. Testing has been done with Jest and React Testing library following the Given-When-Then schema to explain each test.
To run all test run ` npm test`.
To run a coverage test use `npm run coverage`.

SonarQube has been used as a static controll tool.
