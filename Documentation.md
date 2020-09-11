# Documentation

This is the documentation for this REST API. Before using it make sure you are connected to a database and a secret key and token variable is given in .env file.

## User Route

#### Registration Route

url: `/api/users/register`
method: `POST`

body params (Input):

    name:
    email:
    password:
    password2:

Output: JWT if sucess.
`Email is taken` if email is already registered.
`Password doesn't match` if password and password2 is not equal.

#### Login Route

url: `/api/users/login`
method: `POST`

body params (Input):

    email:
    password:

Output/Returns: JWT if sucess.
`Email is incorrect` if email is invalid.
`Password is incorrect` if password is invalid.

#### Get All User

url: `/api/users`
method: `GET`

required: JsonWebToken

body params (Input): None

Output/Returns: List of All Users if sucess.
`Authentication failed` if JWT is invalid.

#### Get One User

url: `/api/users/:id`
method: `GET`

required: JsonWebToken

body params (Input): None

Output/Returns: One user having that id if sucess.
`User doesn't exist` if id doesn't exist in database.
`Authentication failed` if JWT is invalid.

#### Update One User

url: `/api/users/:id`
method: `PATCH`

required: JsonWebToken

body params (Input): (All are optional)

    name:
    email:
    password:

Output/Returns: updated JWT if sucess.
`User doesn't exist` if id doesn't exist in database.
`Authentication failed` if JWT is invalid.

#### Delete One User

url: `/api/users/:id`
method: `DELETE`

required: JsonWebToken

body params (Input): None

Output/Returns: `User Deleted` if sucess.
`User doesn't exist` if id doesn't exist in database.
`Authentication failed` if JWT is invalid.

## Event Route

#### Get All Events

url: `/api/event`
method: `GET`

required: JsonWebToken

body params (Input): None

Output/Returns: List of All Events if sucess.
`Authentication failed` if JWT is invalid.

#### Get One Event

url: `/api/event/:id`
method: `GET`

required: JsonWebToken

body params (Input): None

Output/Returns: One Event having that id if sucess.
`Cannot find Event` if id doesn't exist in database.
`Authentication failed` if JWT is invalid.

#### Get All Event of One User

url: `/api/event/user/:user`
method: `GET`

required: JsonWebToken

body params (Input): None

Output/Returns: All Event of that user if sucess.
`Cannot find any events` if user doesn't exist in database.
`Authentication failed` if JWT is invalid.

#### Post One Event

url: `/api/event/:id`
method: `POST`

required: JsonWebToken

body params (Input):

    event_name:
    user:
    description:
    date_and_time:

Note: date_and_time can be given as miliseconds or as `yyyy/mm/dd hh:mm:ss`

Output/Returns: The posted event if sucess.
`Cannot find Event` if id doesn't exist in database.
`Authentication failed` if JWT is invalid.

#### Update One Event

url: `/api/event/:id`
method: `PATCH`

required: JsonWebToken

body params (Input): (All are optional)

    event_name:
    user:
    description:
    date_and_time:

Output/Returns: updated event if sucess.
`Cannot find Event` if id doesn't exist in database.
`Authentication failed` if JWT is invalid.

#### Delete One User

url: `/api/event/:id`
method: `DELETE`

required: JsonWebToken

body params (Input): None

Output/Returns: `Event Deleted` if sucess.
`Cannot find Event` if id doesn't exist in database.
`Authentication failed` if JWT is invalid.
