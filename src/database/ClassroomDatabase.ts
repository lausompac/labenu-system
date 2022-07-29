import { Classroom } from "../models/Classroom";
import { BaseDatabase } from "./BaseDatabase";
import { StudentDatabase } from "./StudentDatabase";


export class ClassroomDatabase extends BaseDatabase {
   public static TABLE_CLASSROOM = "Labe_Classroom"

   public async requestClassLastId() {
      const result = await BaseDatabase
      .getLastId(ClassroomDatabase.TABLE_CLASSROOM)

      return result

   }

   public async create(classroom: Classroom) {
      
      await BaseDatabase
         .connection(ClassroomDatabase.TABLE_CLASSROOM)
         .insert({
            id: classroom.getId(),
            name: classroom.getName(),
            module: classroom.getModule()        
         })
   }

   public async requestActiveClassroom() {
      const result = await BaseDatabase
         .connection(ClassroomDatabase.TABLE_CLASSROOM)
         .where("module", "!=", "0")
         .select()

      return result
   }

   public async updateModule(classroomId: string, module: string) {
      
      const checkClassroom = await BaseDatabase
         .connection(ClassroomDatabase.TABLE_CLASSROOM)
         .where("id", "=", classroomId)
         .select()

      if(checkClassroom.length === 0) {
         throw new Error("Classroom not found")
      }
      
      const result = await BaseDatabase
         .connection(ClassroomDatabase.TABLE_CLASSROOM)
         .where("id", "=", classroomId)
         .update({module})
   }

   public async requestStudents(classroomId: string) {
      const result = await BaseDatabase
         .connection(ClassroomDatabase.TABLE_CLASSROOM)
         .innerJoin(StudentDatabase.TABLE_STUDENT, `${StudentDatabase.TABLE_STUDENT}.classroom_id`, `${ClassroomDatabase.TABLE_CLASSROOM}.id`)
         .where(`${StudentDatabase.TABLE_STUDENT}.classroom_id`, "=", `${classroomId}`)
         .select(`${StudentDatabase.TABLE_STUDENT}.id`, `${StudentDatabase.TABLE_STUDENT}.name`, "email")


      return result

   }
}