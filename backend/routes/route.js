const express = require('express');
const router = express.Router();

// Import controllers
const studentController = require('../controller/studentController');
const universityController = require('../controller/uniController');
const adminController = require('../controller/adminController');

// Student Routes
router.post('/student', studentController.add_student);
router.put('/student/:id', studentController.update_student);
router.delete('/student/:id', studentController.delete_student);
router.get('/student/:id', studentController.find_student);
// all students
router.get('/students', studentController.getall_students);
router.get('/students/export', studentController.export_all_students); // New route for export
// search students
router.get('/students/search/batch', studentController.find_student_by_batch);
router.get('/students/search/uni', studentController.find_student_by_university);
router.get('/students/search/email', studentController.find_student_by_email);


// University Routes
router.post('/university', universityController.add_university);
router.put('/university/:id', universityController.update_university);
router.delete('/university/:id', universityController.delete_university);
router.get('/university/:id', universityController.find_university);
// all universities
router.get('/universities', universityController.get_universities);
router.get('/universities/export', universityController.export_all_universities); // New route for export

// admin routes
router.post('/admin', adminController.add_admin);
// login route
router.post('/login', adminController.login_admin);

module.exports = router;
