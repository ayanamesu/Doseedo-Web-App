# CSC648-01-sp24-TEAM4 Repository > backend Folder
Welcome to the Backend/Server part of our application

## Backend Framework Used
- Node.js
- MySQL

## Files in this folder
1. db_code > doseedodb.sql -- Database Build
    - This is code that is used to create our schema for this project
    - You can run this script in your MySQL UI to replicate the database structure we use in our project for your local computer

2. db.js -- Database Configuration file
    - A .env file is needed to access our RDS instance
    - If you do not have a .env file, you can input your db information in the `else` case 

3. server.js -- The entire backend of our application
    - Here we have all the libraries that are needed to have our server function, as well as all the backend endpoints needed for the frontend to call and get information from

4. server.test.js -- Unit testing for our server.js file
    - We are using Jest to do all of our unit testing

## Running server.js on your local computer via localhost:8000
1. If you are downloading this for the first time, please make sure to do the following:
    - `cd backend`
    - run `npm install`
        - This will make sure you download all the packages and dependecies needed to run server.js
2. Once you cd into backend, you can run `node server.js` to start the server
3. (Optional) Testing our backend APIs with Postman
    - Once the server is running, you can open Postman to test our backend APIs
    - Ensure the right method (GET, POST)
    - Type in the endpoint you're like to try ex/ `https:localhost:8000/<endpoint>`
    - Reference server.js endpoint notes to test out values
    - If you are encountering any errors, it could be due to your local MySQL schema that does not match ours. Please refer to the 

## Running Unit Testing for server.test.js
Please ensure you have some data in your database before doing unit testing
1. Change the `TEST VALUES` to information from your database or as per directed
2. cd into the backend folder
3. Run `npm test` to just test the functions **OR** if you would like to see the coverage testing, run `npm coverage`

## server.js API Notes
Almost all of the endpoints use the POST method since almost always a user_id is needed to query the database properly.
Here is a list of our APIs and what information is required for the frontend to send and how the backend will respond
- /login
    * Frontend req: email, password
    * Backend res: Status code, session_id, user_id, account_type
- /register
    * Frontend req: first_name, last_name, email, password, account_type
    * Backend res: Status code, msg
- /session
    * Frontend req:session
    * Backend res: Status code, user_id, session_id
- /profile
    * Frontend req: user_id
    * Backend res: Status code, all user information (first_name, last_name, email, phone, account_type, address_1, address_2, state, city, zip_code)
- /profile/edit
    * Frontend req: user_id, IF ANY CHANGES: (first_name, last_name, email, phone, address_1, address_2, state, city, zip_code)
    * Backend res: Status code, msg
- /showcaregivers
    * Frontend req: user_id
    * Backend res: Status code, all user information of caregiver(s) (first_name, last_name, email, phone, address_1, address_2, state, city, zip_code)
- /showpatients
    * Frontend req: user_id
    * Backend res: Status code, all user information of patient(s) (first_name, last_name, email, phone, address_1, address_2, state, city, zip_code)
- /linkAccounts
    * Frontend req: user_id, email
    * Backend res: Status code, msg
- /addmedicine
    * Frontend req: user_id, med_name, description (optional), dose_amt, start_date, end_date (optional), doctor_first_name, doctor_last_name, doctor_phone
    * Backend res: Status code, msg
- /deletemedicine
    * Frontend req: prescription id
    * Backend res: Status code, msg
- /viewmedicine
    * Frontend req: user_id
    * Backend res: Status code, prescription information (id, user_id, med_name, description, dose_amt, start_date, end_date, doctor_first_name, doctor_last_name, doctor_phone)
- /emergencycontact
    * Frontend req: user_id
    * Backend res: Status code, msg
- /emergencycontact/add
    * Frontend req: user_id, first_name, last_name, email, phone
    * Backend res: Status code, msg
- /logout
    * Frontend req: session_id
    * Backend res: Status code, msg






