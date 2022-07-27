import { CLASS_MODULE, IClassroomDB } from "../../models/Classroom";
import { IHobbiesDB, IStudentDB, IStudentsHobbiesDB } from "../../models/Student";

export const students: IStudentDB[] = [
    {
        id: "1",
        name: "Laura Campos",
        email: "laura@gmail.com",
        birthDate: new Date("1993/06/13"),
        classroom_id: "101",
    },
    {
        id: "2",
        name: "Thalita Gonçalves",
        email: "thali@gmail.com",
        birthDate: new Date("1999/10/15"),
        classroom_id: "102",
    },
    {
        id: "3",
        name: "Maria Luisa",
        email: "malu@gmail.com",
        birthDate: new Date("2002/11/13"),
        classroom_id: null,
    }
]

export const classrooms: IClassroomDB[] = [
    {
        id: "101",
        name: "Aragon",
        module: CLASS_MODULE.CLASS_MODULE_5,
    },
    {
        id: "102",
        name: "Bethânia",
        module: CLASS_MODULE.CLASS_MODULE_0,
    }

]

export const hobbies: IHobbiesDB[] = [
    {
        id: "201",
        title: "Programar",
    },
    {
        id: "202",
        title: "Andar de bicicleta",
    },
    {
        id: "203",
        title: "Academia"
    },
    {
        id: "204",
        title: "Desenhar"
    }

]

export const studentsHobbies: IStudentsHobbiesDB[] = [
    {
        student_id: "1",
        hobby_id: "201",
    },
    {
        student_id: "1",
        hobby_id: "202",
    },
    {
        student_id: "2",
        hobby_id: "203",
    },
    {
        student_id: "3",
        hobby_id: "204",
    }
]


