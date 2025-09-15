Please follow the below given instruction

========================================





SQL

===

Install MySQL server 8.0

add the below path into the environment variables

C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin



open an terminal and run

C:\\Windows\\System32>sql -u root -p

enter password as root

Note: give the same password in application.properties



mysql>CREATE DATABASE teacher\_admin;



mysql>SHOW DATABASES;



mysql>USE teacher\_admin;







mysql>CREATE TABLE teacher (

&nbsp;   id INT AUTO\_INCREMENT PRIMARY KEY,

&nbsp;   name VARCHAR(100) NOT NULL,

&nbsp;   email VARCHAR(100) UNIQUE NOT NULL

);



mysql>CREATE TABLE student (

&nbsp;   id INT AUTO\_INCREMENT PRIMARY KEY,

&nbsp;   name VARCHAR(100) NOT NULL,

&nbsp;   email VARCHAR(100) UNIQUE NOT NULL

);



mysql>CREATE TABLE teacher\_student (

&nbsp;   teacher\_id INT NOT NULL,

&nbsp;   student\_id INT NOT NULL,

&nbsp;   PRIMARY KEY (teacher\_id, student\_id),

&nbsp;   FOREIGN KEY (teacher\_id) REFERENCES teacher(id),

&nbsp;   FOREIGN KEY (student\_id) REFERENCES student(id)

);



sql>show tables

( list down the created tables)



==============================================

Insert the values into teacher table and student table

---------------------------------



INSERT INTO teacher (name, email) VALUES ('Teacher Ken', 'teacherken@gmail.com');

INSERT INTO student (name, email) VALUES ('Student Jon', 'studentjon@gmail.com');

INSERT INTO student (name, email) VALUES ('Student Hon', 'studenthon@gmail.com');



Insert into teacher\_student

-------------------



INSERT INTO teacher\_student (teacher\_id, student\_id) VALUES (1, 1);

INSERT INTO teacher\_student (teacher\_id, student\_id) VALUES (1, 2);


visual studio code
===================
create a project using the visual studio code

npm install express sequelize mysql2 dotenv

npm install --save-dev nodemon jest supertest
Running the Server

c:NodeJS\teacher-student-api> npm run dev


To run the test
===============
c:NodeJS\teacher-student-api>npm test


Postman tool

---------------



Method :POST

URL: http://localhost:8080/api/register

Header content-type

Content-Type: application/json



{

&nbsp; "teacher": "teacherken@gmail.com",

&nbsp; "students": \["studentjon@gmail.com","studenthon@gmail.com"]

}



Expected value: 204 No content





Method GET:

URL: http://localhost:8080/api/commonstudents?teacher=teacher1@gmail.com\&teacher=teacher2@gmail.com

Expected value 200 OK

{

&nbsp;   "students": \[]

}





Method:post

URL:http://localhost:8080/api/retrievenotifications

Header content-type

Content-Type: application/json

{

&nbsp; "teacher": "teacherken@gmail.com",

&nbsp; "notification": "Hello students! @studenthon@gmail.com"

}



Expected value 200 OK

{

&nbsp;   "recipients": \[

&nbsp;       "studenthon@gmail.com"

&nbsp;   ]

}



Method:pOST

URL: http://localhost:8080/api/suspend

Json content

{

&nbsp; "student": "studentjon@gmail.com"

}



Expected value 200

{

&nbsp;   "message": "Student suspended successfully"

}



wrong endpoint

=============

http:post

url:http://localhost:8080/api/retrievenotification

Json content

{

&nbsp; "teacher": "teacherken@gmail.com",

&nbsp; "notification": "Hello students! @studenthon@gmail.com"

}



expected value 404 not found

{



&nbsp;   "path": "/api/retrievenotification",

&nbsp;   "message": "Please chcek the request endpoint matches with the controller"

}

project structure
================
teacher-student-api/
|- src/
|   |  app.js             ;; express app setup
|   |-- server.js         ;; entry point
|   |-- config/db.js      ;; sequelize DB config
|   |-- models/           ;; sequelize models define database table
|   |-- routes/           ;; express routes
|   |-- controllers/      ;; request handlers ;;receives HTTP requests 
							;;and calls corresponding service functions.
|-- tests/                ;; jest test cases
|-- .env                   ;;environment variables
|-- package.json
|-- README.md