import { User } from '../models/user.js'
import { CustomError } from '../utils/customError.js'
import { cookieToken } from '../utils/cookieToken.js'
import { mailHelper } from '../utils/emailHelper.js'
import crypto from 'crypto'

const register = async (req, res, next) => {
    try {
        const { fullName, username, email, password, } = req.body

        if (!email || !fullName || !username || !password ) {
            return next(new CustomError('Please provide all fields', 400))
        }
        
        const UserExists = await User.findOne({ email })
        if (UserExists) {
            return next(new CustomError("User with given email already exists"))
        }

        const user = User.create({
            fullName,
            username,
            email,
            password,
        })
        await user.save()
        cookieToken(user, res)

    } catch (error) {
        return next(new CustomError(error))
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return next(new CustomError('please provide email and password', 400))
        }
        const user = await User.findOne({ email, }).select("+password")
        if (!user) {
            return next(new CustomError('You are not registerd', 400))
        }
        // Match the password
        const isPasswordCorrect = await user.isValidatedPassword(password)
        if (!isPasswordCorrect) {
            return next(new CustomError('Email or Password does not match or exist', 400))
        }

        cookieToken(user, res)
    } catch (error) {
        next(new CustomError(error, 500))
    }
}

const logout = async (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logout success"
    })
}

const forgotPassword = async (req, res, next) => {
    const { email } = req.body
    const user = await User.findOne({ email })

    if (!user) {
        return next(new CustomError('Email not found as registered', 400))
    }
    const forgotPasswordToken = user.getForgotPasswordToken()
    await user.save({ validateBeforeSave: false })

    const resetUrl = `https://mern-auth-seven.vercel.app/resetpassword/${forgotPasswordToken}`

    // `Copy paste this link in your URL and hit Enter\n\n${resetUrl}`
    const message =
        ` You have requested for a password reset\n\n
    Please go through this link to reset your  password.\n\n
    ${resetUrl}`


    try {
        await mailHelper({
            email: user.email,
            subject: "Password reset request",
            message
        })

        res.status(200).json({
            success: true,
            message: "Email sent successfully"
        })

    } catch (error) {
        user.forgotPasswordToken = undefined
        user.forgotPasswordExpiry = undefined
        await user.save({ validateBeforeSave: false })

        return next(new CustomError(error.message, 500))
    }
}

const resetPassword = async (req, res, next) => {
    // grab token
    const resetToken = req.params.id
    console.log(resetToken)

    // encrypt the token
    const encryptedToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    try {
        // find User using encryptedToken and expiry time
        const user = await User.findOne({
            encryptedToken, forgotPasswordExpiry: ({
                $gt: Date.now()
            })
        })
        if (!user) {
            return next(new CustomError("Token is invalid or expired", 400))
        }
        const { password, confirmPassword } = req.body

        if (password !== confirmPassword) {
            return next(new CustomError("Password and Confirm password do not match"))
        }

        user.password = password
        user.forgotPasswordToken = undefined
        user.forgotPasswordExpiry = undefined

        await user.save()

        // send the token to frontend
        cookieToken(user, res)

    } catch (error) {
        next(error)
    }
}

const getLoggedInUserDetails = async (res, next) => {

    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })
}

export { register, login, logout, forgotPassword, resetPassword, getLoggedInUserDetails, }

