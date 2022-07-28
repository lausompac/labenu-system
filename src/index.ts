import express from 'express'
import cors from 'cors'
import { ping } from './endpoints/pingController';
import { ClassroomController } from './endpoints/ClassroomController';
import { StudentController } from './endpoints/StudentController';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3003, () => {
    console.log(`Server is running on port ${process.env.PORT || 3003}`)
});

const classroomController = new ClassroomController();
const studentController = new StudentController();

// Endpoint test
app.get('/ping', ping);

// Endpoint 1 - Create Classroom
app.post("/classroom", classroomController.create)

// Endpoint 2 - Request Active Classroom
app.get("/classroom", classroomController.requestActiveClassroom)

// Endpoint 3 - Change Classroom Module
app.put("/classroom", classroomController.updateModule)

// Endpoint 4 - Create Student
app.post("/student", studentController.create)

// Endpoint 5 - Request Student by name
app.get("/student", studentController.requestByName)

// Endpoint 6 - Change Student Classroom
app.put("/student", studentController.uptadeClassroom)

// Endpoint 7 - Request Students
app.get("/classroom/:id/students", classroomController.requestStudents)