import { User } from "../models/user.model.js";
const registerUser = async (req, res, next) => {
try {
    const { username, password, email } = req.body;

    // basic validation
    if (!username || !password || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // check if user already exists
    const existing = await User.findOne({ $or: [{ username }, { email: email.toLowerCase() }] });
    if (existing) {
        return res.status(400).json({ message: "User already exists" });
    }

    // create new user
    const user = await User.create({ 
        username,
        email: email.toLowerCase(),
        password,
    });
    res.status(201).json({ message: "User registered successfully", user: {
        id: user._id,
        username: user.username,
        email: user.email,
    } });

} catch (error) {
    console.log("Registration error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
}
};

const loginUser = async (req, res, next) => {
    try {
        //checking if user already exists
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        
        // comparing password        
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ 
            message: "Login successful", 
            user: { id: user._id, username: user.username, email: user.email } });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export { 
    registerUser,
    loginUser
};