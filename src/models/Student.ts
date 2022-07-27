export interface IStudentDB {
    id: string; 
    name: string;
    email: string;
    birthDate: Date;
    classroom_id: null | string;
}

export interface IHobbiesDB {
    id: string;
    title: string;
}

export interface IStudentsHobbiesDB {
    student_id: string;
    hobby_id: string;
}

export class Student {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private birthDate: Date,
        private classroom: null | string
    ) {}

}

