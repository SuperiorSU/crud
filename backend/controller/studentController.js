const Student = require('../model/studentModel');
const University = require('../model/uniModel');
const XLSX = require('xlsx');
exports.add_student = async (req, res) => {
    try {
        const { name, email, contact, semester, year, batch, university } = req.body;

        // Check if the student already exists
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({
                success: false,
                message: "Student already exists."
            });
        }

        // Check if the university exists by name
        const universityExists = await University.findOne({ university });
        if (!universityExists) {
            return res.status(404).json({
                success: false,
                message: "University not found."
            });
        }

        // Create a new student with the university name
        const newStudent = await Student.create({
            name,
            email,
            contact,
            semester,
            year,
            batch,
            university: universityExists.university  // Use the university name directly
        });

        return res.status(201).json({
            success: true,
            message: "Student added successfully",
            data: newStudent
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Oops! Something went wrong",
            error: err.message
        });
    }
};


exports.update_student = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, contact, semester, year, batch, university } = req.body;

        // Check if the university exists by name
        const universityExists = await University.findOne({ university });
        if (!universityExists) {
            return res.status(404).json({
                success: false,
                message: "University not found."
            });
        }

        // Update the student details
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            {
                name,
                email,
                contact,
                semester,
                year,
                batch,
                university: universityExists.university  // Use the university name directly
            },
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: updatedStudent
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Oops! Something went wrong",
            error: err.message
        });
    }
};



exports.delete_student = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student deleted successfully"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Oops! Something went wrong",
            error: err.message
        });
    }
};



exports.find_student = async (req, res) => {
    try {
        const { id } = req.params;

        // Find student by ID
        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: student
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Oops! Something went wrong",
            error: err.message
        });
    }
};

// getall students

exports.getall_students = async (req, res) => {
    try {
        const students = await Student.find();

        return res.status(200).json({
            success: true,
            data: students
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Oops! Something went wrong",
            error: err.message
        });
    }
}

exports.export_all_students = async (req, res) => {
    try {
      const students = await Student.find(); // Fetch all student data
  
      // Generate Excel file
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(students);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
  
      const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
      res.setHeader('Content-Disposition', 'attachment; filename=students.xlsx');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.send(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to export data');
    }
  };

//   find student by email

// Find student by email
exports.find_student_by_email = async (req, res) => {
    try {
        const { email } = req.params;

        // Find student by email
        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: student
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Oops! Something went wrong",
            error: err.message
        });
    }
};

// Find student by university
exports.find_student_by_university = async (req, res) => {
    try {
        const { university } = req.params;

        // Find student by university
        const students = await Student.find({ university });

        if (students.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No students found for this university"
            });
        }

        return res.status(200).json({
            success: true,
            data: students
        });

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Oops! Something went wrong",
            error: err.message
        });
    }
};

// Find student by batch
exports.find_student_by_batch = async (req, res) => {
    try {
        const { batch } = req.params;

        // Find student by batch
        const students = await Student.find({ batch });

        if (students.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No students found for this batch"
            });
        }

        return res.status(200).json({
            success: true,
            data: students
        });

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Oops! Something went wrong",
            error: err.message
        });
    }
};


