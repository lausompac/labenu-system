import express from 'express'
import cors from 'cors'
import { ping } from './endpoints/pingController';
import { createClassroom, requestActiveClassroom, requestStudents, updateClassroomModule } from './endpoints/classroomController';
import { createStudent, requestStudentByName, uptadeStudantClassroom } from './endpoints/studentController';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3003, () => {
    console.log(`Server is running on port ${process.env.PORT || 3003}`)
});

// Endpoint test
app.get('/ping', ping);

// Endpoint 1 - Create Classroom
app.post("/classrooom", createClassroom)

// Endpoint 2 - Request Active Classroom
app.get("/classroom", requestActiveClassroom)

// Endpoint 3 - Change Classroom Module
app.put("/classroom", updateClassroomModule)

// Endpoint 4 - Create Student
app.post("/student", createStudent)

// Endpoint 5 - Request Student by name
app.get("/student", requestStudentByName)

// Endpoint 6 - Change Student Classroom
app.put("/student", uptadeStudantClassroom)

// Endpoint 7 - Request Students
app.get("/classroom/:id/students", requestStudents)