import { Request, Response } from "express"
import { ClassroomDatabase } from "../database/ClassroomDatabase";
import { Classroom, CLASS_MODULE } from "../models/Classroom";

export class ClassroomController {
    create = async (req: Request, res: Response) => {
        let errorCode = 400;
        try {
            const { name } = req.body;
            
            if (!name) {
                throw new Error("Name is required")
            }

            if (name < 3 || name > 15) {
                throw new Error("Name must be between 3 and 15 characters")
            }

            const classroomDatabase = new ClassroomDatabase();

            const newId = await classroomDatabase
                .requestClassLastId()

            const classroom = new Classroom(
                (newId + 1).toString(),
                name,
                CLASS_MODULE.CLASS_MODULE_0,
            )

            await classroomDatabase.create(classroom);

            res.status(200).send({ message: "Classroom created", classroom });
        } catch (error) {
            res.status(errorCode).send({ message: error.message });
        }
    }

    requestActiveClassroom = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const classroomDatabase = new ClassroomDatabase();
            const classrooms = await classroomDatabase.requestActiveClassroom();

            res.status(200).send({ message: "Active classrooms", classrooms });

        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    updateModule = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const { id } = req.params;
            const { module } = req.body;

            if (!id || !module) {
                throw new Error("Missing id or module")
            }

            if (module < 0 || module > 6) {
                throw new Error("Module must be between 0 and 6")
            }

            const classroomDatabase = new ClassroomDatabase();
            const classroom = await classroomDatabase.updateModule(id, module);

            res.status(200).send({ message: "Classroom module updated" });
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    requestStudents = async (req: Request, res: Response) => {
        let errorCode = 400;
        try {
            const classroomId = req.params.id

            if (!classroomId) {
                throw new Error("Classroom id is required")
            }

            const classroomDatabase = new ClassroomDatabase();
            const students = await classroomDatabase.requestStudents(classroomId);

            res.status(200).send({ message: "Students:", students });
        } catch (error) {
            res.status(errorCode).send({ message: error.message });
        }
    }
}   
