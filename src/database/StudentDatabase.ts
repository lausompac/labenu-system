import { Student } from "../models/Student";
import { BaseDatabase } from "./BaseDatabase";


export class StudentDatabase extends BaseDatabase {
    public static TABLE_STUDENT = "Labe_Student";

    public async create(student: Student) {
        await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENT)
            .insert({
                id: student.getId(),
                name: student.getName(),
                email: student.getEmail(),
                birthDate: student.getBirthDate(),
                classroom_id: student.getClassroom()
            })
    }

    public async requestByName(name: string) {
        const checkStudent = await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENT)
            .where("name", "=", `${name}`)
            .select()

        if (checkStudent.length === 0) {
            throw new Error("Student not found")
        }

        return checkStudent
    }

    public async updateClassroom(id: string, classroom_id: string) {
        
        const checkStudent = await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENT)
            .where("id", "=", id)
            .select()

        if (checkStudent.length === 0) {
            throw new Error("Student not found")
        }

        const result = await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENT)
            .where("id", "=", classroom_id)
            .update({classroom_id})
    }
}