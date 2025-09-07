import express from 'express';
import { createStudent, deleteStudent, getStudent, putStudent } from '../controllers/studentController.js';

const studentRouter = express.Router();

studentRouter.get('/', getStudent)

studentRouter.post('/', createStudent)

studentRouter.delete('/',deleteStudent)

studentRouter.put('/', putStudent)


export default studentRouter;