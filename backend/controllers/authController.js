
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/userSchema");
const HospitalModel = require("../models/HospitalRegisterModel");


const signUp = async (req, res) => {
    try {
        const { UserName, UserEmail, UserPhone, UserPassword } = req.body;
        const user = await UserModel.findOne({ UserEmail });
        if (user) {
            return res.status(409).json({ message: 'User alreasdy exists!', success: false });
        }

        const userModel = new UserModel({ UserName, UserEmail, UserPhone, UserPassword });
        userModel.UserPassword = await bcrypt.hash(UserPassword, 10);
        await userModel.save();
        res.status(201).json({ message: "SignUp successful", success: true });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", success: false });
    }
}

const login = async (req, res) => {
    try {
        const { UserEmail, UserPassword } = req.body;
        const user = await UserModel.findOne({ UserEmail });
        if (!user) {
            return res.status(403).json({ message: 'Authentication failed!', success: false });
        }

        const isUserPasswordEqual = await bcrypt.compare(UserPassword, user.UserPassword);
        if (!isUserPasswordEqual) {
            return res.status(403).json({ message: "Password doesn't match!", success: false });
        }

        const jwtToken = jwt.sign({ UserEmail: user.UserEmail, _id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '24h' }
        )

        res.status(200).json({ message: "Login successful", success: true, jwtToken, UserEmail, UserName: user.UserName });
    }
    catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error", success: false });
    }
}

const hospitalRegister = async (req, res) => {
    try {
        const { hospitalName, hospitalLicence, hospitalType, hospitalEmail, hospitalPhone, hospitalAddress, latitude, longitude,hospitalManagerName, hospitalManagerEmail, hospitalManagerPhone, hospitalManagerPassword } = req.body;
        const hospital = await HospitalModel.findOne({ hospitalEmail });
        if (hospital) {
            return res.status(409).json({ message: 'Hospital alreasdy exists!', success: false });
        }
        const existingUser = await UserModel.findOne({
            UserEmail: hospitalManagerEmail
        });
        if (existingUser) {
            return res.status(409).json({message: "Manager email already exists!",success: false });
        }
        const hashedPassword = await bcrypt.hash(hospitalManagerPassword,10);
        const newHospital = new HospitalModel({
            hospitalName, hospitalLicence, hospitalType, hospitalEmail, hospitalPhone, hospitalAddress, hospitalLocation: {
                type: "Point",
                coordinates: [
                    Number(longitude),
                    Number(latitude)
                ]
            },
            hospitalManagerName, hospitalManagerEmail, hospitalManagerPhone, hospitalManagerPassword: hashedPassword, status: "pending"
        });

        await newHospital.save();
        res.status(201).json({ message: "Waiting for approval", success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }
}


module.exports = { signUp, login, hospitalRegister }
