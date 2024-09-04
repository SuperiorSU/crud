const adminModel = require('../model/adminModel');

exports.add_admin = async (req, res) => {
    try {
        const { name, email, contact } = req.body;

        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: "Admin already exists"
            });
        }

        const newAdmin = await adminModel.create({
            name,
            email,
            contact
        });

        return res.status(201).json({
            success: true,
            message: "Admin added successfully",
            data: newAdmin
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Oops! Something went wrong",
            error: err.message
        });
    }
}

// login admin
exports.login_admin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await adminModel.findOne({
            email,
            password
        });

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: admin
        });
    }

    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Oops! Something went wrong",
            error: err.message
        });
    }

}