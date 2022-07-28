import { Request, Response } from "express"
import { ClassroomDatabase } from "../database/ClassroomDatabase";
import { Classroom } from "../models/Classroom";

export const createClassroom = async (req: Request, res: Response) => {
    let errorCode = 400;
    try {
        const { name, module } = req.body;

        const classroom = new Classroom(
            Date.now.toString(),
            name,
            module,
        )

        const classroomDatabase = new ClassroomDatabase();
        await classroomDatabase.createClassroom(classroom);

        
        
    } catch (error) {
        res.status(errorCode).send({ message: error.message });
    }
}

export const requestActiveClassroom = async (req: Request, res: Response) => {}

export const requestStudents = async (req: Request, res: Response) => {
    let errorCode = 400;
    try {
        const classroomId = req.params.id 
        console.log(classroomId)
        const classroomDatabase = new ClassroomDatabase();
        const students = await classroomDatabase.requestStudents(classroomId);

        res.status(200).send({students: students});
    } catch (error) {
        res.status(errorCode).send({ message: error.message });
    }
}

export const updateClassroomModule = async (req: Request, res: Response) => {}

