import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema({

        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minlength: 3,
            maxlength: 30,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 100,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        }
    },

    { 
        timestamps: true 
    }
)

// Hash password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// Method to compare password
userSchema.methods.comparePassword = async function (Password) {
    const isMatch = await bcrypt.compare(Password, this.password);
    if (isMatch) {
        return true;
    }

    // Legacy support: if the stored password is plaintext from before hashing,
    // allow login and upgrade the stored password to a bcrypt hash.
    if (Password === this.password) {
        this.password = await bcrypt.hash(Password, 10);
        await this.save();
        return true;
    }

    return false;
};
export const User = mongoose.model("User", userSchema);

