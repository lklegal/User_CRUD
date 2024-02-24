# User CRUD

This is a very simple practice project for the "Vem Ser Tech - Backend" bootcamp, from Ada Tech. Here I put in practice what I have learned from how to make RESTful APIs.

Here a fictional user can create an account, login to their account, see all usernames in the database without having to login (I'm sure that's fine), see all their own data (hashed passwors, salts and all), change their password and delete their account.

Authentication is done using JWT. Password security is basic hash and salt.

If you want to test it, note that you'll need to use your own environment variables to setup your mysql connection, as well as the jwt authentication with the JWT_SECRETKEY variable. You can also set the environment variable PORT to set up the port the application will listen to, or use the application's default port 3000. Finally, you'll also need to use the sql code in the ./schema/create_schema file to create the database that the API uses. Then execute the server.js file.