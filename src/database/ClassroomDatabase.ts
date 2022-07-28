import { Classroom } from "../models/Classroom";
import { BaseDatabase } from "./BaseDatabase";
import { StudentDatabase } from "./StudentDatabase";


export class ClassroomDatabase extends BaseDatabase {
   public static TABLE_CLASSROOM = "Labe_Classroom"

   public async createClassroom(classroom: Classroom) {
      await BaseDatabase
         .connection(ClassroomDatabase.TABLE_CLASSROOM)
         .insert({
            id: classroom.getId(),
            name: classroom.getName(),
            module: classroom.getModule()        
         })
   }

   public async requestStudents(classroomId: string) {
      const result = await BaseDatabase
         .connection(ClassroomDatabase.TABLE_CLASSROOM)
         .innerJoin(StudentDatabase.TABLE_STUDENT, `${StudentDatabase.TABLE_STUDENT}.classroom_id`, `${ClassroomDatabase.TABLE_CLASSROOM}.id`)
         .where(`${StudentDatabase.TABLE_STUDENT}.classroom_id`, "=", `${classroomId}`)
         .select(`${StudentDatabase.TABLE_STUDENT}.id`, `${StudentDatabase.TABLE_STUDENT}.name`, "email")
         console.log(classroomId)

      return result

   }
}