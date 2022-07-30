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
        private classroom_id: null | string,
    ) { }

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }

    public getEmail() {
        return this.email;
    }

    public getBirthDate() {
        return this.birthDate;
    }

    public getClassroom() {
        return this.classroom_id;
    }

    public setId(newId: string) {
        this.id = newId;
    }

    public setName(newName: string) {
        this.name = newName;
    }

    public setEmail(newEmail: string) {
        this.email = newEmail;
    }

    public setBirthDate(newBirthDate: Date) {
        this.birthDate = newBirthDate;
    }

    public setClassroom(newClassroom: null | string) {
        this.classroom_id = newClassroom;
    }
}

