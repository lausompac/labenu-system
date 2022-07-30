import { IHobbiesDB, Student } from "../models/Student";
import { BaseDatabase } from "./BaseDatabase";

export class StudentDatabase extends BaseDatabase {
    public static TABLE_STUDENT = "Labe_Student";
    public static TABLE_HOBBIES = "Labe_Hobbies";
    public static TABLE_CLASSROOM = "Labe_Classroom"
    public static TABLE_STUDENT_HOBBIES = "Labe_Students_Hobbies";

    public async requestStudentLastId() {
        const result = await BaseDatabase
            .getLastId(StudentDatabase.TABLE_STUDENT)

        return result
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
            .orderBy("name")

        return students
    }

    public async createHobby(student: Student, hobby: IHobbiesDB) {
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

            const newStudentHobby = await BaseDatabase
                .connection(StudentDatabase.TABLE_STUDENT_HOBBIES)
                .insert({
                    student_id: student.getId(),
                    hobby_id: newId + 1,
                })

        } else {
            const newStudentHobby = await BaseDatabase
                .connection(StudentDatabase.TABLE_STUDENT_HOBBIES)
                .insert({
                    student_id: student.getId(),
                    hobby_id: checkHobby[0].id,
                })
        }
    }

    public async updateClassroom(id: string, classroom_id: string) {
        const checkStudent = await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENT)
            .where("id", "=", id)
            .select()

        if (checkStudent.length === 0) {
            throw new Error("Student not found")
        }

        if (checkStudent[0].classroom_id === classroom_id) {
            throw new Error("Student already in this classroom")
        }

        const checkClassroom = await BaseDatabase
            .connection(StudentDatabase.TABLE_CLASSROOM)
            .where("id", "=", classroom_id)
            .select()

        if (checkClassroom.length === 0) {
            throw new Error("Classroom not found")
        }

        const result = await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENT)
            .where("id", "=", id)
            .update({ classroom_id })
    }
}