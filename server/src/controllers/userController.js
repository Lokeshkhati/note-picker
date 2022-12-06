import { User } from '../models/user.js'
import { CustomError } from '../utils/customError.js'
import { cookieToken } from '../utils/cookieToken.js'

const register = async (req, res, next) => {
    try {
        const { fullName, username, email, password, } = req.body

        if (!email || !fullName || !username || !password) {
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

const getLoggedInUserDetails = async (res, next) => {

    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })
}

export { register, login, logout, getLoggedInUserDetails, }

