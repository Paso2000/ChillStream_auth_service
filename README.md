# ChillStream_auth_service
AWS Project, content service part.
This project provides an API for managing users and their associated profiles.
The service is built using NodeJS, express, and MongoDB, leveraging a modular architecture for handling
routes and validations.

## Features
### User Management
- Create a User: Automatically initializes the user with a default profile.
- Retrieve Users: Fetch all users or a specific user by ID.
- Update User: Modify user details.
- Delete User: Remove a user and all their associated profiles.

## Profile Management
- Add Profile: Add a new profile to a specific user and update their profile list.
- Retrieve Profiles: Fetch all profiles for a user or a specific profile by ID.
- Update Profile: Modify the details of a profile.
- Delete Profile: Remove a profile and update the user's profile list.

## API Endpoints
### Users
```GET /users```: Retrieve all users.

```POST /users```: Create a new user with a default profile.

```GET /users/<userId>```: Retrieve details of a specific user.

```PUT /users/<userId>```: Update details of a specific user.

```DELETE /users/<userId>```: Delete a user and all associated profiles.

### Profiles
```GET /users/<userId>/profiles```: Retrieve all profiles for a specific user.

```POST /users/<userId>/profiles```: Add a new profile to a user.

```GET /users/<userId>/profiles/<profileId>```: Retrieve a specific profile for a user.

```PUT /users/<userId>/profiles/<profileId>```: Update a specific profile for a user.

```DELETE /users/<userId>/profiles/<profileId>```: Delete a profile for a user.

## Usage
### Example Requests

#### Create a User
```{
    {
    "name": "Luca",
    "surname": "PAAso",
    "isAdmin":true,
    "password": "marcomangno",
    "email": "paso@passini",
    "date_of_birth": "07-07-2000",
    "paymentMethod": "carta"
}
```
#### Add a Profile
```
{
"profileImage": "/sfondo2.png",  
"nickname": "Giamma"
}
```

## License
This project is licensed under the MIT License. See the LICENSE file for details.
