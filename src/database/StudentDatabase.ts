import { Hobby, Student } from "../models/Student";
import { BaseDatabase } from "./BaseDatabase";

export class StudentDatabase extends BaseDatabase {
    public static TABLE_STUDENT = "Labe_Student";
    public static TABLE_HOBBIES = "Labe_Hobbies";
    public static TABLE_STUDENT_HOBBIES = "Labe_Student_Hobbies";

    public async requestStudentLastId() {
        const result = await BaseDatabase
            .getLastId(StudentDatabase.TABLE_STUDENT)

        return result
    }

    public async createHobby(hobby: Hobby) {

            const checkHobby = await BaseDatabase
                .connection(StudentDatabase.TABLE_HOBBIES)
                .select()
                .where("title", "=", `${hobby}`)

            if (checkHobby.length === 0) {
                const newId = await BaseDatabase
                    .getLastId(StudentDatabase.TABLE_HOBBIES)
    
                const newHobby = await BaseDatabase
                    .connection(StudentDatabase.TABLE_HOBBIES)
                    .insert({
                        id: newId + 1,
                        title: hobby,
                    })
                console.log(newHobby)
            }

    }

    public async create(student: Student) {

        await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENT)
            .insert({
                id: student.getId(),
                name: student.getName(),
                email: student.getEmail(),
                birthDate: student.getBirthDate(),
                classroom_id: student.getClassroom(),
            })

    }

    public async requestByName(name: string | null = null) {

        if (name) {
            const checkStudent = await BaseDatabase
                .connection(StudentDatabase.TABLE_STUDENT)
                .where("name", "=", `${name}`)
                .select()

            if (checkStudent.length === 0) {
                throw new Error("Student not found")
            }

            return checkStudent
        }

        const students = await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENT)
            .select()

        return students
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
            .where("id", "=", id)
            .update({ classroom_id })
    }
}