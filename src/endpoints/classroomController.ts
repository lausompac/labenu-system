import { Request, Response } from "express"
import { ClassroomDatabase } from "../database/ClassroomDatabase";
import { Classroom } from "../models/Classroom";

export class ClassroomController {

    create = async (req: Request, res: Response) => {
        let errorCode = 400;
        try {
            const { name, module } = req.body;

            const classroom = new Classroom(
                Date.now().toString(), //criar lógica para seguir o padrão de id
                name,
                module,
            )

            const classroomDatabase = new ClassroomDatabase();
            await classroomDatabase.create(classroom);

            res.status(200).send({ message: "Classroom created" });

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

    requestStudents = async (req: Request, res: Response) => {
        let errorCode = 400;
        try {
            const classroomId = req.params.id
            const classroomDatabase = new ClassroomDatabase();
            const students = await classroomDatabase.requestStudents(classroomId);

            res.status(200).send({ students: students });
        } catch (error) {
            res.status(errorCode).send({ message: error.message });
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

            const classroomDatabase = new ClassroomDatabase();
            const classroom = await classroomDatabase.updateModule(id, module);

            res.status(200).send({ message: "Classroom module updated" });


        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }

    }


}   
