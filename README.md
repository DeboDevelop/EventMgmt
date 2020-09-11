# EventMgmt

It is a REST API created for Sarayu Digital Labs interview. It haves a user route and events route. You can register an account and become a user. A user can add, edit adn delete events.

[Hosted Version Here](https://event-debodevelop.herokuapp.com/)

## Requirements

node v10.22.0 or above.

npm v6.14.7 or above.

## To Run Locally

1.  Clone the repository

2.  Install the Dependencies

    `npm install`

3.  You can install mongodb or you can make a cluster on mongodb atlas.

4.  Create a .env file and add the following info.

    `TEST_TOKEN`

    `DATABASE_URL`

    `SECRET_KEY`

5.  Run the Server
    For Development `npm run dev`
    For Production `npm run start`

6.  Open localhost:3000 to open the homepage and use it.

## To Run Unit Test

`npm run test`

## Documentation

[Documentation](./Documentation.md)

## Author

[Debajyoti Dutta](https://github.com/DeboDevelop)
