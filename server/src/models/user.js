import mongoose from 'mongoose';
import validator from 'validator';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please provide a full name"],
        maxlength: [30, "First Name should be under 30 char."]
    },
    username: {
        type: String,
        required: [true, "Please provide a user name"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        validator: [validator.isEmail, 'Please enter email in correct format'],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "Password should be atleast 6 char."],
        select: false
    },
    confirmPassword: {
        type: String,
    },

    role: {
        type: String,
        default: 'user'
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: String,
    createdAt: {
        type: Date,
        default: Date.now,
    }

})

// encrypt password before save - HOOKS
userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) return next();

        this.password = await bcrypt.hash(this.password, 10)
    } catch (error) {

    }
})

// validate the password with passed on user password
userSchema.methods.isValidatedPassword = async function (usersendPassword) {
    return await bcrypt.compare(usersendPassword, this.password)
}

// create and return jwt token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    })


}
// generate forgot password  token (string)
userSchema.methods.getForgotPasswordToken = function () {
    // generate a long and random string
    const forgotToken = crypto.randomBytes(16).toString('base64')
    // getting a hash - make sure to get a hash on backend
    this.forgotPasswordToken = crypto.createHash('sha256').update(forgotToken).digest('hex')

    // time of token
    this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000

    return forgotToken
}

const User = mongoose.model('User', userSchema)

export { User }


