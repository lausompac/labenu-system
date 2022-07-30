import { Request, Response } from "express"

export class HomeController {
    homePage = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            res.status(200)
            .write("<h1>Welcome to the classroom management system</h1>"
                + "<h3>Endpoints:</h3>"
                + "<ul>"
                + "<li>/classroom - Endpoint 1 - Create Classroom</li>"
                + "<li>/classroom - Endpoint 2 - Request Active Classroom</li>"
                + "<li>/classroom/:id - Endpoint 3 - Change Classroom Module</li>"
                + "<li>/student - Endpoint 4 - Create Student</li>"
                + "<li>/student - Endpoint 5 - Request Student by name</li>"
                + "<li>/student/:id - Endpoint 6 - Change Student Classroom</li>"
                + "<li>/classroom/:id/students - Endpoint 7 - Request Students</li>"
                + "</ul>"
                + "<h3>Acess the documentation at:</h3>"
                + "<a href='https://documenter.getpostman.com/view/15825788/UzdzT5bK'>Postman</a>"
                + "<h3>Source code at:</h3>"
                + "<a href='https://github.com/lausompac/labenu-system'>GitHub</a>"
                + "<p> Thank you for using my system! </p>")
                res.end()
                        

        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }
}