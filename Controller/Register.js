const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Schema/User");


const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Trim values and check for empty strings or missing fields
        if (!username?.trim() || !email?.trim() || !password?.trim()) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists by email
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }


        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        user = new User({
            username: username.trim(),
            email: email.trim(),
            password: hashedPassword,
        });

        // Save user to database
        await user.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const loginUser = async (req, res) => {
    try {

        console.log('triggerddddd...')

        const { email, password } = req.body;

        console.log('gone 1')

        if (!email?.trim() || !password?.trim()) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        console.log('gone 2')


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        console.log('gone 3')

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        console.log('gone 4')

        // Generate JWT token
        const token = jwt.sign(
            { email: user.email 
                
            },
            process.env.JWT_SECRET,  // JWT secret should be in .env
            { expiresIn: "1h" }     // Token expires in 1 hour
        );

        console.log('gone 5')


        res.status(200).json({
            message: "Login successful",
            token,                    // Send token back
            user: {
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(400).json({ message: "Server error", error: error.message });
    }
};

//verify

const verifyToken = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.status(200).json({
        message: 'Token is valid',
        user: decoded
      });
    } catch (err) {
      res.status(403).json({ message: 'Invalid or expired token' });
    }
  };

  // Get All Users

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error: error.message });
    }
};

// Get User By ID

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user", error: error.message });
    }
};

// Update User By ID

const updateUserById = async (req, res) => {
    try {
        const { username, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { username, email },
            { new: true, runValidators: true, select: "-password" }
        );

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};

//  Delete User By ID

const deleteUserById = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};


module.exports = { registerUser, loginUser, verifyToken, getAllUsers, getUserById, updateUserById, deleteUserById };


