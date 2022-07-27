import { BaseDatabase } from "../BaseDatabase";
import { ClassroomDatabase } from "../ClassroomDatabase";
import { classrooms, hobbies, students, studentsHobbies } from "./data";
import { StudentDatabase } from "../StudentDatabase";

const TABLE_HOBBIES = "Labe_Hobbies";
const TABLE_STUDENTS_HOBBIES = "Labe_Students_Hobbies";

class Migrations extends BaseDatabase {

    public async execute() {
        try {
            await this.createTables();
            console.log("Tables created successfully");
            await this.insertData();
            console.log("Tables populated successfully");
        } catch (error) {
            console.log(error.message);
        } finally {
            console.log("Ending connection...");
            BaseDatabase.connection.destroy();
            console.log("Migrations completed.");
        }
    }

    private async createTables() {
        await BaseDatabase.connection.raw(`
        DROP TABLE IF EXISTS
            ${TABLE_STUDENTS_HOBBIES},
            ${StudentDatabase.TABLE_STUDENT},
            ${TABLE_HOBBIES},
            ${ClassroomDatabase.TABLE_CLASSROOM};
            
        CREATE TABLE IF NOT EXISTS ${ClassroomDatabase.TABLE_CLASSROOM} (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            module ENUM('0', '1', '2', '3', '4', '5', '6') DEFAULT '0'
        );

        CREATE TABLE IF NOT EXISTS ${StudentDatabase.TABLE_STUDENT} (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            birthDate DATE NOT NULL,
            classroom_id VARCHAR(255),
            FOREIGN KEY (classroom_id) REFERENCES ${ClassroomDatabase.TABLE_CLASSROOM}(id) 
        );

        CREATE TABLE IF NOT EXISTS ${TABLE_HOBBIES} (
            id VARCHAR(255) PRIMARY KEY,
            title VARCHAR(255) NOT NULL UNIQUE
        );

        CREATE TABLE IF NOT EXISTS ${TABLE_STUDENTS_HOBBIES} (
            student_id VARCHAR(255) NOT NULL,
            hobby_id VARCHAR(255) NOT NULL,
            FOREIGN KEY (student_id) REFERENCES ${StudentDatabase.TABLE_STUDENT}(id),
            FOREIGN KEY (hobby_id) REFERENCES ${TABLE_HOBBIES}(id)
        );
        `)
    }

    private async insertData() {
        await BaseDatabase
            .connection(ClassroomDatabase.TABLE_CLASSROOM)
            .insert(classrooms)

        await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENT)
            .insert(students)

        await BaseDatabase
            .connection(TABLE_HOBBIES)
            .insert(hobbies)

        await BaseDatabase
            .connection(TABLE_STUDENTS_HOBBIES)
            .insert(studentsHobbies)

    }
}

const migrations = new Migrations();
migrations.execute();