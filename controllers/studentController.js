import Student from "../models/Student.js"

export function getStudent(req, res)  {

    if(req.user == null){ //req eke attatm user kenek innwd blnw
        res.status(401).json({
            message : "cannot find user please login and try again"
        })
        return
    }
    if(req.user.role != "admin" ){ // userge role eka admind blnw
        res.status(403).json({
            message : "only admin users can access students"
    }
      )}
    Student.find().then(

            (students)=>{

                res.json(students)
            }
        )
}


export function createStudent(req, res) {
    //Read the data inside the request
       //create and student in the student collection

       console.log(req.body)

       //
       const student = new Student(req.body)
         student.save().then(
            ()=>{
                res.json({
                    message : "Student Created Successfully"
                })
            }
        )
}


export function deleteStudent (req, res){
    res.json({
         message : "Good Bye " +req.body.name
    })
}


export function putStudent (req, res) {
    res.json({
         message : "Hello from put " +req.body.name
    })
}