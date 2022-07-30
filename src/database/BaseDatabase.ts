import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

export abstract class BaseDatabase {
   protected static connection = knex({
      client: "mysql",
      connection: {
         host: process.env.DB_HOST,
         port: 3306,
         user: process.env.DB_USER,
         password: process.env.DB_PASSWORD,
         database: process.env.DB_DATABASE,
         multipleStatements: true
      },
   });

   // gerar id's sequenciais
   protected static async getLastId(table: string) {
      const ids = await BaseDatabase
         .connection(table)
         .select("id")

      const lastId = ids.map((id) => Number(id.id)).sort((a, b) => a - b)
      const lastIdNumber = lastId[lastId.length - 1]

      return lastIdNumber
   }

}
