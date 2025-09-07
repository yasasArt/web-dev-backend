import Student from "../models/Student.js"

export function getStudent(req, res)  {
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