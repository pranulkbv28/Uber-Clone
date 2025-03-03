# Uber Clone Backend

This is the backend for the Uber Clone project. It is built using **Node.js**, **Express.js**, and **MongoDB**.

## Pre-requisites

- Node.js

## Getting Started

- **A note**: The entry point for the backend is `index.js`.

1. Enter the backend directory from the main directory:

    ```bash
    cd backend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    npx nodemon # this will start the server by keeping the index.js as the entry point
    ```

## API Endpoints

### Auth - `/api/v1/auth`

#### Create User - `/create`

- **METHOD**: `POST`
- **BODY**:

```json
{
    "fullname": {
        "firstname": String,
        "lastname": String
    },
    "email": String,
    "password": String
}
```

- **RESPONSE**:

```json
{
    "statusCode": Number,
    "data": {
        "createdUser": {
            "fullname": {
                "firstname": String,
                "lastname": String
            },
            "_id": String,
            "email": String,
            "createdAt": String,
            "updatedAt": String,
            "__v": Number
        },
        "token": String. 
    },
    "message": String,
    "success": Boolean
}
```

#### Login - `/login`

- **METHOD**: `POST`
- **BODY**:

```json
{
    "email": String,
    "password": String
}
```

- **RESPONSE**:

```json
{
    "statusCode": Number,
    "data": {
        "loggedInUser": {
            "fullname": {
                "firstname": String,
                "lastname": String
            },
            "_id": String,
            "email": String,
            "createdAt": String,
            "updatedAt": String,
            "__v": Number
        },
        "token": String. 
    },
    "message": String,
    "success": Boolean
}
```

#### Logout - `/logout`

- **METHOD**: `POST`
- **HEADERS**:

```json
{
    "Authorization": String
}
```

- **RESPONSE**:

```json
{
    "statusCode": Number,
    "message": String,
    "data": {},
    "success": Boolean
}
```

#### Get Profile - `/profile`

- **METHOD**: `GET`
- **HEADERS**:

```json
{
    "Authorization": String // or from cookies
}
```

- **RESPONSE**:

```json
{
    "statusCode": Number,
    "user": {
        "fullname": {
            "firstname": String,
            "lastname": String
        },
        "_id": String,
        "email": String,
        "createdAt": String,
        "updatedAt": String,
        "__v": Number
    },
    "message": String,
    "success": Boolean
}
```

### Captain - `/api/v1/captain`

#### Create Captain - `/create-captain`

- **METHOD**: `POST`
- **BODY**:

```json
{
    "fullname": {
        "firstname": String,
        "lastname": String
    },
    "email": String,
    "password": String,
    "vehicle": {
        "vehicleType": String,
        "color": String,
        "numberPlate": String,
        "capacity": Number,
    }
}
```

- **RESPONSE**:

```json
{
    "statusCode": Number,
    "data": {
        "createdCaptain": {
            "fullname": {
                "firstname": String,
                "lastname": String
            },
            "_id": String,
            "email": String,
            "createdAt": String,
            "vehicle": {
                "vehicleType": String,
                "color": String,
                "numberPlate": String,
                "capacity": Number,
                "_id": String,
                "createdAt": String,
                "updatedAt": String,
                "__v": Number
            },
            "updatedAt": String,
            "__v": Number
        },
        "token": String,
    },
    "message": String,
    "success": Boolean
}
```
