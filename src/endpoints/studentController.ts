import { Request, Response } from "express";
import { StudentDatabase } from "../database/StudentDatabase";
import { Student } from "../models/Student";

export class StudentController {

    create = async (req: Request, res: Response) => {
        let errorCode = 400;
        try {
            const { name, email, birthDate, classroom_id } = req.body;
            const hobbies = req.body.hobbies;

            if (!name || !email || !birthDate) {
                throw new Error("Missing parameters");
            }

            if (typeof name !== "string" || typeof email !== "string") {
                throw new Error("Invalid parameters");
            }

            if (!hobbies) {
                throw new Error("Missing hobbies");
            }

            if (!email.includes("@")) {
                throw new Error("Invalid email");
            }

            if (birthDate) {
                function isOver18(birthDate: string) {
                    const date = new Date(birthDate);
                    const currentDate = new Date();
                    const age = currentDate.getFullYear() - date.getFullYear();
                    return age >= 18;
                }
                if (!isOver18(birthDate)) {
                    throw new Error("Student is under 18 years old");
                }
            }

            const studentDatabase = new StudentDatabase();

            const newStudentId = await studentDatabase
                .requestStudentLastId();

            const student = new Student(
                (newStudentId + 1).toString(),
                name,
                email,
                birthDate,
                classroom_id,
            )

            await studentDatabase.create(student);

            for (let i = 0; i < hobbies.length; i++) {
                const hobby = hobbies[i];

                await studentDatabase.createHobby(student, hobby);
            }

            res.status(200).send({ message: "Student created", student });
        } catch (error) {
            res.status(errorCode).send({ message: error.message });
        }
    }

    requestByName = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const name = req.query.name as string

            if (name) {
                const studentDatabase = new StudentDatabase();
                const students = await studentDatabase.requestByName(name);
                res.status(200).send({ students: students });
            }

            const studentDatabase = new StudentDatabase();
            const students = await studentDatabase.requestByName(null);

            res.status(200).send({ students: students });
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    updateClassroom = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const { id } = req.params
            const { classroom_id } = req.body

            if (!id || !classroom_id) {
                throw new Error("Missing id or classroom_id")
            }

            if (typeof id !== "string" || typeof classroom_id !== "string") {
                throw new Error("Invalid id or classroom_id")
            }

            const studentDatabase = new StudentDatabase();
            const student = await studentDatabase.updateClassroom(id, classroom_id);

            res.status(200).send({ message: "Classroom updated" });
        } catch (error) {
            res.status(errorCode).send({ message: error.message });
        }
    }
}

