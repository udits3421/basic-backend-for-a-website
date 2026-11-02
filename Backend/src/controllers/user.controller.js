import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are important!" });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const normalizedUsername = username.toLowerCase().trim();

        const existing = await User.findOne({
            $or: [{ email: normalizedEmail }, { username: normalizedUsername }]
        });

        if (existing) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            username: normalizedUsername,
            email: normalizedEmail,
            password,
            loggedIn: false
        });

        res.status(201).json({
            message: "User registered",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!", error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        user.loggedIn = true;
        await user.save();

        res.status(200).json({
            message: "User Logged in",
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                loggedIn: user.loggedIn
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.loggedIn = false;
        await user.save();

        res.status(200).json({
            message: "Logout successful"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error",
            error: error.message
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({
            message: "Users fetched successfully",
            count: users.length,
            users
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

export {
    registerUser,
    loginUser,
    logoutUser,
    getAllUsers
};
