import { CLASS_MODULE, IClassroomDB } from "../../models/Classroom";
import { IHobbiesDB, IStudentDB, IStudentsHobbiesDB } from "../../models/Student";

export const students: IStudentDB[] = [
    {
        id: "1",
        name: "Laura Campos",
        email: "laura@gmail.com",
        birthDate: new Date("1993/06/13"),
        classroom_id: "102",
    },
    {
        id: "2",
        name: "Thalita Gonçalves",
        email: "thali@gmail.com",
        birthDate: new Date("1999/10/15"),
        classroom_id: "103",
    },
    {
        id: "3",
        name: "Maria Lucia",
        email: "malu@gmail.com",
        birthDate: new Date("2022/11/13"),
        classroom_id: "103",
    },
    {
        id: "4",
        name: "Selma Maria",
        email: "ceu@gmail.com",
        birthDate: new Date("2022/05/13"),
        classroom_id: "102",
    },
    {
        id: "5",
        name: "Marina Campos",
        email: "maerina@gmail.com",
        birthDate: new Date("1969/12/27"),
        classroom_id: "103",
    },
    {
        id: "6",
        name: "Lurdes Gonçalves",
        email: "donalurdes@gmail.com",
        birthDate: new Date("1969/10/11"),
        classroom_id: "101",
    },
    {
        id: "7",
        name: "Luan Campos",
        email: "luaninformatica@gmail.com",
        birthDate: new Date("1999/08/04"),
        classroom_id: "102",
    },
    {
        id: "8",
        name: "Thamires Gonçalves",
        email: "aincansavelthamires@gmail.com",
        birthDate: new Date("1998/11/15"),
        classroom_id: "101",
    },
    {
        id: "9",
        name: "Thayane Gonçalves",
        email: "tata@gmail.com",
        birthDate: new Date("2004/04/26"),
        classroom_id: "101",
    }

]

export const classrooms: IClassroomDB[] = [
    {
        id: "101",
        name: "Calcanhotto",
        module: CLASS_MODULE.CLASS_MODULE_5,
    },
    {
        id: "102",
        name: "Bethânia",
        module: CLASS_MODULE.CLASS_MODULE_0,
    },
    {
        id: "103",
        name: "Costa",
        module: CLASS_MODULE.CLASS_MODULE_1,
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


