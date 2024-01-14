[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/wIL3EZhN)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13328299&assignment_repo_type=AssignmentRepo)

![](http://143.42.108.232/pvt/Noroff-64.png)
# Noroff

## Back-end Development Year 1
### REST API - Course Assignment 1 <sup>V2</sup>

Startup code for Noroff back-end development 1 - REST API course.

Instruction for the course assignment is in the LMS (Moodle) system of Noroff.
[https://lms.noroff.no](https://lms.noroff.no)

![](http://143.42.108.232/pvt/important.png)

You will not be able to make any submission after the deadline of the course assignment. Make sure to make all your commit **BEFORE** the deadline

![](http://143.42.108.232/pvt/help_small.png)

If you are unsure of any instructions for the course assignment, contact out to your teacher on **Microsoft Teams**.

**REMEMBER** Your Moodle LMS submission must have your repository link **AND** your Github username in the text file.

---

# Application Installation and Usage Instructions

1. Create a database in Mysql workbench called mytodo, make sure the user and password are the same as in the .env file.
2. Clone the repository to your local machine.
3. Run npm install to install all the dependencies.
4. Start the application with npm start. The server will start on the defined PORT in your .env file.

# Environment Variables

To run this project, you need to add the following environment variables to your .env file:

HOST - The host on which your server is running. (localhost).
ADMIN_USERNAME - The username for administrative access. (your sql username)
ADMIN_PASSWORD - The password for administrative access. (your sql password)
DATABASE_NAME - The name of your database. (mytodo)
DIALECT - The database dialect you are using. (mysql)
PORT - The port number where the server will listen. (3000)



TOKEN_SECRET - This is a secret key used for signing and verifying JSON Web Tokens . You can generate a random string and use it as your secret.

To generate a token secret using Node.js:
1. Open you terminal
2. Type require('crypto').randomBytes(64).toString('hex')
3. use the generated string as your token secret in the .env file where it says "insert token here"

# Additional Libraries/Packages

This project uses the following additional libraries/packages:

1. cookie-parser
2. debug
3. dotenv
4. ejs
5. express
6. http-errors
7. install
8. jsend
9. jsonwebtoken
10. morgan
11. mysql
12. mysql2
13. npm
14. sequelize
15. swagger-autogen
16. swagger-ui-express

# NodeJS Version Used

The project is developed using NodeJS version: v20.10.0

# POSTMAN Documentation link

https://web.postman.co/workspace/apicourse~09a005e3-a612-4bb9-a188-ddd5f678a99b/folder/30462636-4721c1d2-30d5-426a-b43f-46e482cd3087




