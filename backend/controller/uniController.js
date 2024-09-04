const University = require('../model/uniModel');
const XLSX = require('xlsx');
exports.add_university = async (req, res) => {
    try {
        const { university, address, contact } = req.body;

        const existingUniversity = await University.findOne({ university });
        if (existingUniversity) {
            return res.status(400).json({
                success: false,
                message: "University already exists"
            });
        }

        const newUniversity = await University.create({
            university,
            address,
            contact
        });

        return res.status(201).json({
            success: true,
            message: "University added successfully",
            data: newUniversity
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Oops! Something went wrong",
            error: err.message 
        });
    }
};

exports.update_university = async (req, res) => {
    try {
        const { id } = req.params; // Assuming the university ID is passed as a URL parameter
        const { university, address, contact } = req.body;

        const updatedUniversity = await University.findByIdAndUpdate(
            id,
            { university, address, contact },
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedUniversity) {
            return res.status(404).json({
                success: false,
                message: "University not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "University updated successfully",
            data: updatedUniversity
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Oops! Something went wrong",
            error: err.message
        });
    }
};


exports.delete_university = async (req, res) => {
    try {
        const { id } = req.params; // Assuming the university ID is passed as a URL parameter

        const deletedUniversity = await University.findByIdAndDelete(id);

        if (!deletedUniversity) {
            return res.status(404).json({
                success: false,
                message: "University not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "University deleted successfully"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Oops! Something went wrong",
            error: err.message
        });
    }
};


exports.find_university = async (req, res) => {
    try {
        const { id } = req.params; // Assuming the university ID is passed as a URL parameter

        const university = await University.findById(id);

        if (!university) {
            return res.status(404).json({
                success: false,
                message: "University not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: university
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Oops! Something went wrong",
            error: err.message
        });
    }
};

// get all universities

exports.get_universities = async (req, res) => {
    try {
        const universities = await University.find();

        return res.status(200).json({
            success: true,
            data: universities
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Oops! Something went wrong",
            error: err.message
        });
    }
}



exports.export_all_universities = async (req, res) => {
    try {
      const universities = await University.find(); // Fetch all university data
  
      // Generate Excel file
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(universities);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Universities');
  
      const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
      res.setHeader('Content-Disposition', 'attachment; filename=universities.xlsx');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.send(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to export data');
    }
  };